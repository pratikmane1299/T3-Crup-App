import Link from "next/link";

import PostsCrud from './_components/posts-crud';
import { api } from "~/trpc/server";

export default async function Home() {
  const allPost = await api.post.getAllPost.query();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          T3 <span className="text-[hsl(280,100%,70%)]">Crud</span> App
        </h1>

        <PostsCrud posts={allPost} />
      </div>
    </main>
  );
}

