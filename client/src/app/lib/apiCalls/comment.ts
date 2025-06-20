import axios from "axios";
import { baseUrl } from "../apiConfig";
import { cache } from "react";

export async function createComment({
  decisionRoomId,
  user,
  comment,
}: {
  decisionRoomId: string;
  user: string;
  comment: string;
}) {
  try {
    const res = await axios.post(`${baseUrl}/comment/create`, {
      decisionRoomId,
      user,
      comment,
    });
    return {
      success: true,
      data: res,
      message: "Comment created successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.response?.data?.message || "Something went wrong",
    };
  }
}

export const getComments = cache(async (roomId: string) => {
  const res = await axios.get(`${baseUrl}/comment/get/${roomId}`);
  return res.data.data;
});
