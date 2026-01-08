import { clsx, type ClassValue } from "clsx";
import { uploadData } from "@aws-amplify/storage";
import { fetchAuthSession } from 'aws-amplify/auth';

export function cn(...inputs: ClassValue[]) {
  return clsx(...inputs);
}


export async function uploadVideoToS3(videoSlug:string,video: File) {
    try {
      const session = await fetchAuthSession();
      const identityId = session?.identityId;
      console.log({identityId});

            const response = 
             await uploadData({
        data: video,
        path: `videos/${identityId}/${videoSlug}`
      });
      console.log({response});
      return response;
    } catch (error) {
        console.log(error);
    }
}