"use server";
import { uid } from "uid";
import { db } from "@/db/drizzle";
import { posts, users } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { User } from "@/utils/types";
import { eq } from "drizzle-orm";

const newPost = {
    authorId: "sd", // Replace with the actual author's ID
    title: "My name",
    content: `
      # Hello World
      Abhishek gusain
    `,
  };
export const createPost = async() => {
   try{
    const {userId} = await auth();
    if(!userId) {
        throw new Error("User not found")
    }
    const userData: User[] | null =  await db.select().from(users)
    .where(eq(users.userId, userId)).execute();
    if(!userData || userData.length == 0) throw new Error("User not found")
    const mainUserId = userData?.[0].id;
    const post = await db.insert(posts).values({
        id: uid(),
        authorId: mainUserId,
        title: newPost.title,
        content: newPost.content,
    }).returning();
    return post[0];
   }catch(e){
    console.log(e)
    throw new Error("Error while inserting post")
   }
}