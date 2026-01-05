import { VideoType } from "../constants/enums";

export interface IVideo {
  videoId: string;
  thumbnailImgUrl: string;
  title: string;
  views: string;
  uploadedTime: string;
  channelName: string;
  channelImgUrl: string;
  videoViews: number;
  videoUrl: string;
  channelUrl: string;
  videoType: VideoType;
}
