import { z } from "zod";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { posts, users } from "@/db/schema";
export type userCreateProps = z.infer<typeof userCreateSchema>;

const userCreateSchema = z.object({
  email: z.string().email({ message: "Invalid email" }).describe("user email"),
  first_name: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "First name must only contain letters" })
    .min(3, { message: "First name is required" })
    .describe("user first name"),
  last_name: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "Last name must only contain letters" })
    .min(3, { message: "Last name is required" })
    .describe("user last name"),
  profile_image_url: z
    .string()
    .url({ message: "Invalid URL" })
    .optional()
    .describe("user profile image URL"),
  user_id: z.string().describe("user ID"),
});

export type userUpdateProps = z.infer<typeof userUpdateSchema>;

const userUpdateSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .nonempty({ message: "Email is required" })
    .describe("user email"),
  first_name: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "First name must only contain letters" })
    .describe("user first name"),
  last_name: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "Last name must only contain letters" })
    .describe("user last name"),
  profile_image_url: z
    .string()
    .url({ message: "Invalid URL" })
    .optional()
    .describe("user profile image URL"),
  user_id: z.string().describe("user ID"),
});




// Infer the types directly from the schema
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type Post = InferSelectModel<typeof posts>;
export type newPost = InferInsertModel<typeof posts>;

