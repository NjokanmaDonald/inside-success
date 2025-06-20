import axios from "axios";
import { baseUrl } from "../apiConfig";

export async function createReply({
  commentId,
  user,
  reply,
}: {
  commentId: string;
  user: string;
  reply: string;
}) {
  try {
    const res = await axios.post(`${baseUrl}/reply/create`, {
      commentId,
      user,
      reply,
    });
    return {
      success: true,
      data: res,
      message: "Reply created successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.response?.data?.message || "Something went wrong",
    };
  }
}
