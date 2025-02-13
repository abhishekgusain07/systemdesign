import PageWrapper from "@/components/wrapper/page-wrapper";
import Image from "next/image";
import CreatePost from "./_components/creatPost";
import PostList from "./_components/postList";

export default function Home() {
  return (
      <PageWrapper>
        <div className="mt-3 p-4">
          Home
        </div>
        <CreatePost />
        <PostList />
      </PageWrapper>
  );
}
