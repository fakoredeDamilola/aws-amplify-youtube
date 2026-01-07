import React from "react";
import { path } from "./path";
import Channel from "../pages/Channel";
import { Authenticator } from "@aws-amplify/ui-react";

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Login = React.lazy(() => import("../pages/Login"));
const Signup = React.lazy(() => import("../pages/Signup"));
const Settings = React.lazy(() => import("../pages/Settings"));
const Watch = React.lazy(() => import("../pages/Watch"));
const CreateVideo = React.lazy(() => import("../pages/CreateVideo"));

export const routes = [
    {
        index: true,
        path: path.DASHBOARD,
        element: <Dashboard />
    },
    {
        path: path.SETTINGS,
        element: <Settings />
    },
    {
        path: path.LOGIN,
        element: <Login />
    },
    {
        path: path.SIGNUP,
        element: <Signup />
    },
    {
        path: path.WATCH,
        element: <Watch />
    },
    {
        path: path.CHANNEL,
        element: 
        <Authenticator>
            <Channel />
        </Authenticator>
    },
    {
        path: path.CREATE_VIDEO,
        element: 
        <Authenticator>
            <CreateVideo />
        </Authenticator>
    }
]