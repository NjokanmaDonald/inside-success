import axios from "axios";
import { cache } from "react";
import { baseUrl } from "../apiConfig";

export async function createRoom(
  data: {
    title: string;
    description: string;
    votingOptions: string[];
    deadline: string;
  },
  token: string
) {
  try {
    const res = await axios.post(`${baseUrl}/decision-room/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      success: true,
      data: res.data,
      message: "Room created successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.response?.data?.message || "Something went wrong",
    };
  }
}
export async function joinRoom({
  userId,
  decisionRoomId,
}: {
  userId: string;
  decisionRoomId: string;
}) {
  try {
    const res = await axios.post(`${baseUrl}/decision-room/new-member`, {
      userId,
      decisionRoomId,
    });

    return {
      success: true,
      data: res,
      message: "Room joined successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.response?.data?.message || "Something went wrong",
    };
  }
}

export const getDecisonRooms = cache(async (token: string) => {
  const rooms = await axios.get(`${baseUrl}/decision-room/get-all-for-a-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return rooms.data;
});

export const getOneDecisionRoom = cache(async (id: string) => {
  const room = await axios.get(`${baseUrl}/decision-room/get/${id}`);
  return room.data.data;
});
