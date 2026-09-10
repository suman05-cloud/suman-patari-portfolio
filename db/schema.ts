import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const galleryPosts = sqliteTable("gallery_posts", {
  id: text("id").primaryKey(),
  caption: text("caption").notNull(),
  mediaType: text("media_type").notNull(),
  mediaKey: text("media_key").notNull().unique(),
  createdAt: text("created_at").notNull(),
  ownerId: text("owner_id").notNull(),
}, (table) => [index("idx_gallery_posts_created_at").on(table.createdAt)]);
