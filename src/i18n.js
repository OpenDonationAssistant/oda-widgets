import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: {
          "menu-widgets":"Widgets",
          "menu-history":"History",
          "menu-payment-page-config":"Donation Page",
          "button-addwidget":"Add widget",
          "button-spin":"Spin",
          "button-testalert":"Test",
          "button-save": "Save",
          "button-cancel": "Cancel",
          "button-copy-url":"Copy URL",
          "button-rename":"Rename",
          "button-delete":"Delete",
          "button-logout":"Logout",
          "button-edit":"Edit",
          "button-add-goal":"Add goal",
          "button-add-alert":"Add alert",
          "button-upload-video":"Upload video",
          "button-upload-audio":"Upload audio",
          "button-upload-image":"Upload image",
          "testalert-nickname-value":"Anonymous",
          "testalert-nickname-label":"Nickname",
          "testalert-message-label":"Message",
          "testalert-message-value":"Test message",
          "testalert-amount-label":"Amount",
          "testalert-button-label":"Send",
          "Payment Alerts": "Payment Alerts",
          "Music Player":"Music Player",
          "Music Player Info":"Music Player Info",
          "Donaters List":"Donaters List",
          "Payment History":"Payment History",
          "Music Player Remote Control":"Music Player Remote Control",
          "Donation Timer":"Donation Timer",
          "Video Popup":"Video Popup",
          "Roulette":"Roulette",
          "Donation Goals":"Donation Goals",
          "tab-donationgoal-appearance":"Appearance",
          "tab-donationgoal-goals":"Goals",
          "tab-reel-general":"General",
          "tab-reel-prizes":"Prizes",
          "tab-donaters-list-content":"Content",
          "tab-donaters-list-title":"Title",
          "tab-donaters-list-list":"List",
          "tab-donaters-list-style":"Style",
          "tab-alert-alerts":"Alerts",
          "tab-alert-default":"Default",
          "tab-alert-trigger":"Trigger",
          "tab-alert-image":"Image",
          "tab-alert-audio":"Audio",
          "tab-alert-voice":"Voice",
          "tab-alert-title":"Title",
          "tab-alert-message":"Message",
          "widget-media-title-font-size":"Font size for song title in playlist",
          "widget-media-customer-font-size":"Font size for customer name in playlist",
          "widget-player-info-font-family":"Font family",
          "widget-player-info-font-size":"Font size",
          "widget-player-info-color":"Color",
          "widget-donaterslist-widget-type":"Widget type",
          "widget-donaterslist-donaters-amount":"Number of donaters",
          "widget-donaterslist-period":"Period",
          "widget-donaterslist-title":"Title",
          "widget-donaterslist-title-font-family":"Font family",
          "widget-donaterslist-title-font-size":"Font size",
          "widget-donaterslist-title-color":"Color",
          "widget-donaterslist-title-background-color":"Background",
          "widget-donaterslist-title-transparency":"Transparency",
          "widget-donaterslist-list-font-family":"Font family",
          "widget-donaterslist-list-font-size":"Font size",
          "widget-donaterslist-list-color":"Color",
          "widget-donaterslist-list-background-color":"Background",
          "widget-donaterslist-list-transparency":"Transparency",
          "widget-donaterslist-list-vertical-layout":"The list of nicknames will be placed vertically",
          "widget-donaterslist-list-horizontal-layout":"The list of nicknames will be placed in one line",
          "widget-payments-customer-font-size":"Font size for donater nickname",
          "widget-payments-message-font-size":"Font size for message",
          "widget-donation-timer-refresh":"Refresh timer when opens",
          "widget-donation-timer-font-family":"Font family",
          "widget-donation-timer-font-size":"Font size",
          "widget-donation-timer-color":"Color",
          "widget-donation-timer-text":"Text",
          "widget-player-popup-sound-only":"Sound only",
          "widget-reel-font-family":"Font family",
          "widget-reel-font-size":"Font size",
          "widget-reel-color":"Color",
          "widget-reel-border-color":"Border color",
          "widget-reel-border-width":"Border width",
          "widget-reel-background-color":"Background color for selected item",
          "widget-reel-displayed-amount":"Amount of displayed cards",
          "widget-reel-turning-time":"Time for one turn  (milliseconds)",
          "widget-reel-waiting-time":"Waiting time (seconds)",
          "widget-reel-required-amount":"Required amount (RUB)",
          "widget-donationgoal-title-font-family":"Font for title",
          "widget-donationgoal-title-font-size":"Font size for title",
          "widget-donationgoal-title-color":"Title color",
          "widget-donationgoal-title-alignment":"Title alignment",
          "widget-donationgoal-amount-font-family":"Font for amount",
          "widget-donationgoal-amount-font-size":"Font size for amount",
          "widget-donationgoal-amount-color":"Amount color",
          "widget-donationgoal-background":"Background color",
          "widget-donationgoal-filled-color":"Filled part color",
          "widget-donationgoal-amount-alignment":"Amount alignment",
          "widget-goal-title":"Title",
          "widget-goal-description":"Description",
          "widget-goal-amount":"Amount",
          "widget-goal-default":"Default",
          "widget-alert-amount":"Amount",
          "widget-alert-image-width":"Image width (px)",
          "widget-alert-image-height":"Image height (px)",
          "widget-alert-image-show-time":"Display duration (sec)",
          "widget-alert-voice-title-phrase":"Phrase for title announcement",
          "widget-alert-voice-empty-alert-phrase":"Phrase for alert announcement without message",
          "widget-alert-voice-if-empty":"Announce donation without message",
          "widget-alert-title-font-family":"Font",
          "widget-alert-title-font-size":"Font size",
          "widget-alert-title-color":"Color",
          "widget-alert-title-template":"Template",
          "widget-alert-message-font-family":"Font",
          "widget-alert-message-font-size":"Font size",
          "widget-alert-message-color":"Color",
          "widget-alert-use-greenscreen":"Use greenscreen",
          "widget-player-add-video":"Add video or playlist",
          "All":"All",
          "Top":"Top",
          "Last":"Last",
          "month":"Month",
          "day":"Day"
        },
      },
      ru: {
        translation: {
          "menu-widgets":"Виджеты",
          "menu-history":"История",
          "menu-payment-page-config":"Страница доната",
          "button-addwidget":"Добавить виджет",
          "button-spin":"Крутить",
          "button-testalert":"Тест",
          "button-save": "Сохранить",
          "button-cancel": "Отменить",
          "button-copy-url":"Скопировать URL",
          "button-rename":"Переименовать",
          "button-delete":"Удалить",
          "button-logout":"Выйти",
          "button-edit":"Редактировать",
          "button-add-goal":"Добавить цель",
          "button-add-alert":"Добавить оповещение",
          "button-upload-video":"Загрузить видео",
          "button-upload-audio":"Загрузить аудио",
          "button-upload-image":"Загрузить изображение",
          "testalert-nickname-value":"Аноним",
          "testalert-nickname-label":"Никнейм",
          "testalert-message-label":"Сообщение",
          "testalert-message-value":"Тестовое сообщение",
          "testalert-amount-label":"Сумма",
          "testalert-button-label":"Отправить",
          "Payment Alerts": "Алерты для донатов",
          "Music Player":"Проигрыватель видео",
          "Music Player Info":"Информация о текущем видео",
          "Donaters List":"Список донатеров",
          "Payment History":"События",
          "Music Player Remote Control":"Пульт для проигрывателя",
          "Donation Timer":"Счетчик времени без донатов",
          "Video Popup":"Видео из проигрывателя",
          "Roulette":"Рулетка",
          "Donation Goals":"Сбор средств",
          "tab-donationgoal-appearance":"Вид виджета",
          "tab-donationgoal-goals":"Цели",
          "tab-reel-general":"Общие",
          "tab-reel-prizes":"Призы",
          "tab-donaters-list-content":"Содержимое",
          "tab-donaters-list-title":"Заголовок",
          "tab-donaters-list-list":"Список",
          "tab-donaters-list-style":"Стиль",
          "tab-alert-alerts":"Оповещения",
          "tab-alert-default":"По умолчанию",
          "tab-alert-trigger":"Условие",
          "tab-alert-image":"Изображение",
          "tab-alert-audio":"Аудио",
          "tab-alert-voice":"Озвучка",
          "tab-alert-title":"Заголовок",
          "tab-alert-message":"Сообщение",
          "widget-media-title-font-size":"Размер шрифта в названии песни в плейлисте",
          "widget-media-customer-font-size":"Размер шрифта в имени заказчика в плейлисте",
          "widget-player-info-font-family":"Шрифт",
          "widget-player-info-font-size":"Размер шрифта",
          "widget-player-info-color":"Цвет",
          "widget-donaterslist-widget-type":"Тип виджета",
          "widget-donaterslist-donaters-amount":"Кол-во донатеров",
          "widget-donaterslist-period":"Период",
          "widget-donaterslist-title":"Заголовок",
          "widget-donaterslist-title-font-family":"Шрифт",
          "widget-donaterslist-title-font-size":"Размер шрифта",
          "widget-donaterslist-title-color":"Цвет",
          "widget-donaterslist-title-background-color":"Фон",
          "widget-donaterslist-title-transparency":"Прозрачность",
          "widget-donaterslist-list-font-family":"Шрифт",
          "widget-donaterslist-list-font-size":"Размер шрифта",
          "widget-donaterslist-list-color":"Цвет",
          "widget-donaterslist-list-background-color":"Фон",
          "widget-donaterslist-list-transparency":"Прозрачность",
          "widget-donaterslist-list-vertical-layout":"Список ников будет располагаться вертикально",
          "widget-donaterslist-list-horizontal-layout":"Список ников будет располагаться в одну линию",
          "widget-payments-customer-font-size":"Размер шрифта в имени донатера",
          "widget-payments-message-font-size":"Размер шрифта в сообщении",
          "widget-donation-timer-refresh":"Обнулять таймер при открытии",
          "widget-donation-timer-font-family":"Шрифт",
          "widget-donation-timer-font-size":"Размер шрифта",
          "widget-donation-timer-color":"Цвет",
          "widget-donation-timer-text":"Текст",
          "widget-player-popup-sound-only":"Только звук",
          "widget-reel-font-family":"Шрифт",
          "widget-reel-font-size":"Размер шрифта",
          "widget-reel-color":"Цвет",
          "widget-reel-border-color":"Цвет рамок",
          "widget-reel-border-width":"Толщина рамок",
          "widget-reel-background-color":"Фон выигравшей карточки",
          "widget-reel-displayed-amount":"Кол-во отображаемых карточек",
          "widget-reel-turning-time":"Время (мс) на один поворот",
          "widget-reel-waiting-time":"Время (сек), сколько крутить до выпадения результата",
          "widget-reel-required-amount":"Требуемая сумма",
          "widget-donationgoal-title-font-family":"Шрифт заголовка",
          "widget-donationgoal-title-font-size":"Размер шрифта заголовка",
          "widget-donationgoal-title-color":"Цвет заголовка",
          "widget-donationgoal-title-alignment":"Выравнивание заголовка",
          "widget-donationgoal-amount-font-family":"Шрифт суммы",
          "widget-donationgoal-amount-font-size":"Размер шрифта суммы",
          "widget-donationgoal-amount-color":"Цвет суммы",
          "widget-donationgoal-background":"Цвет фона полоски",
          "widget-donationgoal-filled-color":"Цвет заполненной части",
          "widget-donationgoal-amount-alignment":"Выравнивание суммы",
          "widget-goal-title":"Название",
          "widget-goal-description":"Описание",
          "widget-goal-amount":"Сумма",
          "widget-goal-default":"По умолчанию",
          "widget-alert-amount":"Сумма",
          "widget-alert-image-width":"Ширина изображения в пикселях",
          "widget-alert-image-height":"Высота изображения в пикселях",
          "widget-alert-image-show-time":"Сколько времени показывать изображение (сек)",
          "widget-alert-voice-title-phrase":"Фразы для озвучивания заголовка с сообщением",
          "widget-alert-voice-empty-alert-phrase":"Фразы для озвучивания заголовка если нет сообщения",
          "widget-alert-voice-if-empty":"Озвучивать заголовок если сообщение отсутствует",
          "widget-alert-title-font-family":"Шрифт",
          "widget-alert-title-font-size":"Размер шрифта",
          "widget-alert-title-color":"Цвет",
          "widget-alert-title-template":"Шаблон",
          "widget-alert-message-font-family":"Шрифт",
          "widget-alert-message-font-size":"Размер шрифта",
          "widget-alert-message-color":"Цвет",
          "widget-alert-use-greenscreen":"Использовать greenscreen",
          "widget-player-add-video":"Добавить видео или плейлист",
          "All":"Все",
          "Top":"Топ",
          "Last":"Последние",
          "month":"Месяц",
          "day":"День",
        },
      },
    },
    fallbackLng: "en",
    detection: {
      order: ["path", "localStorage", "htmlTag", "cookie"],
      caches: ["localStorage", "cookie"], // cache user language on
    },
  });

export default i18n;
