'use client';

import { api } from "~/trpc/react";
import { usePostsContext } from "../contexts/hooks";

export default function PostsGrid({ posts }: { posts: any[] }) {
	const { setPostToEdit, setPosts } = usePostsContext();

	const deletePost = api.post.delete.useMutation({
		onSuccess: (data) => {
			if (Array.isArray(data) && data.length > 0) {
				const [post] = data;

				if (post) {
					const newPosts = posts.filter((p) => p.id !== post.id);

					setPosts(newPosts);
				}
			}
		},
	});

	return <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
		{posts.map((post: any) => (
			<li key={post.id} className="p-6 rounded-3xl bg-transparent border border-pink-600" onClick={() => setPostToEdit(post)}>

				<div className="flex justify-between items-center">
					<h6>{post.name}</h6>

					<button type="button" disabled={deletePost.variables?.id === post.id ? deletePost.isLoading : false} className="bg-red-600 px-1.5 py-0.5 text-xs rounded-xl hover:opacity-90 focus:ring-1 focus:ring-offset-2 focus:ring-red-600" onClick={(e) => {
						e.stopPropagation();
						deletePost.mutate({ id: post.id })
					}}>
						{deletePost.variables?.id === post.id && deletePost.isLoading ? 'Deleting...' : 'Delete'}
					</button>
				</div>
			</li>
		))}
	</ul>
}