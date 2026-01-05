import { useUIContext } from "../context/ContextProvider";

const SideBar = () => {

  const { isSidebarOpen, toggleSidebar } = useUIContext();
  return (
    <div  
    className={`bg-yellow-500 h-[100vh] w-60 fixed transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >SideBar</div>
  )
}

export default SideBar