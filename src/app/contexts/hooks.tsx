'use client';

import { useContext } from "react";
import { PostsContext } from "./posts-context";

export function usePostsContext() {
	const { state, updaterFunction } = useContext(PostsContext);

	function setPosts(posts: any[]) {
		updaterFunction({ posts })
	}

	function setPostToEdit(post: any) {
		updaterFunction({ postToEdit: post })
	}

	return { posts: state?.posts, postToEdit: state?.postToEdit, setPosts, setPostToEdit }
}
