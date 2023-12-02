'use client';

import { usePostsContext } from "../contexts/hooks";
import PostsGrid from "./posts-grid";

export default function PostsList() {
	const { posts } = usePostsContext();

	return <>{posts.length > 0 ?
		<PostsGrid posts={posts} /> : <p>You have no post(s) yet.</p>}</>
}