import { useSearchParams } from "react-router-dom"
import { useUIContext } from "../context/ContextProvider"
import { useEffect } from "react"

const Watch = () => {
     const [searchParams] = useSearchParams()
  const videoId = searchParams.get("v")
  console.log({ videoId })
  const { closeSidebar, setShowCategoryPanel } = useUIContext();

  useEffect(() => {
    closeSidebar();
    setShowCategoryPanel(false);
    return () => {
      setShowCategoryPanel(true);
    };
  }, []);

  return (
    <div className="p-4">
      <div className="w-[65%] h-[55vh] bg-red-500 rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground">Video Player</span>
      </div>
      <div className="mt-4">
        <h1 className="text-xl font-semibold">Video Title</h1>
        <p className="text-muted-foreground mt-2">Video description would go here...</p>
      </div>
    </div>
  )
}

export default Watch