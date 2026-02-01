import { IVideo } from "../interfaces/IVideo"
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { getUrl } from "aws-amplify/storage";
import { useEffect, useState } from "react";
import { useUIContext } from "../context/ContextProvider";
import { VideoType } from "../constants/enums";


const Videothumbnail = ({video}: {video: IVideo}) => {
const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

const { setSelectedVideo,setSelectedMediaType } = useUIContext();
useEffect(() => {
  if (!video.thumbnailUrl) return;

    (async () => {
      try {
        const { url } = await getUrl({ path: `thumbnails/${video.thumbnailUrl}` });
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
    setSelectedMediaType(VideoType.Video);
  }

  const videoThumbnailUrl = thumbnailUrl || "";
  const createdAtDate =
  video.createdAt ? new Date(Number(video.createdAt)) : null;
  return (
    <div className="w-[100%] max-h-[360px] h-[360px] p-2 hover:bg-gray-100 cursor-pointer transition-colors duration-300" onClick={() => openVideo(video.title || '')}>
      <img src={videoThumbnailUrl} alt="" className="h-60 img-cover rounded-xl hover:rounded-none transition-rounded duration-300" />
      <div className="flex justify-between mt-3">
           <div className="flex gap-3">
        <div>
            <img src={videoThumbnailUrl} alt="" className="rounded-[50%] w-10 h-10"   />
        </div>
 <div>
        <h3 className="font-bold">{video.title}</h3>
        <p className="text-sm">{video.viewsCount} views</p>
        <p>{video.channelName}</p>
      <p className="text-sm">
            {createdAtDate ? createdAtDate.toLocaleDateString() : ''}
      </p>
      </div>

      </div>
      <div>
<HiDotsVertical className="mt-1 text-lg" />
      </div>
      </div>
   
     
    </div>
  )
}

export default Videothumbnail