---
title: 'Building a Multilingual Astro Blog'
slug: 'astro-multi-lang'
published: 2025-02-10
draft: false
description: 'Concrete example showing how to publish translated posts that share the same slug.'
tags: ['astro', 'i18n']
lang: en
---

Keeping a single slug for every translation keeps the browsing experience predictable. This post walks through the workflow used in this starter.

## 1. Create Content Files

Place each translation next to the others inside `src/content/posts`. Because every entry tracks its `lang`, you only need frontmatter like the following:

```markdown
---
title: 'Building a Multilingual Astro Blog'
slug: 'astro-multi-lang'
lang: en
---
```

```markdown
---
title: 'Xây dựng blog đa ngôn ngữ với Astro'
slug: 'astro-multi-lang'
lang: vi
---
```

The shared `slug` keeps the URL consistent across languages.

## 2. Update Links

Wherever a post URL is needed, use the helper from `~/utils`:

```ts
import { getPostSlug } from '~/utils'

const href = localizePath(`/posts/${getPostSlug(post)}`, lang)
```

The `LanguageSwitcher` now links readers between `/posts/astro-multi-lang` and `/vi/posts/astro-multi-lang` automatically.

## 3. Publish

Run `yarn build` and both language versions of this page will be generated with matching permalinks, metadata, and social cards.
