import Image from 'next/image'
import PostsPage from "@/pages/main/posts";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <PostsPage/>
    </main>
  )
}
