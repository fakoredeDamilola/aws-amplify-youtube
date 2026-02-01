import { useUIContext } from "../context/ContextProvider";
import { testCategories } from "../constants/data";
import {useNavigate} from "react-router-dom"

const SideBar = () => {

  const { isSidebarOpen } = useUIContext();
  const navigate = useNavigate();
  
  return (
    <div  
    className={`bg-black/90 h-[100vh] w-60 fixed transition-all duration-300 pt-10 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <h2 className="text-red-500 cursor-pointer text-xl p-2 font-bold" onClick={() => navigate("/")}>MeTube</h2>
      <div className="flex flex-col gap-2">
        {
          testCategories.map((category) => (
            <div key={category.id} className="p-2 px-4 hover:bg-gray-700 transition-colors duration-300">
              <p className="text-white">{category.name}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SideBar