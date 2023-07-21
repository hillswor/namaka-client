import { useContext, useState } from "react";
import { PostContext, PostsContext } from "../AppContext";
import CommentForm from "./CommentForm";

export default function Post({ post }) {
  const [commentForm, setCommentForm] = useState(false);
  const { setPost } = useContext(PostContext);

  const handleReplyClick = (post) => {
    setPost(post);
    setCommentForm(true);
  };

  const toggleCommentForm = () => {
    setCommentForm(!commentForm);
  };

  const buttonStyles =
    "bg-red-500 px-4 py-2 rounded-lg hover:bg-red-400 mt-4 transition-all duration-200";

  return (
    <section className="flex flex-col text-white">
      <article
        key={post.id}
        className="bg-slate-600 rounded-md shadow-2xl p-8 mb-2 border-2"
      >
        <header className="mb-4">
          <h2 className="text-xl font-bold">{post.title}</h2>
        </header>
        <p className="text-m">{post.content}</p>
        <footer className="mt-4 text-xs">
          <p className="text-red-400">
            Posted by {post.user.email} on{" "}
            {new Date(post.created_at).toLocaleDateString()}
          </p>
        </footer>
        <button onClick={() => handleReplyClick(post)} className={buttonStyles}>
          Reply
        </button>
      </article>
      {commentForm && (
        <CommentForm
          toggleCommentForm={toggleCommentForm}
          position={{ x: 0, y: 0 }} // Set initial position for CommentForm
        />
      )}
      {post.comments && post.comments.length > 0 && (
        <section className="mb-16">
          <header className="mb-2">
            <h2 className="text-l font-bold text-slate-600">Comments</h2>
          </header>
          {post.comments.map((comment) => (
            <article
              key={comment.id}
              className="bg-gray-300 px-4 py-2 rounded-md mb-4 shadow-md"
            >
              <p className="text-md text-slate-600">- {comment.content}</p>
              <footer className="text-red-400 text-xs mt-2">
                Posted by {comment.user.email} on{" "}
                {new Date(comment.created_at).toLocaleDateString()}
              </footer>
            </article>
          ))}
        </section>
      )}
    </section>
  );
}
