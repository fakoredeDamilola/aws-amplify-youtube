import { VideoType } from "../constants/enums";

export interface IVideo {
    PK: string;
    SK: string;
    GSI1PK: string | null;
    GSI1SK: string | null;
    GSI2PK: string | null;
    GSI2SK: string | null;
    GSI3PK: string | null;
    GSI3SK: string | null;
    title: string | null;
    description: string | null;
    categories: string | null;
    s3Bucket: string | null;
    s3Key: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    likesCount: number | null;
    dislikesCount: number | null;
    channelId: string | null;
    // channelImgUrl: string | null;
    // channelUrl: string | null;
    thumbnailUrl: string | null;
    videoTimeLength: number | null;
    videoType: VideoType;
    // videoUrl: string | null;
    viewsCount: number | null;
    watchCount: number | null;
    channelName: string | null;
}
