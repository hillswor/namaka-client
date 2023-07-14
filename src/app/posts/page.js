"use client";

import { useContext, useState } from "react";

import { PostsContext, PostContext } from "../AppContext";
import CommentForm from "./CommentForm";

export default function Posts() {
  const [commentForm, setCommentForm] = useState(false);
  const { posts } = useContext(PostsContext);
  const { setPost } = useContext(PostContext);

  //   functions

  const toggleCommentForm = () => {
    setCommentForm(!commentForm);
  };

  const handleReplyClick = (post) => {
    setPost(post);
    toggleCommentForm();
  };

  return (
    <main className="p-24">
      {commentForm && (
        <CommentForm toggleCommentForm={toggleCommentForm} setPost={setPost} />
      )}
      <section className="flex flex-col text-white">
        {posts &&
          posts.map((post) => (
            <article
              key={post.id}
              className="bg-slate-500 rounded-md shadow-2xl p-8 mb-16"
            >
              <header className="mb-4">
                <h2 className="text-xl font-bold">{post.title}</h2>
              </header>
              <p className="text-m">{post.content}</p>
              <footer className="mt-4 text-xs">
                <p className="text-gray-400">
                  Posted by {post.user.email} on{" "}
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </footer>
              <button
                onClick={() => handleReplyClick(post)}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-400 mt-4 transition-all duration-200"
              >
                Reply
              </button>
              <header className="mb-2 mt-8">
                <h2 className="text-l font-bold">Comments</h2>
              </header>
              {post.comments && post.comments.length > 0 && (
                <div className="mt-4 bg-gray-200 px-2 py-4 rounded-md">
                  <ul>
                    {post.comments.map((comment) => (
                      <li key={comment.id} className="text-sm">
                        <p className="text-md text-blue-500">
                          - {comment.content}
                        </p>
                        <p className="text-blue-400 text-xs mt-4 mb-8">
                          Posted by {comment.user.email} on{" "}
                          {new Date(comment.created_at).toLocaleDateString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
      </section>
    </main>
  );
}
