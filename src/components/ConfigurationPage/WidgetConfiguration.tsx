import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";

import "./css/Widget.css";
import "./css/WidgetList.css";
import "./css/WidgetButton.css";
import "./css/WidgetSettings.css";

import PaymentAlertSettings from "./settings/PaymentAlertsSettings";
import { WidgetsContext } from "./WidgetsContext";
import BaseSettings from "./settings/BaseSettings";
import { publish, socket } from "../../socket";
import ReelWidgetSettings from "../../pages/Reel/ReelWidgetSettings";
import { log } from "../../logging";
import { Button } from "antd";
import { useLoaderData } from "react-router";
import { WidgetData } from "../../types/WidgetData";
import TextAlertButton from "./settings/TestAlertButton";

interface WidgetConfigurationProps {
  id: string;
  name: string;
  type: string;
  reload: Function;
}

function getSettingsWidget(id: string, type: string, onChange: Function) {
  switch (type) {
    case "payment-alerts":
      return <PaymentAlertSettings id={id} onChange={onChange} />;
    case "reel":
      return <ReelWidgetSettings id={id} />;
    default:
      return <BaseSettings id={id} />;
  }
}

function deleteWidget(id: string) {
  return axios.delete(
    `${process.env.REACT_APP_WIDGET_API_ENDPOINT}/widgets/${id}`,
  );
}

export default function WidgetConfiguration({
  id,
  name,
  type,
  reload,
}: WidgetConfigurationProps) {
  const { config, setConfig, updateConfig } = useContext(WidgetsContext);
  const { conf } = useLoaderData() as WidgetData;
  const [settingsHidden, setSettingsHidden] = useState<boolean>(true);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [showWidgetMenu, setShowWidgetMenu] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [newName, setNewName] = useState(name);
  const context = {
    config: config,
    setConfig: setConfig,
    updateConfig: update,
  };

  const menuRef = useRef(null);

  function update(id: string, key: string, value: any) {
    updateConfig(id, key, value);
    setHasChanges(true);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowWidgetMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  function toggleSettings() {
    setSettingsHidden(!settingsHidden);
  }

  function saveSettings() {
    const settings = config.get(id);
    log.debug({ id: id, settings: settings }, "saving settings");
    const props = settings?.properties.map((prop) => {
      return {
        name: prop.name,
        value: prop.value,
      };
    });
    log.debug({ updated: props }, "sending props");
    const request = {
      name: newName,
      config: {
        properties: props,
        alerts: settings?.alerts,
      },
    };
    return axios.patch(
      `${process.env.REACT_APP_WIDGET_API_ENDPOINT}/widgets/${id}`,
      request,
    );
  }

  function getProperty(name: string): any {
    return config.get(id)?.properties.find((prop) => prop.name === name)?.value;
  }

  function getRndInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function runReel() {
    const optionList = getProperty("optionList");
    const choosenIndex = getRndInteger(0, optionList.length - 1);
    publish(conf.topic.reel, {
      type: "trigger",
      selection: optionList[choosenIndex],
      widgetId: id,
    });
  }

  return (
    <div className={`widget ${settingsHidden ? "collapsed" : "extended"}`}>
      <div className="widget-header">
        <div className="widget-header-toogler" onClick={toggleSettings}>
          <img className="widget-icon" src={`/icons/${type}.png`} />
          {!renaming && <div className="widget-title">{name}</div>}
          {renaming && (
            <input
              onChange={(e) => setNewName(e.target.value)}
              className="new-name-input"
              value={newName}
            />
          )}
        </div>
        {!hasChanges && type === "reel" && <Button onClick={runReel} className="oda-btn-default">Крутить</Button>}
        {!hasChanges && type === "payment-alerts" && <TextAlertButton config={config}/>}
        {hasChanges && (
          <>
            <button
              className="widget-button widget-button-accept"
              onClick={() => {
                setHasChanges(false);
                setRenaming(false);
                saveSettings().then((ignore) => reload.apply({}));
                socket.publish({
                  destination: "/topic/commands",
                  body: JSON.stringify({
                    id: id,
                    command: "reload",
                  }),
                });
              }}
            >
              <div className="blinker">Сохранить</div>
            </button>
            <button
              className="widget-button widget-button-decline"
              onClick={() => {
                setHasChanges(false);
                setRenaming(false);
                reload.apply({});
              }}
            >
              <div className="blinker">Отменить</div>
            </button>
          </>
        )}
        {!hasChanges && (
          <>
            <div className="widget-button-list">
              <button
                onClick={() => setShowWidgetMenu(!showWidgetMenu)}
                className="widget-button widget-button-more"
              >
                <span className="material-symbols-sharp">more_vert</span>
              </button>
            </div>
          </>
        )}
      </div>
      <div ref={menuRef}>
        <div
          className={`widget-settings ${
            settingsHidden ? "visually-hidden" : ""
          }`}
        >
          {config.get(id) && (
            <WidgetsContext.Provider value={context}>
              {getSettingsWidget(id, type, () => setHasChanges(true))}
            </WidgetsContext.Provider>
          )}
        </div>
        {showWidgetMenu && (
          <div className="widget-button-menu">
            <div
              onClick={() => {
                navigator.clipboard.writeText(
                  `${process.env.REACT_APP_ENDPOINT}/${type}/${id}`,
                );
                setShowWidgetMenu(false);
              }}
              className="widget-menu-item"
            >
              Copy URL
            </div>
            <div
              onClick={() => {
                setRenaming(true);
                setHasChanges(true);
                setShowWidgetMenu(false);
              }}
              className="widget-menu-item"
            >
              Rename
            </div>
            <div
              onClick={() => {
                deleteWidget(id).then(() => reload.apply({}));
                setShowWidgetMenu(false);
              }}
              className="widget-menu-item"
            >
              Delete
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
