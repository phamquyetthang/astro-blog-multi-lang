import type { AstroGlobal } from 'astro'

type TranslationTree = Record<string, string | TranslationTree>

type TranslationReplacements = Record<string, string | number>

export const languages = {
  en: {
    label: 'English',
    locale: 'en',
    dir: 'ltr',
    translations: {
      nav: {
        home: 'Home',
        about: 'About',
        posts: 'Archive',
        tags: 'Tags',
        series: 'Series',
        github: 'GitHub',
      },
      sections: {
        latestPosts: 'Latest Posts',
        tags: 'Tags',
        series: 'Series',
      },
      pagination: {
        previous: 'Previous',
        next: 'Next',
        newer: 'Newer Posts',
        older: 'Older Posts',
        page: 'Page {{page}}',
      },
      paginationAria: {
        previous: 'Previous Page',
        next: 'Next Page',
      },
      post: {
        continue: 'Continue',
        read: 'Read',
        nextLabel: 'Next: {{title}}',
        morePosts: 'More Posts',
        comments: 'Comments',
        seriesSuffix: 'Series',
        minutesRead: '{{minutes}} min read',
      },
      toc: {
        title: 'Table of Contents',
      },
      search: {
        open: 'Open Search',
        dialogLabel: 'search',
        devInfo:
          'Search is only available in production builds.<br />Try building and previewing the site to test it out locally.',
      },
      footer: {
        poweredBy: 'Powered by',
        rights: '{{author}} © {{year}}',
        and: '&',
      },
      breadcrumbs: {
        home: 'Home',
        posts: 'Posts',
        tags: 'Tags',
        series: 'Series',
        about: 'About',
        archive: 'Archive',
      },
      archive: {
        title: 'Archive',
        description: 'All posts in the archive',
      },
      tagsPage: {
        description: 'All posts tagged with {{tag}}',
      },
      seriesPage: {
        description: 'All posts in the {{series}} series',
      },
      addendum: {
        thanks:
          'Thanks for reading my blog post! Feel free to check out my other posts or contact me via the social links in the footer.',
      },
      language: {
        switcherLabel: 'Change language',
      },
      notFound: {
        title: '404',
        message: 'Page not found',
      },
    },
  },
  vi: {
    label: 'Tiếng Việt',
    locale: 'vi',
    dir: 'ltr',
    translations: {
      nav: {
        home: 'Trang chủ',
        about: 'Giới thiệu',
        posts: 'Lưu trữ',
        tags: 'Thẻ',
        series: 'Chuỗi bài',
        github: 'GitHub',
      },
      sections: {
        latestPosts: 'Bài viết mới nhất',
        tags: 'Thẻ',
        series: 'Chuỗi bài',
      },
      pagination: {
        previous: 'Trước',
        next: 'Sau',
        newer: 'Bài mới hơn',
        older: 'Bài cũ hơn',
        page: 'Trang {{page}}',
      },
      paginationAria: {
        previous: 'Trang trước',
        next: 'Trang sau',
      },
      post: {
        continue: 'Tiếp tục',
        read: 'Đọc',
        nextLabel: 'Tiếp theo: {{title}}',
        morePosts: 'Bài viết khác',
        comments: 'Bình luận',
        seriesSuffix: 'Chuỗi bài',
        minutesRead: '{{minutes}} phút đọc',
      },
      toc: {
        title: 'Mục lục',
      },
      search: {
        open: 'Mở tìm kiếm',
        dialogLabel: 'tìm kiếm',
        devInfo:
          'Chức năng tìm kiếm chỉ hoạt động trên bản dựng production.<br />Hãy build và preview trang để thử nghiệm.',
      },
      footer: {
        poweredBy: 'Xây dựng bởi',
        rights: '{{author}} © {{year}}',
        and: 'và',
      },
      breadcrumbs: {
        home: 'Trang chủ',
        posts: 'Bài viết',
        tags: 'Thẻ',
        series: 'Chuỗi bài',
        about: 'Giới thiệu',
        archive: 'Lưu trữ',
      },
      archive: {
        title: 'Lưu trữ',
        description: 'Tất cả bài viết trong lưu trữ',
      },
      tagsPage: {
        description: 'Tất cả bài viết với thẻ {{tag}}',
      },
      seriesPage: {
        description: 'Tất cả bài trong chuỗi {{series}}',
      },
      addendum: {
        thanks:
          'Cảm ơn bạn đã đọc bài viết! Hãy xem thêm các bài viết khác hoặc liên hệ qua những mạng xã hội ở chân trang.',
      },
      language: {
        switcherLabel: 'Thay đổi ngôn ngữ',
      },
      notFound: {
        title: '404',
        message: 'Không tìm thấy trang',
      },
    },
  },
} as const

export type Lang = keyof typeof languages
export const defaultLang: Lang = 'en'
export const supportedLangs = Object.keys(languages) as Lang[]

function getFromTree(tree: TranslationTree, segments: string[]): string | undefined {
  let current: TranslationTree | string | undefined = tree
  for (const segment of segments) {
    if (typeof current === 'string') {
      return current
    }
    const next = current[segment]
    if (next === undefined) {
      return undefined
    }
    current = next
  }
  return typeof current === 'string' ? current : undefined
}

function formatTemplate(template: string, replacements: TranslationReplacements): string {
  return template.replace(/\{\{(.*?)\}\}/g, (_match, key) => {
    const replacement = replacements[key.trim()]
    return replacement !== undefined ? String(replacement) : ''
  })
}

export function translate(
  lang: Lang,
  key: string,
  replacements: TranslationReplacements = {},
): string {
  const segments = key.split('.')
  const translation =
    getFromTree(languages[lang].translations as TranslationTree, segments) ??
    getFromTree(languages[defaultLang].translations as TranslationTree, segments) ??
    segments[segments.length - 1]
  return formatTemplate(translation, replacements)
}

export function getLangFromUrl(url: URL): Lang {
  const [, potentialLang] = url.pathname.split('/')
  if (potentialLang && supportedLangs.includes(potentialLang as Lang)) {
    return potentialLang as Lang
  }
  return defaultLang
}

export function stripLangFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) return '/'
  if (supportedLangs.includes(segments[0] as Lang)) {
    const rest = segments.slice(1)
    return `/${rest.join('/')}` || '/'
  }
  return pathname
}

export function getLocalizedPath(path: string, lang: Lang): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (normalized === '/') {
    return `/${lang}`
  }
  return `/${lang}${normalized}`.replace(/\/$/, '')
}

export function getLangFromAstro(Astro: AstroGlobal): Lang {
  return Astro.params.lang && supportedLangs.includes(Astro.params.lang as Lang)
    ? (Astro.params.lang as Lang)
    : defaultLang
}

export function localizedCanonical(Astro: AstroGlobal, path: string, lang: Lang): string {
  const url = new URL(getLocalizedPath(path, lang), Astro.site)
  return url.href
}
