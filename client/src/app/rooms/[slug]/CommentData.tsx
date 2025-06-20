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

export default async function CommentData({ roomId }: { roomId: string }) {
  const comments = await getComments(roomId);

  return (
    <div>
      {comments.map((c: comment) => (
        <div key={c.id} className="mb-6">
          <div className="bg-gray-50 p-3 rounded shadow-sm border">
            <p className="font-medium">{c.user}</p>
            <p className="text-gray-700">{c.comment}</p>
          </div>

          {/* Replies */}
          <div className="ml-6 mt-2 space-y-2">
            {c.replies.map((r) => (
              <div
                key={r.id}
                className="bg-gray-100 p-2 rounded border border-gray-200"
              >
                <p className="text-sm font-medium">{r.user}</p>
                <p className="text-sm text-gray-700">{r.reply}</p>
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
