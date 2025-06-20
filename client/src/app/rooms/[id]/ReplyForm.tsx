"use client";
import { useAuth } from "@/app/context/authContext";
import { createComment } from "@/app/lib/apiCalls/comment";
import { createReply } from "@/app/lib/apiCalls/reply";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ReplyForm({ commentId }: { commentId: string }) {
  const { user, unregisteredUserId } = useAuth();
  let userName;
  if (user) {
    userName = `${user.firstName} ${user.lastName}`;
  } else {
    userName = `annonymous_${unregisteredUserId}`;
  }
  const [reply, setReply] = useState("");

  const handleSubmitReply = async () => {
    try {
      const res = await createReply({
        commentId: commentId,
        user: userName,
        reply,
      });
      toast.success("Reply created successfully");
      if (!res.success) {
        throw new Error(res.error || "Vote failed");
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || err.message || "Failed to cast vote."
      );
    }
  };

  return (
    <form className="my-4" onSubmit={handleSubmitReply}>
      <input
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Write a reply..."
        className="w-full border border-gray-300 rounded px-4 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </form>
  );
}
