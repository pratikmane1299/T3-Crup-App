"use client";

import React, { useEffect, useState } from "react";

import { api } from "~/trpc/react";
import { usePostsContext } from "../contexts/hooks";

export function CreatePost() {
  const [name, setName] = useState("");

  const { posts, postToEdit, setPostToEdit, setPosts } = usePostsContext();

  useEffect(() => {
    if (postToEdit) {
      setName(postToEdit.name);
    }
  }, [postToEdit]);

  const createPost = api.post.create.useMutation({
    onSuccess: (data) => {
      setName("");
      if (Array.isArray(data) && data.length > 0) {
        const [post] = data;

        const newPosts = [post,...posts];
        setPosts(newPosts);
      }
    },
  });

  const updatePost = api.post.updatePost.useMutation({
    onSuccess: (data, variables) => {
      setName("");
      setPostToEdit(null);
      if (Array.isArray(data) && data.length > 0) {
        const [post] = data;

        if (post) {
          const newPosts = posts.map((p: any) => {
            if (p.id === variables.id) {
              return { ...p, name: post.name }
            }
            return p;
          });

          setPosts(newPosts);
        }
      }
    }
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (postToEdit) {
      updatePost.mutate({ name, id: postToEdit.id });
    } else {
      createPost.mutate({ name });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createPost.isLoading || updatePost.isLoading}
      >
        {(createPost.isLoading || updatePost.isLoading) ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
