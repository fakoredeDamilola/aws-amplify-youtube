import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import SideBar from "./SideBar"
import { cn } from "../lib/utils"
import { useUIContext } from "../context/ContextProvider"

const RootLayout = () => {
  const { isSidebarOpen, showCategoryPanel } = useUIContext();
  return (
    <div className="flex">
  <SideBar />
  <div className="flex-1">
    <Navbar />
    <div className={cn(" relative z-10 transition-all duration-300", isSidebarOpen ? "left-60 w-[calc(100vw-240px)]" : "left-0 w-full", showCategoryPanel ? "mt-28" : "mt-16")}>
    <Outlet />
    </div>
  </div>
</div>

  )
}

export default RootLayout