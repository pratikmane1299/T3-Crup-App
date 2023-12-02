'use client';

import { useEffect, useRef } from "react";
import { usePostsContext } from "../contexts/hooks";
import PostsList from "./posts-list";
import PostsGrid from "./posts-grid";

export default function ServerRenderedPostsList({ posts }: { posts: any[] }) {
	const onClient = useRef(false);

	const { setPosts } = usePostsContext();

	useEffect(() => {
		onClient.current = true;

		setPosts(posts);
	}, []);

	if (onClient.current) return <PostsList />

	return <>
		{posts.length > 0 ?
			<PostsGrid posts={posts} />
			: <p>You have no post(s) yet.</p>}
	</>
}