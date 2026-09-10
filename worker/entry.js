const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;
const ALLOWED_MEDIA = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4", "video/webm"]);

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
});

function extensionFor(type) {
  return ({ "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif", "video/mp4": "mp4", "video/webm": "webm" })[type];
}

async function listPosts(env, origin) {
  const result = await env.DB.prepare(`
    SELECT id, caption, media_type AS mediaType, media_key AS mediaKey, created_at AS createdAt
    FROM gallery_posts
    ORDER BY created_at DESC, id DESC
    LIMIT 100
  `).all();
  const posts = (result.results || []).map((post) => ({
    ...post,
    mediaUrl: `${origin}/gallery-media/${encodeURIComponent(post.mediaKey)}`,
  }));
  return json({ posts });
}

async function createPost(request, env) {
  const userId = request.headers.get("oai-authenticated-user-id");
  if (!userId) return json({ error: "Sign in to publish gallery posts." }, 401);

  const form = await request.formData();
  const media = form.get("media");
  const caption = String(form.get("caption") || "").trim();
  if (!(media instanceof File) || !media.size) return json({ error: "Choose a photo or video." }, 400);
  if (!caption || caption.length > 500) return json({ error: "Add a caption of up to 500 characters." }, 400);
  if (!ALLOWED_MEDIA.has(media.type)) return json({ error: "Use JPG, PNG, WebP, GIF, MP4, or WebM." }, 415);
  if (media.size > MAX_UPLOAD_BYTES) return json({ error: "Files must be 50 MB or smaller." }, 413);

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const mediaKey = `${createdAt.slice(0, 10)}/${id}.${extensionFor(media.type)}`;
  await env.FILES.put(mediaKey, media.stream(), {
    httpMetadata: { contentType: media.type },
    customMetadata: { ownerId: userId, originalName: media.name.slice(0, 180) },
  });
  try {
    await env.DB.prepare(`
      INSERT INTO gallery_posts (id, caption, media_type, media_key, created_at, owner_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(id, caption, media.type, mediaKey, createdAt, userId).run();
  } catch (error) {
    await env.FILES.delete(mediaKey);
    throw error;
  }
  return json({ post: { id, caption, mediaType: media.type, mediaKey, createdAt } }, 201);
}

async function serveMedia(pathname, env) {
  const key = decodeURIComponent(pathname.slice("/gallery-media/".length));
  if (!key || key.includes("..")) return new Response("Not found", { status: 404 });
  const object = await env.FILES.get(key);
  if (!object) return new Response("Not found", { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");
  headers.set("x-content-type-options", "nosniff");
  return new Response(object.body, { headers });
}

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      if (url.pathname === "/api/gallery/posts" && request.method === "GET") return listPosts(env, url.origin);
      if (url.pathname === "/api/gallery/posts" && request.method === "POST") return createPost(request, env);
      if (url.pathname.startsWith("/gallery-media/") && request.method === "GET") return serveMedia(url.pathname, env);
      if (env.ASSETS) return env.ASSETS.fetch(request);
      return new Response("Not found", { status: 404 });
    } catch (error) {
      console.error("Gallery request failed", error);
      return json({ error: "The gallery is temporarily unavailable." }, 500);
    }
  },
};
