import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from '../components/Search';
import { FaPlus } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Categories from '../components/Categories';
import { useUIContext } from '../context/ContextProvider';
import { cn } from '../lib/utils';
import { path } from "../routes/path";
import { useAuthenticator } from "@aws-amplify/ui-react";

const Navbar = () => {
  const imgURL = ""
  const { isSidebarOpen, toggleSidebar, showCategoryPanel } = useUIContext();
  const { signOut } = useAuthenticator();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  const handleAvatarClick = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  const handleViewChannel = () => {
    navigate("/channel/demo-channel");
    setIsProfileMenuOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    setIsProfileMenuOpen(false);
  };
  
  return (
    <div  className={cn(
        "bg-primary fixed top-0 z-20 transition-all duration-300",
        isSidebarOpen ? "left-60 w-[calc(100vw-240px)]" : "left-0 w-full", showCategoryPanel ? "h-28" : "h-16"
      )}>
    <div
    className='flex h-16'
    >
<div className="p-2 mt-5 pl-2" onClick={handleToggleSidebar}>
<GiHamburgerMenu className="text-white text-xl" />
</div>
        <div className="flex h-[100%] w-full">
            <Search />
        </div>
        <div className=' w-68 flex justify-between items-center gap-3 pr-4'>
          <button className='py-2 px-3 bg-secondary rounded-3xl border border-gray-300 gap-2 text-white flex justify-center items-center' onClick={() => navigate(path.CREATE_VIDEO)}><FaPlus className="text-lg text-white" /> Create</button>
          <div>
            <FaBell className="text-xl text-white" />
          </div>
          <div className="relative">
            <button
              type="button"
              className="w-8 h-8 bg-gray-400 rounded-full overflow-hidden flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white"
              onClick={handleAvatarClick}
            >
              {imgURL ? (
                <img src={imgURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-semibold text-white">FD</span>
              )}
            </button>

            <div
              className={cn(
                "absolute right-0 mt-2 w-40 rounded-md bg-black/90 text-white shadow-lg border border-gray-700 py-1 origin-top-right transition-all duration-200",
                isProfileMenuOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              )}
            >
              <button
                type="button"
                className="w-full text-left px-3 py-2 text-sm hover:bg-white/10"
                onClick={handleViewChannel}
              >
                View channel
              </button>
              <button
                type="button"
                className="w-full text-left px-3 py-2 text-sm hover:bg-white/10"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
    </div>
   {showCategoryPanel && <Categories />}
    </div>
  )
}

export default Navbar