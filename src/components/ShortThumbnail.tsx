import { HiDotsVertical } from "react-icons/hi"
import { IVideo } from "../interfaces/IVideo"
import { useUIContext } from "../context/ContextProvider";
import { VideoType } from "../constants/enums";
import { getUrl } from "aws-amplify/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShortThumbnail = ({video}: {video: IVideo}) => {

  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  
  const { setSelectedVideo,setSelectedMediaType } = useUIContext();
  useEffect(() => {
    if (!video.thumbnailUrl) return;
  
    (async () => {
      try {
        const { url } = await getUrl({ path: `thumbnails/${video.thumbnailUrl}` });
        console.log("thumbnail getUrl", { url, key: video.thumbnailUrl });
        setThumbnailUrl(url.toString());
      } catch (err) {
        console.error("Failed to get thumbnail URL", err);
      }
    })();
  }, [video.thumbnailUrl]);
  
  
  
    const navigate = useNavigate()
  
    const openVideo = (videoTitle:string) => {
      const videoId = videoTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');
      navigate(`/watch?v=${videoId}`)
     setSelectedVideo({...video,thumbnailImgFullPath:thumbnailUrl});
      setSelectedMediaType(VideoType.Short);
    }
  
    const videoThumbnailUrl = thumbnailUrl || "";
    console.log({videoThumbnailUrl})
  return (
   <div className="w-full max-h-[460px] h-[460px] p-2 hover:bg-gray-100 cursor-pointer transition-colors duration-300" onClick={() => openVideo(video.title || '')}>
      <img src={videoThumbnailUrl} alt="" className="h-88 img-cover rounded-xl hover:rounded-none transition-rounded duration-300" />
      <div className="flex justify-between mt-3">
          <div className="flex gap-4">
      
 <div>
        <h2 className="font-bold">{video.title}</h2>
        <p className="text-sm">{video.watchCount}</p>
      </div>

      </div>
         <div>
      <HiDotsVertical className="mt-1 text-lg" />
            </div>
      </div>
    
     
    </div>
  )
}

export default ShortThumbnail