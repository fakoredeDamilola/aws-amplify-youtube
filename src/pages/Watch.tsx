import { useSearchParams } from "react-router-dom"
import { useUIContext } from "../context/ContextProvider"
import { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import { getUrl } from "aws-amplify/storage"

const Watch = () => {
     const [searchParams] = useSearchParams()
     const [videoUrl, setVideoUrl] = useState<string | null>(null)
     const [playedSeconds, setPlayedSeconds] = useState(0);
  const videoId = searchParams.get("v")
  console.log({ videoId })
  const { closeSidebar, setShowCategoryPanel ,selectedVideo, selectedMediaType} = useUIContext();

  const generateVideoUrl =async () => {
          try {
          
            const videoSlug = selectedVideo.title.toLowerCase().replace(/\s/g, "-") || "video";
            const { url } = await getUrl({ path: `outputs/${videoSlug}.mp4` });
            console.log("thumbnail getUrl", { url, key: selectedVideo.videoOutputPath});
            setVideoUrl(url.toString());
          } catch (err) {
            console.error("Failed to get thumbnail URL", err);
          }
        
  }

  useEffect(() => {
    generateVideoUrl();
    closeSidebar();
    setShowCategoryPanel(false);
    return () => {
      setShowCategoryPanel(true);
    };
  }, [selectedVideo, selectedMediaType]);


  const handleProgress = (event:React.SyntheticEvent<HTMLVideoElement, Event>) => {
    // setPlayedSeconds(event?.target.currentTime || 0);
    console.log('Played seconds:', event);
  };

  return (
    <div className="p-4">
      <div className="w-[65%] h-[55vh] rounded-lg flex items-center justify-center">
      <ReactPlayer  onProgress={(progress) => {
       handleProgress(progress);
     }}  light={selectedVideo.thumbnailImgFullPath || ""} src={videoUrl || ""}  controls={true} width='100%' height='100%'  />
      </div>
      <div className="mt-4">
        <h1 className="text-xl font-semibold">{selectedVideo.title}</h1>
        <p className="text-muted-foreground mt-2">{selectedVideo.description}</p>
      </div>
    </div>
  )
}

export default Watch  