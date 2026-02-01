import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import SideBar from "./SideBar"
import { cn } from "../lib/utils"
import { useUIContext } from "../context/ContextProvider"
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect } from "react"

const RootLayout = () => {
  const { isSidebarOpen, showCategoryPanel, setAuthenticatedUser, setIsSidebarOpen, setShowCategoryPanel } = useUIContext();
  const { route } = useAuthenticator(context => [context.route]);
  const { user } = useAuthenticator(context => [context.user]);
console.log({route,user})
  useEffect(() => {
    if (user) {
      setAuthenticatedUser(user);
      
    }
    if(route === "signIn" || route === "signUp" || route === "confirmSignUp") {
      setIsSidebarOpen(false);
      setShowCategoryPanel(false);
    }
  }, [user])

  return (
    <div className="flex">
      {isSidebarOpen ? <SideBar /> : null}
      <div className="flex-1">
        {route === "signIn" || route === "signUp" || route === "confirmSignUp" ? null : <Navbar />}
        <div className={cn(" relative z-10 transition-all duration-300",isSidebarOpen ? "left-60 w-[calc(100vw-240px)]" : "left-0 w-full", showCategoryPanel ? "mt-28" : "mt-16")}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default RootLayout;