CREATE TABLE `gallery_posts` (
	`id` text PRIMARY KEY NOT NULL,
	`caption` text NOT NULL,
	`media_type` text NOT NULL,
	`media_key` text NOT NULL,
	`created_at` text NOT NULL,
	`owner_id` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `gallery_posts_media_key_unique` ON `gallery_posts` (`media_key`);--> statement-breakpoint
CREATE INDEX `idx_gallery_posts_created_at` ON `gallery_posts` (`created_at`);--> statement-breakpoint
PRAGMA optimize;
