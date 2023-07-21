"use client";

import { useContext, useState } from "react";

import { PostsContext, PostContext } from "../AppContext";
import CommentForm from "./CommentForm";
import Post from "./Post";

export default function Posts() {
  const [commentForm, setCommentForm] = useState(false);
  const { posts } = useContext(PostsContext);
  const { setPost } = useContext(PostContext);

  const toggleCommentForm = () => {
    setCommentForm(!commentForm);
  };

  const handleReplyClick = (post) => {
    setPost(post);
    toggleCommentForm();
  };

  return (
    <main className="p-24">
      {posts &&
        posts.map((post) => (
          <Post post={post} handleReplyClick={handleReplyClick} />
        ))}
    </main>
  );
}
