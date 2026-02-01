import { useEffect, useState } from "react"
import ShortThumbnail from "../components/ShortThumbnail"
import Videothumbnail from "../components/Videothumbnail"
import { generateClient } from "aws-amplify/api"
import { Schema } from "../../amplify/data/resource"
import { VideoType } from "../constants/enums"
import { IVideo } from "../interfaces/IVideo"

const Dashboard = () => {

  const [videos, setVideos] = useState<IVideo[]>([]);
  const [shorts, setShorts] = useState<IVideo[]>([]);

  const client = generateClient<Schema>();
  useEffect(() => {
     client.models.VideosTable.observeQuery().subscribe({
      next: (data) => {
        console.log({data});
        const videos = data.items.filter((item) => item.videoType === VideoType.Video);
        const shorts = data.items.filter((item) => item.videoType === VideoType.Short);
        setVideos(videos as IVideo[]);
        setShorts(shorts as IVideo[]);
      },
    });
  }, []);

  return (
   <div className="px-3 py-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {
  videos.slice(0,3).map((video) => (
    <Videothumbnail key={video.SK} video={video} />
  ))
}
    </div>
   {shorts.length > 0 && <div className="mt-6">
        <h2 className="font-bold text-xl">Shorts</h2>
    </div>}
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-3">
      {
  shorts.slice(0,5).map((video) => (
    <ShortThumbnail key={video.SK} video={video} />
  ))
}
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {
  videos.slice(3,9).map((video) => (
    <Videothumbnail key={video.SK} video={video} />
  ))
}
    </div>

   </div>
  )
}

export default Dashboard