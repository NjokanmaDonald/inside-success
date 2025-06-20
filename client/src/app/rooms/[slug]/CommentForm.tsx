import { getComments } from "@/app/lib/apiCalls/comment";
import ReplyForm from "./ReplyForm";

type comment = {
  id: string;
  user: string;
  comment: string;
  decisionRoomId: string;
  createdAt: Date;
  replies: {
    id: string;
    user: string;
    reply: string;
    commentId: string;
    createdAt: Date;
  }[];
};

function formatDate(date: Date | string) {
  return new Date(date).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function CommentData({ roomId }: { roomId: string }) {
  const comments = await getComments(roomId);

  return (
    <div className="space-y-6 mt-4">
      {comments.map((c: comment) => (
        <div
          key={c.id}
          className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
        >
          <div className="mb-2">
            <p className="text-gray-800 font-semibold">{c.user}</p>
            <p className="text-gray-700">{c.comment}</p>
            <p className="text-xs text-gray-500 mt-1">
              Posted on: {formatDate(c.createdAt)}
            </p>
          </div>

          {/* Replies */}
          <div className="ml-4 border-l-2 border-gray-100 pl-4 space-y-3 mt-3">
            {c.replies.map((r) => (
              <div key={r.id} className="bg-gray-50 p-2 rounded border">
                <p className="text-sm font-medium text-gray-800">{r.user}</p>
                <p className="text-sm text-gray-700">{r.reply}</p>
                <p className="text-xs text-gray-500">
                  Replied on: {formatDate(r.createdAt)}
                </p>
              </div>
            ))}

            {/* Reply Input */}
            <ReplyForm commentId={c.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
