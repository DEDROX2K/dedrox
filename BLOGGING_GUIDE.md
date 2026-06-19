# Dedrox Blog Management Guide

This guide explains how to add, manage, and sync blog posts on the Dedrox portfolio site using Markdown files (e.g., dropped directly from Obsidian).

---

## 🛠️ The Architecture

The blog system relies on three parts:
1. **[`posts/`](./posts)**: A folder containing raw Markdown (`.md`) files.
2. **[`posts.json`](./posts.json)**: The metadata index file which lists the blog titles, dates, tags, and corresponding markdown filenames. The portfolio website reads this index to display the feed.
3. **[`sync-posts.js`](./sync-posts.js)**: A lightweight Node.js helper script that scans the `posts/` folder, parses metadata, and rebuilds `posts.json` automatically.

---

## 📋 Step-by-Step Workflow

Follow these steps to publish a new blog post:

### Step 1: Write/Drop your Markdown file
Create your article in Markdown. If you use **Obsidian**, you can write it there and copy/paste or drag-and-drop the file directly into the **[`posts/`](./posts)** folder.

> [!IMPORTANT]
> - Ensure your file starts with a single top-level heading (`# Title Here`). The sync script uses this line as the blog title.
> - Keep the filename simple (e.g. `my-new-post.md`), using only lowercase letters, numbers, and hyphens.

**Example File (`posts/my-new-post.md`):**
```markdown
# Designing Calm Interfaces

This is the opening paragraph of my blog post.

## A Sub-heading
Here is some more content...
```

### Step 2: Run the Sync Script
Open a terminal in the root directory of the project and run the following command to update the blog index:

```bash
node sync-posts.js
```

This script will:
* Scan the `posts/` directory for any new or modified `.md` files.
* Extract the title from the first `#` heading.
* Assign the current date (for new posts) or preserve the existing date (for older posts).
* Update **[`posts.json`](./posts.json)**, sorting all posts with the newest on top.

### Step 3: (Optional) Customize Tags & Dates
If you want to add specific tags or change the publication date:
1. Open **[`posts.json`](./posts.json)**.
2. Find your post entry.
3. Edit the `date` or add tag strings to the `tags` array:
   ```json
   {
     "title": "Designing Calm Interfaces",
     "date": "2026-06-19",
     "file": "my-new-post.md",
     "tags": ["ux", "minimalism", "design"]
   }
   ```
4. *Note: Running `node sync-posts.js` again will preserve the tags and custom dates you defined here!*

### Step 4: Verify on the Site
Open **[`prototype.html`](./prototype.html)** in your browser and toggle the **Blogs** icon from the top bar pill menu to verify your new post is visible and renders correctly.

---

## 💡 Troubleshooting & Tips

* **Missing Titles:** Make sure the first line of your markdown file begins with `# ` followed by a space.
* **Special Characters in Filenames:** Avoid slashes (`/`, `\`) or parent directories (`..`) in your filenames as the site security settings will reject rendering them.
* **Tags Design:** Tags are automatically rendered as styled pills in the article viewer.
