import siteConfig from '~/site.config'

export const languages = {
  en: {
    label: 'English',
    locale: 'en',
    dir: 'ltr',
  },
  vi: {
    label: 'Tiếng Việt',
    locale: 'vi',
    dir: 'ltr',
  },
} as const

export type Lang = keyof typeof languages

export const defaultLang: Lang = 'en'

type NestedRecord = { [key: string]: string | NestedRecord }

const ui: Record<Lang, NestedRecord> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      archive: 'Archive',
      github: 'GitHub',
    },
    home: {
      latestPosts: 'Latest Posts',
      tags: 'Tags',
      series: 'Series',
      archiveLink: 'Archive',
    },
    posts: {
      read: 'Read',
      continue: 'Continue',
      seriesSuffix: 'Series',
      nextInSeries: 'Next',
      morePosts: 'More Posts',
      comments: 'Comments',
    },
    pagination: {
      previous: 'Previous',
      next: 'Next',
      newerPosts: 'Newer Posts',
      olderPosts: 'Older Posts',
    },
    paginationAria: {
      previous: 'Previous Page',
      next: 'Next Page',
    },
    archive: {
      title: 'Archive',
      description: 'All posts in the archive',
      titleWithPage: 'Archive - Page {{page}}',
    },
    tags: {
      breadcrumb: 'tags',
      titlePrefix: 'Tag',
      description: 'All posts tagged with {{tag}}',
      titleWithPage: 'Tag: {{tag}} - Page {{page}}',
    },
    series: {
      breadcrumb: 'series',
      titlePrefix: 'Series',
      description: 'All posts in the {{series}} series',
      dividerLabel: '{{series}} Series',
    },
    breadcrumbs: {
      home: 'home',
      posts: 'posts',
      tags: 'tags',
      series: 'series',
      page: 'page',
    },
    footer: {
      poweredBy: 'Powered by',
      and: '&',
      copyright: '{{author}} © {{year}}',
    },
    language: {
      label: 'Language',
      switcherAria: 'Change language',
    },
    search: {
      open: 'Open Search',
      dialogLabel: 'Search',
    },
  },
  vi: {
    nav: {
      home: 'Trang chủ',
      about: 'Giới thiệu',
      archive: 'Lưu trữ',
      github: 'GitHub',
    },
    home: {
      latestPosts: 'Bài viết mới nhất',
      tags: 'Thẻ',
      series: 'Chuỗi bài viết',
      archiveLink: 'Lưu trữ',
    },
    posts: {
      read: 'Đọc',
      continue: 'Tiếp tục',
      seriesSuffix: 'Chuỗi',
      nextInSeries: 'Tiếp theo',
      morePosts: 'Bài viết khác',
      comments: 'Bình luận',
    },
    pagination: {
      previous: 'Trước',
      next: 'Sau',
      newerPosts: 'Bài mới hơn',
      olderPosts: 'Bài cũ hơn',
    },
    paginationAria: {
      previous: 'Trang trước',
      next: 'Trang sau',
    },
    archive: {
      title: 'Lưu trữ',
      description: 'Toàn bộ bài viết trong lưu trữ',
      titleWithPage: 'Lưu trữ - Trang {{page}}',
    },
    tags: {
      breadcrumb: 'thẻ',
      titlePrefix: 'Thẻ',
      description: 'Tất cả bài viết với thẻ {{tag}}',
      titleWithPage: 'Thẻ: {{tag}} - Trang {{page}}',
    },
    series: {
      breadcrumb: 'chuỗi',
      titlePrefix: 'Chuỗi',
      description: 'Tất cả bài viết trong chuỗi {{series}}',
      dividerLabel: '{{series}} Chuỗi',
    },
    breadcrumbs: {
      home: 'trang chủ',
      posts: 'bài viết',
      tags: 'thẻ',
      series: 'chuỗi',
      page: 'trang',
    },
    footer: {
      poweredBy: 'Được vận hành bởi',
      and: '&',
      copyright: '{{author}} © {{year}}',
    },
    language: {
      label: 'Ngôn ngữ',
      switcherAria: 'Thay đổi ngôn ngữ',
    },
    search: {
      open: 'Mở tìm kiếm',
      dialogLabel: 'Tìm kiếm',
    },
  },
}

function resolveKey(lang: Lang, key: string): string | NestedRecord | undefined {
  const segments = key.split('.')
  let value: string | NestedRecord | undefined = ui[lang]
  for (const segment of segments) {
    if (typeof value === 'object' && value !== null && segment in value) {
      value = value[segment]
    } else {
      value = undefined
      break
    }
  }
  if (typeof value === 'undefined') {
    if (lang !== defaultLang) {
      return resolveKey(defaultLang, key)
    }
    return undefined
  }
  return value
}

function applyParams(template: string, params?: Record<string, string | number>): string {
  if (!params) return template
  return template.replace(/\{\{(.*?)\}\}/g, (_match, token) => {
    const key = token.trim()
    if (key in (params as Record<string, string | number>)) {
      return String(params[key])
    }
    return ''
  })
}

export function useTranslations(lang: Lang) {
  return (key: string, params?: Record<string, string | number>): string => {
    const value = resolveKey(lang, key)
    if (!value) return key
    if (typeof value === 'string') {
      return applyParams(value, params)
    }
    return key
  }
}

export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split('/')
  if (maybeLang && maybeLang in languages) {
    return maybeLang as Lang
  }
  return defaultLang
}

export function stripLangFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length > 0 && segments[0] in languages) {
    segments.shift()
  }
  return '/' + segments.join('/') || '/'
}

export function localizePath(pathname: string, lang: Lang): string {
  const url = new URL(pathname, siteConfig.site)
  const basePath = stripLangFromPath(url.pathname)
  if (lang === defaultLang) {
    return basePath === '/' ? '/' : basePath.replace(/\/$/, '')
  }
  const segments = basePath.split('/').filter(Boolean)
  return '/' + [lang, ...segments].join('/')
}

export function buildLocaleUrl(url: URL, lang: Lang): string {
  const localizedPath = localizePath(url.pathname, lang)
  const search = url.search || ''
  return `${localizedPath}${search}`
}

export function getLanguageOptions(path: URL): Array<{ lang: Lang; label: string; href: string }> {
  return (Object.keys(languages) as Lang[]).map((code) => ({
    lang: code,
    label: languages[code].label,
    href: buildLocaleUrl(path, code),
  }))
}
