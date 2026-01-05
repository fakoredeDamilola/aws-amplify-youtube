import { IVideo } from "../interfaces/IVideo"
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Videothumbnail = ({video}: {video: IVideo}) => {


  const navigate = useNavigate()

  const openVideo = (videoId:string) => {
    navigate(`/watch?v=${videoId}`)
  }

  return (
    <div className="w-[100%] max-h-[360px] h-[360px] p-2 hover:bg-gray-100 cursor-pointer transition-colors duration-300" onClick={() => openVideo(video.videoId)}>
      <img src={video.thumbnailImgUrl} alt="" className="h-60 img-cover rounded-xl hover:rounded-none transition-rounded duration-300" />
      <div className="flex justify-between mt-3">
           <div className="flex gap-3">
        <div>
            <img src={video.channelImgUrl} alt="" className="rounded-[50%] w-10 h-10"   />
        </div>
 <div>
        <h3 className="font-bold">{video.title}</h3>
        <p className="text-sm">{video.views}</p>
        <p className="text-sm">{video.uploadedTime}</p>
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