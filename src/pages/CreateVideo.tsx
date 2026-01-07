import { useState } from "react";
import VideoUploadInput from "../components/VideoUploadInput"
import CategorySelection from "../components/CategorySelection"
import { uploadVideoToS3 } from "../lib/utils";
import { useUIContext } from "../context/ContextProvider";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const CreateVideo = () => {

  const client = generateClient<Schema>();

    const { authenticatedUser } = useUIContext();
    const [video, setVideo] = useState<File | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

  const handleSubmit = async() => {
    if (!video || !authenticatedUser?.userId) return;
    console.log(video,title,description,selectedCategories);

    // upload video to S3

    const response = await uploadVideoToS3(video,authenticatedUser?.userId);
    console.log({response});
    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categories", selectedCategories.join(","));

    // send to API
    console.log(formData);
    client.models.VideosTable.create({
      PK: `USER#${authenticatedUser?.userId}`,
      SK: `VIDEO#${Date.now()}`,
            GSI1PK: `VIDEO#${authenticatedUser?.userId}`,
            GSI1SK: `VIDEO#${Date.now()}`,
            GSI2PK: `CATEGORY#${selectedCategories[0]}`,
            GSI2SK: `${Date.now()}`,
            title:title,
            description:description,
            categories:selectedCategories.join(","),
            // s3Bucket:response?.bucketName,
            // s3Key:response?.key,
            createdAt: Date.now().toString(),
            updatedAt:Date.now().toString(),
            likesCount:0,
            dislikesCount:0,
            viewsCount:0,
            commentsCount:0,
            watchCount:0,
            userId:authenticatedUser?.userId,
            channelId:authenticatedUser?.channelId,
            thumbnailUrl:"",
            videoTimeLength:0,
    });
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
        <VideoUploadInput
        maxSizeMB={100}
        onChange={setVideo}
      />

<div>
    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 mt-7 w-full">Create Video</button>
</div>
    </div>
  )
}

export default CreateVideo