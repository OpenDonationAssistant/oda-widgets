import React, { useContext } from "react";
import { Tabs as AntTabs, Input, InputNumber, Select, Slider } from "antd";
import { useTranslation } from "react-i18next";
import { PaymentAlertsWidgetSettingsContext } from "./PaymentAlertsWidgetSettings";
import { observer } from "mobx-react-lite";
import classes from "./PaymentAlertsWidgetSettingsComponent.module.css";

export const APPEARANCE_ANIMATIONS = [
  "bounce",
  "flash",
  "pulse",
  "rubberBand",
  "shakeY",
  "shakeX",
  "headShake",
  "swing",
  "tada",
  "wobble",
  "jello",
  "heartBeat",
  "backInDown",
  "backInLeft",
  "backInRight",
  "backInUp",
  "bounceIn",
  "bounceInDown",
  "bounceInLeft",
  "bounceInRight",
  "bounceInUp",
  "fadeIn",
  "fadeInDown",
  "fadeInDownBig",
  "fadeInLeft",
  "fadeInLeftBig",
  "fadeInRight",
  "fadeInRightBig",
  "fadeInUp",
  "fadeInUpBig",
  "fadeInTopLeft",
  "fadeInTopRight",
  "fadeInBottomLeft",
  "fadeInBottomRight",
  "flip",
  "flinInX",
  "flipInY",
  "lightSpeedInRight",
  "lightSpeedInLeft",
  "rotateIn",
  "rotateInDownLeft",
  "rotateInDownRight",
  "rotateInUpLeft",
  "rotateInUpRight",
  "hinge",
  "jackInTheBox",
  "rollIn",
  "zoomIn",
  "zoomInDown",
  "zoomInLeft",
  "zoomInRight",
  "zoomInUp",
  "slideInDown",
  "slideInLeft",
  "slideInRight",
  "slideInUp",
];

export const PaymentAlertsWidgetSettingsComponent = observer(() => {
  const settings = useContext(PaymentAlertsWidgetSettingsContext);
  const { t } = useTranslation();

  function addDefaultAlert(): void {
    settings.addAlert();
  }

  return (
    <AntTabs
      type="card"
      items={[
        {
          key: "1",
          label: t("tab-alert-alerts"),
          children: (
            <>
              <div className={`${classes.adddalertbutton}`}>
                <button
                  className="oda-btn-default"
                  onClick={() => addDefaultAlert()}
                >
                  {t("button-add-alert")}
                </button>
              </div>
              <div className={`${classes.preview}`}>
                {settings.alerts.map((it) => it.markup())}
              </div>
            </>
          ),
        },
      ]}
    />
  );
});