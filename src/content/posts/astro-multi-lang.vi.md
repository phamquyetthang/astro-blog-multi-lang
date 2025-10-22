---
title: 'Xây dựng blog đa ngôn ngữ với Astro'
slug: 'astro-multi-lang'
published: 2025-02-10
draft: false
description: 'Ví dụ cụ thể giúp bạn triển khai bài viết song ngữ với cùng một slug.'
tags: ['astro', 'i18n']
lang: vi
---

Giữ nguyên một `slug` cho mọi bản dịch giúp người đọc dễ dàng chuyển đổi ngôn ngữ. Bài viết này minh hoạ quy trình áp dụng cho dự án mẫu.

## 1. Tạo file nội dung

Đặt các bản dịch cạnh nhau trong `src/content/posts`. Vì mỗi entry đã có trường `lang`, bạn chỉ cần phần frontmatter như sau:

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

Chung một `slug` đồng nghĩa với việc mọi ngôn ngữ đều chia sẻ cùng một đường dẫn.

## 2. Cập nhật link

Ở bất cứ đâu cần tạo URL bài viết, hãy dùng helper trong `~/utils`:

```ts
import { getPostSlug } from '~/utils'

const href = localizePath(`/posts/${getPostSlug(post)}`, lang)
```

`LanguageSwitcher` sẽ tự động dẫn người đọc giữa `/posts/astro-multi-lang` và `/vi/posts/astro-multi-lang`.

## 3. Xuất bản

Chạy `yarn build` và cả hai phiên bản ngôn ngữ của trang ví dụ này sẽ được sinh ra với permalink, metadata và social card trùng khớp.
