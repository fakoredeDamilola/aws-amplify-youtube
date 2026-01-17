import { clsx, type ClassValue } from "clsx";
import { uploadData } from "@aws-amplify/storage";

export function cn(...inputs: ClassValue[]) {
  return clsx(...inputs);
}

export async function uploadMediaToS3(mediaSlug: string, media: File) {
  try {

    const response = await uploadData({
      data: media,
      path: `videos/${mediaSlug}.mp4`,
    }).result;
    console.log({ response });
    return response;
  } catch (error) {
    console.log(error);
  }
}
