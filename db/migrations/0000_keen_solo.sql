CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now(),
	"email" text,
	"first_name" text,
	"last_name" text,
	"gender" text,
	"profile_image_url" text,
	"user_id" text,
	"subscription" text,
	"credits" text,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_user_id_unique" UNIQUE("user_id")
);
