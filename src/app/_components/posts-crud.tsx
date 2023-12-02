'use client';
import { CreatePost } from "./create-post";
import PostsContextProvider from "../contexts/posts-context";
import ServerRenderedPostsList from "./server-rendered-postslist";

export default function PostsCrud({ posts }: { posts: any[] }) {

	return <PostsContextProvider>
		<CreatePost />

		<div className="flex flex-col items-center gap-2">
			<h3>Your Posts:</h3>
			<ServerRenderedPostsList posts={posts} />
		</div>
	</PostsContextProvider>
}
