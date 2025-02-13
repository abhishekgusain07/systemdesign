import { pgEnum, pgTable, serial, text, timestamp, uniqueIndex, boolean, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  createdTime: timestamp("created_time").defaultNow(),
  email: text("email").unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  gender: text("gender"),
  profileImageUrl: text("profile_image_url"),
  userId: text("user_id").unique(),
  subscription: text("subscription"),
  credits: text("credits"), 
});


export const posts = pgTable("posts", {
  id: text("id").primaryKey(),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),
  content: text("content").notNull(), // Store MDX content as text
  createdTime: timestamp("created_time").defaultNow(),
});

export const comment: any = pgTable("comments", {
  id: text("id").primaryKey(),
  postId: text("post_id") // Changed to serial to match posts.id type
    .notNull()
    .references(() => posts.id),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id),
  parentId: text("parent_id").references(() => comment.id), 
  content: text("content").notNull(),
  createdTime: timestamp("created_time").defaultNow(),
});

export const entityTypeEnum = pgEnum("entity_type", ["post", "comment"]);

export const votes = pgTable("votes", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  entityType: entityTypeEnum("entity_type").notNull(),
  entityId: integer("entity_id").notNull(), // References either post.id or comment.id
  isUpvote: boolean("is_upvote").notNull(),
  createdTime: timestamp("created_time").defaultNow(),
});