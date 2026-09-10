const links = {
  linkedin: import.meta.env.VITE_LINKEDIN_URL || "",
  instagram: import.meta.env.VITE_INSTAGRAM_URL || "",
};

document.querySelectorAll("[data-gallery-social]").forEach((link) => {
  const value = links[link.dataset.gallerySocial];
  if (value) link.href = value;
  else {
    link.removeAttribute("href");
    link.classList.add("pending-link");
    link.title = "Add this URL in the portfolio environment file";
    link.textContent = `${link.dataset.gallerySocial === "instagram" ? "Instagram" : "LinkedIn"} · link soon`;
  }
});

const uploadToggle = document.querySelector("#uploadToggle");
const uploadPanel = document.querySelector("#uploadPanel");
const closeUpload = document.querySelector("#closeUpload");
const uploadForm = document.querySelector("#uploadForm");
const mediaInput = document.querySelector("#mediaInput");
const fileLabel = document.querySelector("#fileLabel");
const captionInput = document.querySelector("#captionInput");
const captionCount = document.querySelector("#captionCount");
const uploadStatus = document.querySelector("#uploadStatus");
const publishButton = document.querySelector("#publishButton");
const galleryFeed = document.querySelector("#galleryFeed");
const postCount = document.querySelector("#postCount");

function setUploadOpen(open) {
  uploadPanel.hidden = !open;
  uploadToggle.setAttribute("aria-expanded", String(open));
  if (open) {
    uploadPanel.scrollIntoView({ behavior: "smooth", block: "center" });
    mediaInput.focus();
  }
}

uploadToggle.addEventListener("click", () => setUploadOpen(uploadPanel.hidden));
closeUpload.addEventListener("click", () => setUploadOpen(false));
mediaInput.addEventListener("change", () => {
  const file = mediaInput.files?.[0];
  fileLabel.textContent = file ? file.name : "Choose a photo or video";
});
captionInput.addEventListener("input", () => { captionCount.textContent = String(captionInput.value.length); });

function formatDate(value) {
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value));
}

function createPost(post, index) {
  const article = document.createElement("article");
  article.className = "feed-post";
  const top = document.createElement("div");
  top.className = "post-top";
  const identity = document.createElement("div");
  identity.className = "post-identity";
  identity.innerHTML = `<span>SP</span><div><strong>Suman Patari</strong><small>${index === 0 ? "Latest post" : formatDate(post.createdAt)}</small></div>`;
  const number = document.createElement("span");
  number.className = "post-number";
  number.textContent = String(index + 1).padStart(2, "0");
  top.append(identity, number);

  const mediaWrap = document.createElement("div");
  mediaWrap.className = "post-media";
  let media;
  if (post.mediaType.startsWith("video/")) {
    media = document.createElement("video");
    media.controls = true;
    media.preload = "metadata";
    media.playsInline = true;
  } else {
    media = document.createElement("img");
    media.loading = index > 1 ? "lazy" : "eager";
    media.alt = post.caption;
  }
  media.src = post.mediaUrl;
  mediaWrap.append(media);

  const bottom = document.createElement("div");
  bottom.className = "post-bottom";
  const caption = document.createElement("p");
  caption.textContent = post.caption;
  const date = document.createElement("time");
  date.dateTime = post.createdAt;
  date.textContent = formatDate(post.createdAt);
  bottom.append(caption, date);
  article.append(top, mediaWrap, bottom);
  return article;
}

async function loadPosts() {
  try {
    const response = await fetch("/api/gallery/posts");
    if (!response.ok) throw new Error("Unable to load posts");
    const { posts } = await response.json();
    galleryFeed.replaceChildren();
    postCount.textContent = `${posts.length} ${posts.length === 1 ? "post" : "posts"}`;
    if (!posts.length) {
      const empty = document.createElement("div");
      empty.className = "empty-feed";
      empty.innerHTML = "<span>SP</span><h3>Your gallery starts here.</h3><p>Upload the first photo or video and it will appear at the top of this feed.</p>";
      galleryFeed.append(empty);
      return;
    }
    posts.forEach((post, index) => galleryFeed.append(createPost(post, index)));
  } catch {
    galleryFeed.innerHTML = '<div class="empty-feed error"><h3>The gallery could not load.</h3><p>Please refresh the page in a moment.</p></div>';
    postCount.textContent = "Unavailable";
  }
}

uploadForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const file = mediaInput.files?.[0];
  const caption = captionInput.value.trim();
  if (!file || !caption) return;
  if (file.size > 50 * 1024 * 1024) {
    uploadStatus.textContent = "Please choose a file under 50 MB.";
    return;
  }
  publishButton.disabled = true;
  publishButton.textContent = "Publishing…";
  uploadStatus.textContent = "Uploading your post.";
  try {
    const data = new FormData();
    data.append("media", file);
    data.append("caption", caption);
    const response = await fetch("/api/gallery/posts", { method: "POST", body: data });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "Upload failed");
    uploadForm.reset();
    fileLabel.textContent = "Choose a photo or video";
    captionCount.textContent = "0";
    uploadStatus.textContent = "Published. Your new post is now first.";
    await loadPosts();
    document.querySelector("#feed").scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    uploadStatus.textContent = error.message || "The upload failed. Please try again.";
  } finally {
    publishButton.disabled = false;
    publishButton.innerHTML = 'Publish post <span aria-hidden="true">↑</span>';
  }
});

loadPosts();
