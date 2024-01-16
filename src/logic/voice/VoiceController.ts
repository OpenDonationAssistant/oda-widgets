import { log } from "../../logging";

function getRndInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

function base64ToArrayBuffer(base64) {
  var binaryString = atob(base64);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export class VoiceController {
  audioCtx = new AudioContext();
  playingSource: AudioBufferSourceNode | null = null;
  onEndHandler: any|null = null;
  recipientId: string;

  constructor(recipientId: string) {
    this.recipientId = recipientId;
  }

  pronounceTitle(alert: any, data: any, onEndHandler: any) {
    const playIfMessageEmpty = this.findSetting(
      alert.properties,
      "enableVoiceWhenMessageIsEmpty",
      false,
    );
    if (
      (data.message === undefined ||
        data.message === null ||
        data.message === "") &&
      !playIfMessageEmpty
    ) {
      if (onEndHandler) {
        onEndHandler();
      }
      return;
    }
    log.debug("text to voice " + data.message);
    const message = data?.message?.trim();
    const headerForVoice = message
      ? this.findSetting(alert.properties, "voiceTextTemplate", null)
      : this.findSetting(alert.properties, "voiceEmptyTextTemplate", null);
    const text = headerForVoice
      ? headerForVoice
      : "Пользователь <username> отправил сообщение";
    const templates = text.split("\n");
    const choosenTemplate =
      templates.length > 1
        ? templates[getRndInteger(0, templates.length)]
        : text;
    const resultText = choosenTemplate
      .trim()
      .replace("<username>", data.senderName ? data.senderName : "Аноним")
      .replace("<amount>", data.amount.amount)
      .replace("<minoramount>", data.amount.amount * 100)
      .replace("<streamer>", this.recipientId);
    this.voiceByGoogle(resultText).then((audio) =>
      this.pronounce(audio, onEndHandler),
    );
  }

  pronounceMessage(alert: any, data: any, onEndHandler: any) {
    if (!data || !data.message || data.message.length === 0) {
      if (onEndHandler) {
        onEndHandler();
      }
      return;
    }
    this.voiceByMCS(data.message).then((audio) =>
      this.pronounce(audio, onEndHandler),
    );
  }

  private pronounce(buffer: ArrayBuffer, onEndHandler: any) {
    this.audioCtx.decodeAudioData(
      buffer,
      (buf) => {
        let source = this.audioCtx.createBufferSource();
        if (onEndHandler) {
          this.onEndHandler = onEndHandler;
          source.addEventListener("ended", onEndHandler);
        }
        this.playingSource = source;
        source.connect(this.audioCtx.destination);
        source.buffer = buf;
        source.loop = false;
        source.start(0);
      },
      (err) => {
        console.log(err);
      },
    );
  }

  playAudio(alert: any, onEndHandler: any) {
    fetch(`${process.env.REACT_APP_FILE_API_ENDPOINT}/files/${alert.audio}`, {
      method: "GET",
    })
      .then((response) => response.arrayBuffer())
      .then((buffer) => this.pronounce(buffer, onEndHandler));
  }

  interrupt() {
    if (this.playingSource) {
      this.playingSource.removeEventListener("ended", this.onEndHandler);
      this.playingSource.stop();
    }
  }

  private async voiceByMCS(message: string): Promise<ArrayBuffer> {
    return await fetch("https://api.oda.digital/tts?encoder=mp3", {
      method: "POST",
      body: message,
    }).then((response) => response.arrayBuffer());
  }

  private async voiceByGoogle(message: string): Promise<ArrayBuffer> {
    let body = {
      input: {
        ssml: '<speak><break time="1s"/>' + message + ".</speak>",
      },
      voice: {
        languageCode: "ru-RU",
        name: "ru-RU-Wavenet-D",
      },
      audioConfig: {
        audioEncoding: "MP3",
      },
    };

    const response = await fetch("https://api.oda.digital/texttospeech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    return base64ToArrayBuffer(json.audioContent);
  }

  private findSetting(properties, key: string, defaultValue: any | null) {
    const setting = properties.find((prop) => key === prop.name);
    if (setting) {
      return setting.value;
    }
    return defaultValue;
  }
}