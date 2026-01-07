import { clsx, type ClassValue } from "clsx";
import { uploadData } from "@aws-amplify/storage";

export function cn(...inputs: ClassValue[]) {
  return clsx(...inputs);
}


export async function uploadVideoToS3(video: File,userId:string) {
    try {
            const response = 
             await uploadData({
        data: video,
        path: `videos/${userId}/${video.name}`
      });
      console.log({response});
      return response;
    } catch (error) {
        console.log(error);
    }
}