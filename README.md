# Portfolio

Personal portfolio scaffold (Next.js + Tailwind). Features:

- Homepage with LinkedIn link
- Blog section loading markdown files from `data/posts`
- Each post has frontmatter `public: true|false` to control visibility

Setup

1. Install dependencies:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

Add a new blog post

Create a markdown file inside `data/posts/` with frontmatter, for example:

```
---
title: "My Post"
date: "2026-01-31"
public: true
---

Post content here.
```

Private posts (with `public: false`) will not appear on the public blog listing.
