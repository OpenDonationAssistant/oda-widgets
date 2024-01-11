import React, { useEffect, useState } from "react";
import classes from "./MessageTitle.module.css";
import { AlertController } from "../../../logic/alert/AlertController";

export default function MessageTitle({
  alertController,
}: {
  alertController: AlertController;
}) {
  const [style, setStyle] = useState<any>({});
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    alertController.addTitleRenderer({
      setStyle: setStyle,
      setTitle: setTitle,
    });
  }, [alertController]);

  return (
    <>
      <div style={style} className={classes.messageheader}>
        {title}
      </div>
    </>
  );
}
