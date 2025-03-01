import { ReactNode, useContext, useEffect } from "react";
import { useState } from "react";
import "./DonatersTopList.css";
import { useLoaderData } from "react-router";
import { findSetting } from "../../components/utils";
import { AnimatedFontProperty } from "../../components/ConfigurationPage/widgetproperties/AnimatedFontProperty";
import { WidgetData } from "../../types/WidgetData";
import { Carousel, Flex } from "antd";
import { WidgetSettingsContext } from "../../contexts/WidgetSettingsContext";
import { ApiContext } from "../../contexts/ApiContext";
import {
  BorderProperty,
  DEFAULT_BORDER_PROPERTY_VALUE,
} from "../../components/ConfigurationPage/widgetproperties/BorderProperty";
import {
  ColorProperty,
  ColorPropertyTarget,
  DEFAULT_COLOR_PROPERTY_VALUE,
} from "../../components/ConfigurationPage/widgetproperties/ColorProperty";

export default function DonatersTopList({}: {}) {
  const [donaters, setDonaters] = useState(new Map());
  const { recipientId, conf } = useLoaderData() as WidgetData;
  const { widgetId, settings, subscribe, unsubscribe } = useContext(
    WidgetSettingsContext,
  );
  const { listDonaters } = useContext(ApiContext);

  const period = findSetting(settings, "period", "month");
  const topsize = Number.parseInt(findSetting(settings, "topsize", 3));
  const layout = findSetting(settings, "layout", "vertical");

  function updateDonaters() {
    listDonaters(period).then((data) => {
      const map = new Map();
      Object.keys(data)
        .filter((key) => key)
        .forEach((key) => {
          map.set(key, data[key]);
        });
      const sortedMap =
        type === "Last"
          ? map
          : new Map([...map.entries()].sort((a, b) => b[1].major - a[1].major));
      setDonaters(sortedMap);
    });
  }

  useEffect(() => {
    subscribe(conf.topic.alerts, (message) => {
      setTimeout(() => {
        updateDonaters();
        message.ack();
      }, 3000);
    });
    updateDonaters();
    return () => {
      unsubscribe(conf.topic.alerts);
    };
  }, [recipientId]);

  const type = findSetting(settings, "type", "Top");

  const title = findSetting(settings, "title", "Донатеры");
  const titleBackgroundStyle = new ColorProperty({
    widgetId: widgetId,
    name: "titleBackgroundColor",
    tab: "general",
    target: ColorPropertyTarget.BACKGROUND,
    displayName: "label-background",
    value: findSetting(
      settings,
      "titleBackgroundColor",
      DEFAULT_COLOR_PROPERTY_VALUE,
    ),
  }).calcCss();
  const backgroundStyle = new ColorProperty({
    name: "backgroundColor",
    target: ColorPropertyTarget.BACKGROUND,
    displayName: "label-background",
    value: findSetting(
      settings,
      "backgroundColor",
      DEFAULT_COLOR_PROPERTY_VALUE,
    ),
  }).calcCss();
  const headerFont = new AnimatedFontProperty({
    name: "headerFont",
    value: findSetting(settings, "headerFont", null),
  });
  const messageFont = new AnimatedFontProperty({
    name: "messageFont",
    value: findSetting(settings, "messageFont", null),
  });

  let listAlignment = findSetting(settings, "listAlignment", "Center");
  let listJustifyContent = "space-around";
  let listAlignItems = "center";
  if (layout === "horizontal") {
    switch (listAlignment) {
      case "Center":
        listJustifyContent = "space-around";
        break;
      case "Left":
        listJustifyContent = "flex-start";
        break;
      case "Right":
        listJustifyContent = "flex-end";
        break;
      default:
        listJustifyContent = "space-around";
        break;
    }
  }
  if (layout === "vertical") {
    switch (listAlignment) {
      case "Center":
        listAlignItems = "center";
        break;
      case "Left":
        listAlignItems = "flex-start";
        break;
      case "Right":
        listAlignItems = "flex-end";
        break;
      default:
        listAlignItems = "center";
        break;
    }
  }

  let textStyle = messageFont.calcStyle();
  textStyle.maxWidth = "100vw";
  textStyle.width = "50vw";
  textStyle.flex = "1 1 auto";

  let donatersTopStyle = headerFont.calcStyle();
  let headerAlignment = findSetting(settings, "headerAlignment", "Center");
  donatersTopStyle.textAlign = headerAlignment;
  donatersTopStyle.flex = "0 0 auto";

  const headerBorderStyle = new BorderProperty({
    name: "headerBorder",
    value: findSetting(settings, "headerBorder", DEFAULT_BORDER_PROPERTY_VALUE),
  }).calcCss();

  const listBorderStyle = new BorderProperty({
    name: "listBorder",
    value: findSetting(settings, "listBorder", DEFAULT_BORDER_PROPERTY_VALUE),
  }).calcCss();

  const widgetBorderStyle = new BorderProperty({
    name: "widgetBorder",
    value: findSetting(settings, "widgetBorder", DEFAULT_BORDER_PROPERTY_VALUE),
  }).calcCss();

  const widgetStyle = {
    ...{ height: "100%" },
    ...widgetBorderStyle,
    ...backgroundStyle,
  };

  donatersTopStyle = { ...donatersTopStyle, ...headerBorderStyle };
  textStyle = { ...textStyle, ...listBorderStyle };

  const hideEmpty = findSetting(settings, "hideEmpty", false);

  if (hideEmpty && (!donaters || donaters.size == 0)) {
    return <></>;
  }

  const carouselSettings = findSetting(settings, "carousel", {
    enabled: false,
    delay: 3,
    speed: 0.5,
  });
  const packSize = carouselSettings.enabled ? carouselSettings.amount : topsize;
  const gap = findSetting(settings, "gap", 1);

  function portion(): ReactNode[] {
    if (!donaters) {
      return [];
    }
    let packs = [];
    let origin = Array.from(donaters.keys());
    for (let start = 0; start < topsize; ) {
      let end = start + packSize;
      if (end > topsize) {
        end = topsize;
      }
      const label = origin.slice(start, end).map((donater) => (
        <div key={start} className={`${messageFont.calcClassName()}`}>
          {donater} - {donaters.get(donater).major}{" "}
          {donaters.get(donater).currency}
        </div>
      ));
      packs[packs.length] = label;
      start = start + packSize;
    }
    return packs;
  }

  return (
    <>
      {headerFont.createFontImport()}
      {messageFont.createFontImport()}
      <Flex style={widgetStyle} gap={gap} vertical={layout === "vertical"}>
        <div style={titleBackgroundStyle}>
          <div
            style={donatersTopStyle}
            className={`donaters-title ${headerFont.calcClassName()}`}
          >
            {title}
          </div>
        </div>
        <Carousel
          style={textStyle}
          className={messageFont.calcClassName()}
          speed={carouselSettings.speed * 1000}
          autoplaySpeed={carouselSettings.delay * 1000}
          autoplay
          dots={false}
        >
          {portion().map((pack) => (
            <div>
              <Flex
                vertical={layout === "vertical"}
                align={listAlignItems}
                justify={listJustifyContent}
                gap={10}
              >
                {pack}
              </Flex>
            </div>
          ))}
        </Carousel>
      </Flex>
    </>
  );
}
