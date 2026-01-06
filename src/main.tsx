import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { UIContextProvider } from "./context/ContextProvider";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css"

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Authenticator hideSignUp={true} >
      <React.StrictMode>
    <UIContextProvider>
      <App />
    </UIContextProvider>
  </React.StrictMode>
  </Authenticator>
);
