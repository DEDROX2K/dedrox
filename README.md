# dedrox

## Blog content

Blog posts for the reader/blog mode live in two places:

- Markdown files: [posts](/C:/Users/ragha/Documents/GitHub/dedrox/posts)
- Blog index data: [posts.json](/C:/Users/ragha/Documents/GitHub/dedrox/posts.json)

### Where the current posts are

- [posts/post-1.md](/C:/Users/ragha/Documents/GitHub/dedrox/posts/post-1.md)
- [posts/post-2.md](/C:/Users/ragha/Documents/GitHub/dedrox/posts/post-2.md)
- [posts/template-post.md](/C:/Users/ragha/Documents/GitHub/dedrox/posts/template-post.md)

`template-post.md` is just a starter template. The site currently filters that placeholder entry out so it does not show in the blog list.

### How to add a new blog post

1. Create a new markdown file in [posts](/C:/Users/ragha/Documents/GitHub/dedrox/posts), for example `post-3.md`.
2. Write the article in markdown. Start with a top-level heading, for example:

```md
# My New Post Title

Opening paragraph goes here.

## Section heading

More content here.
```

3. Add a matching entry to [posts.json](/C:/Users/ragha/Documents/GitHub/dedrox/posts.json) with:
   - `title`: the title shown in the blog list
   - `date`: use `YYYY-MM-DD`
   - `file`: the markdown filename inside `posts/`
   - `tags`: an array of short tag strings

Example:

```json
{
  "title": "My New Post Title",
  "date": "2026-05-29",
  "file": "post-3.md",
  "tags": ["ux", "writing", "prototype"]
}
```

4. Reload [prototype.html](/C:/Users/ragha/Documents/GitHub/dedrox/prototype.html). The new post will appear in blog mode automatically.

### How it works

- The blog list in the mini site is loaded from [posts.json](/C:/Users/ragha/Documents/GitHub/dedrox/posts.json).
- Clicking a post opens [blog.html](/C:/Users/ragha/Documents/GitHub/dedrox/blog.html) with the selected markdown file.
- The article page reads the markdown from `posts/<filename>` and uses the metadata from `posts.json` for the date and tags.

### Notes

- Keep filenames simple: letters, numbers, dashes, underscores, and a `.md` extension.
- Avoid slashes or `..` in the `file` value. The page intentionally rejects those.
- Tags are shown as colored pills in the article view.
