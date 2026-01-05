import ShortThumbnail from "../components/ShortThumbnail"
import Videothumbnail from "../components/Videothumbnail"
import { topTwelveShorts, topTwelveVideos } from "../constants/data"

const Dashboard = () => {

  return (
   <div className="px-3 py-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {
  topTwelveVideos.slice(0,3).map((video) => (
    <Videothumbnail key={video.videoId} video={video} />
  ))
}
    </div>
    <div className="mt-6">
        <h2 className="font-bold text-xl">Shorts</h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-3">
      {
  topTwelveShorts.slice(0,5).map((video) => (
    <ShortThumbnail key={video.videoId} video={video} />
  ))
}
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {
  topTwelveVideos.slice(3,9).map((video) => (
    <Videothumbnail key={video.videoId} video={video} />
  ))
}
    </div>

   </div>
  )
}

export default Dashboard