import axios from "axios";
import { VideoData } from "@/types/index";
// ------- youtube video ---------

// api/youtube.ts

export const getVideoData = async (videoId: string): Promise<any> => {
  console.log(videoId);
  console.log(process.env.API_KEY_YOUTUBE);

  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=AIzaSyAtgjFV9vqnSR2JpwocqkpyzrRsCG_udfs`;

  try {
    const response = await axios.get<any>(url);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error fetching video data:", error);
    throw error;
  }
};
