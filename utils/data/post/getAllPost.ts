"use server";
import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { Post } from "@/utils/types";

export const getAllPost = async () => {
  try {
    const allPost: Post[] = await db.select().from(posts).execute();
    if(!allPost){
        return []
    }
    return allPost;
  } catch (e) {
    console.log("error", e);
    throw new Error("Failed to fetch posts");
  }
};