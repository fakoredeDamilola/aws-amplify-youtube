import { IoSearchSharp } from "react-icons/io5";

const Search = () => {
  return (
    <div className="flex w-full h-[100%] items-center">
      <div className="w-full flex h-10 align-center justify-center">
        <input className="w-[45%] p-2 border border-[rgba(255,255,255,0.3)] border-r-0 rounded-l-xl" type="text" placeholder="Search" />
        <button className="p-2   rounded-r-xl w-16 flex items-center justify-center bg-secondary"><IoSearchSharp className="text-xl text-white" /></button>
      </div>
    </div>
  )
}

export default Search