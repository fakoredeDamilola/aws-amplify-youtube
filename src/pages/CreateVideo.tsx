import {  useState } from "react";
import { toast } from "react-toastify";
import VideoUploadInput from "../components/VideoUploadInput"
import CategorySelection from "../components/CategorySelection"
import { cn, uploadMediaToS3 } from "../lib/utils";
import { useUIContext } from "../context/ContextProvider";
import { fetchAuthSession } from "aws-amplify/auth";

const CreateVideo = () => {
  

    const { authenticatedUser } = useUIContext();
    const [video, setVideo] = useState<File | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [videoType, setVideoType] = useState<string>("Video");
    const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async() => {
    if (!video || !authenticatedUser?.userId) return;
    try{
      setLoading(true);
    console.log(video,title,description,selectedCategories);

    // upload video to S3
    const videoSlug = title.toLowerCase().replace(/\s/g, "-") || "video";
    // const thumbnailSlug = `${videoSlug}-thumbnail`;
    // const thumbnailResponse = await uploadMediaToS3(thumbnailSlug, thumbnail);

    const response = await uploadMediaToS3(videoSlug, video);
    console.log({ response });

    // upload thumbnail to S3

    // console.log({ thumbnailResponse });
    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categories", selectedCategories.join(","));

const session = await fetchAuthSession();
const idToken = session.tokens?.idToken;
const channelName = idToken?.payload.nickname;
console.log({channelName})

    // send to API (video + thumbnail S3 keys available in response.path / thumbnailResponse.path)
    console.log({response});
    setLoading(true);
    // const uploadingDetails = await client.models.VideosTable.create({
    //   PK: `USER#${authenticatedUser?.userId}`,
    //   SK: `VIDEO#${Date.now()}`,
    //         GSI1PK: `VIDEO#${authenticatedUser?.userId}`,
    //         GSI1SK: `VIDEO#${Date.now()}`,
    //         GSI2PK: `CATEGORY#${selectedCategories[0]}`,
    //         GSI2SK: `${Date.now()}`,
    //         GSI3PK: `CHANNEL#${channelName}`,
    //         GSI3SK: `CHANNEL#${Date.now()}`,
    //         title:title,
    //         description:description,
    //         categories:selectedCategories.join(","),
    //         s3Bucket:bucketName,
    //         s3Key:response?.path,
    //         createdAt: Date.now().toString(),
    //         updatedAt:Date.now().toString(),
    //         likesCount:0,
    //         dislikesCount:0,
    //         viewsCount:0,
    //         commentsCount:0,`
    //         watchCount:0,
    //         userId:authenticatedUser?.userId,
    //         channelId:authenticatedUser?.channelId,
    //         thumbnailUrl:"",
    //         videoTimeLength:0,
    //         videoType,
    //         channelName:channelName || "anonymous",
    // });
    // console.log({uploadingDetails});
    // setTitle("");
    // setDescription("");
    // setSelectedCategories([]);
    // setVideo(null);
    // setVideoType("Video");
    // setLoading(false);
    toast.success("Video uploaded successfully");
    // navigate("/");
    }catch(error){
      console.log(error);
      setLoading(false);
      const message = (error as any)?.message || "Failed to upload video";
      toast.error(message);
    }
  };


  return (
    <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">Create Video</h1>
        <p className="text-gray-600 mb-6">Create a new video</p>
        <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input type="text" id="title" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input type="text" id="description" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="mb-4">
            <CategorySelection
                selectedCategories={selectedCategories}
                onChange={setSelectedCategories}
            />
        </div>
        <div className="mb-4">
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">
            Thumbnail image
          </label>
          {/* <input
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setThumbnail(file);
            }}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="mt-1 text-xs text-gray-500">Upload a JPG or PNG thumbnail.</p> */}
        </div>
        <div className="mb-4">
          <label htmlFor="videoType" className="block text-sm font-medium text-gray-700 mb-2">Video type</label>
          <select
            id="videoType"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
            value={videoType}
            onChange={(e) => setVideoType(e.target.value)}
          >
            <option value="Video">Video</option>
            <option value="Short">Short</option>
          </select>
        </div>
        <VideoUploadInput
        maxSizeMB={100}
        onChange={setVideo}
      />

<div>
    <button onClick={handleSubmit} disabled={loading} className={cn("px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 mt-7 w-full", loading && "opacity-50 cursor-not-allowed")}>{loading ? "Uploading..." : "Create Video"}</button>
</div>
    </div>
  )
}

export default CreateVideo