import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { UIContextProvider } from "./context/ContextProvider";
import "@aws-amplify/ui-react/styles.css"
import { Authenticator } from "@aws-amplify/ui-react";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  
  <Authenticator.Provider>
 <React.StrictMode>
    <UIContextProvider>
      <App />
    </UIContextProvider>
  </React.StrictMode>
  </Authenticator.Provider>
 
);
