"use client";

import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { UserContext, PostContext, PostsContext } from "../AppContext";

export default function CommentForm({ toggleCommentForm }) {
  const { post } = useContext(PostContext);
  const { posts, setPosts } = useContext(PostsContext);
  const { user } = useContext(UserContext);

  const commentSchema = Yup.object().shape({
    content: Yup.string()
      .required("Required")
      .min(1, "Must Be At Least 1 Character")
      .max(1000, "Must Be No More Than 1000 Characters"),
  });

  const {
    values,
    handleBlur,
    handleChange,
    touched,
    resetForm,
    errors,
    handleSubmit,
  } = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: commentSchema,
    onSubmit: (values) => {
      values.user_id = user.id;
      values.post_id = post.id;
      fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          // Update the posts data with the new comment
          const updatedPosts = posts.map((p) => {
            if (p.id === post.id) {
              return {
                ...p,
                comments: [...p.comments, data],
              };
            }
            return p;
          });
          setPosts(updatedPosts);

          // Reset form and toggle the comment form
          resetForm();
          toggleCommentForm();
        });
    },
  });

  return (
    <main className="fixed inset-0 flex items-center justify-center border-4 border-green-500">
      <div className="bg-gray-800 w-96 p-8 rounded-md border-4 border-blue-500">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              id="content"
              name="content"
              rows={6}
              className="w-full px-3 py-2 mt-1 text-gray-800 bg-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={values.content}
            />
            {errors.content && touched.content && (
              <p className="text-red-500">{errors.content}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-400 transition-all duration-200"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={toggleCommentForm}
              className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
