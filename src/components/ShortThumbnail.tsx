import { HiDotsVertical } from "react-icons/hi"
import { IVideo } from "../interfaces/IVideo"

const ShortThumbnail = ({video}: {video: IVideo}) => {
  return (
   <div className="w-full max-h-[460px] h-[460px] p-2 hover:bg-gray-100 cursor-pointer transition-colors duration-300">
      <img src={video.thumbnailImgUrl} alt="" className="h-88 img-cover rounded-xl hover:rounded-none transition-rounded duration-300" />
      <div className="flex justify-between mt-3">
          <div className="flex gap-4">
      
 <div>
        <h2 className="font-bold">{video.title}</h2>
        <p className="text-sm">{video.views}</p>
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