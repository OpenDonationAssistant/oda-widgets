import React from "react";
import ReactDOM from "react-dom/client";
import Payments from "./components/Payments/Payments";
import PlayerInfo from "./components/PlayerInfo/PlayerInfo";
import PaymentAlerts from "./components/PaymentAlerts/PaymentAlerts";
import MediaWidget from "./components/MediaWidget/MediaWidget";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import PlayerControl from "./components/PlayerControl/PlayerControl";
import DonatersTopList from "./components/DonatersTopList/DonatersTopList";
import ConfigurationPage from "./components/ConfigurationPage/ConfigurationPage";
import "./index.css";
import { config } from "./config";
import { log } from "./logging";
import auth from "./auth";
import axios from "axios";
import Login from "./components/Login/Login";
import DonationTimer from "./components/DonationTimer/DonationTimer";
import type { Params } from "react-router-dom";
import PaymentPageConfigComponent from "./components/PaymentPageConfig/PaymentPageConfigComponent";
import PaymentGatewaysConfiguration from "./pages/PaymentGatewaysConfiguration/PaymentGatewaysConfiguration";

async function widgetSettingsLoader({
  params,
}: {
  params: Params<"widgetId">;
}) {
  const recipientId = await auth();
  log.debug(`loading settings for ${recipientId}`);
  let settings = {};
  if (params.widgetId) {
    settings = await axios
      .get(
        `${process.env.REACT_APP_WIDGET_API_ENDPOINT}/widgets/${params.widgetId}`,
      )
      .then((json) => {
        return json.data;
      });
  }

  const conf = await config(recipientId);
  log.debug(`Configuration: ${JSON.stringify(conf)}`);
  const widgetId = params.widgetId;

  return { recipientId, settings, conf, widgetId };
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/configuration/widgets" />,
  },
  {
    path: "/configuration/news",
    element: <ConfigurationPage />,
    loader: widgetSettingsLoader,
  },
  {
    path: "/configuration/widgets",
    element: <ConfigurationPage />,
    loader: widgetSettingsLoader,
  },
  {
    path: "/configuration/gateways",
    element: <PaymentGatewaysConfiguration />,
    loader: widgetSettingsLoader,
  },
  {
    path: "/configuration/payment-page",
    element: <PaymentPageConfigComponent/>,
    loader: widgetSettingsLoader,
  },
  {
    path: "/payment-alerts/:widgetId",
    element: <PaymentAlerts />,
    loader: widgetSettingsLoader,
  },
  {
    path: "/media/:widgetId",
    element: <MediaWidget />,
    loader: widgetSettingsLoader,
  },
  {
    path: "/payments/:widgetId",
    element: <Payments />,
    loader: widgetSettingsLoader,
  },
  {
    path: "/player-info/:widgetId",
    element: <PlayerInfo />,
    loader: widgetSettingsLoader,
  },
  {
    path: "/player-control/:widgetId",
    element: <PlayerControl />,
    loader: widgetSettingsLoader,
  },
  {
    path: "/donaters-top-list/:widgetId",
    element: <DonatersTopList />,
    loader: widgetSettingsLoader,
  },
  {
    path: "/donation-timer/:widgetId",
    element: <DonationTimer />,
    loader: widgetSettingsLoader,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
