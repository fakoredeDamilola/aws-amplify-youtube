import { useUIContext } from "../context/ContextProvider";
import { useEffect, useState } from "react";
import { path } from "../routes/path";
import { useNavigate } from "react-router-dom";

const Channel = () => {
  const { closeSidebar, setShowCategoryPanel } = useUIContext();
  const navigate = useNavigate();

  useEffect(() => {
    closeSidebar();
    setShowCategoryPanel(false);
    return () => {
      setShowCategoryPanel(true);
    };
  }, []);

  const [activeTab, setActiveTab] = useState("Videos");

  const imgUrl = "";
  const description =
    "This is a sample channel description that explains what this channel is about and what kind of content you can expect to find here.";
  const tabs = ["Videos", "Playlists", "Community", "Channels", "About"];
  const videos: any[] = [];
  return (
    <div className="p-8">
      <div className="flex items-center gap-6">
        <div>
          {imgUrl ? (
            <img
              src={imgUrl}
              alt="Channel"
              className="w-32 h-32 rounded-full"
            />
          ) : (
            <div className="w-40 h-40 border border-gray-300 bg-blue-100 rounded-full flex items-center justify-center">
              <p className="text-gray-600 font-bold text-2xl">FD</p>
            </div>
          )}
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-bold ">Fakorede Damilola</h1>
          <p className="text-gray-400">
            {description.length > 40
              ? description.substring(0, 40) + "..."
              : description}
          </p>
          <p className="text-gray-400">1.2M subscribers</p>
          <p className="text-gray-400 mt-1">5 years ago</p>
          <div className="flex gap-2 mt-2">
            <button className="px-4 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition">
              Subscribe
            </button>
            <button className="px-4 py-2 bg-gray-700 text-white rounded-full font-semibold hover:bg-gray-600 transition">
              Messages
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex gap-4 border-b border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-semibold transition ${
                activeTab === tab
                  ? "text-black border-b-2 border-black"
                  : "text-gray-400 hover:text-black"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mt-4">
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {videos.map((video, index) => (
                <div key={index} className="cursor-pointer">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h3 className="mt-2 text-sm font-medium text-white">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-400">{video.views} views</p>
                </div>
              ))}
            </div>
          ) : (
          <div className="flex flex-col items-center justify-center h-64">
           <button className='py-2 px-5 bg-gray-300 rounded-3xl border border-gray-300 gap-2 text-white flex justify-center items-center ml-4 hover:bg-gray-400 transition' onClick={() => navigate(path.CREATE_VIDEO)}> Create content</button>
            <p className="text-gray-400 mt-2 text-center max-w-md">No content available for this tab. Start creating videos to build your channel.</p>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Channel;
