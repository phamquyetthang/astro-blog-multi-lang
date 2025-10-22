import siteConfig from '~/site.config'
import { getSortedPosts } from '~/utils'
import type { Lang } from '~/i18n/config'

type PaginateFn = (
  items: Awaited<ReturnType<typeof getSortedPosts>>,
  options: { pageSize: number; props?: Record<string, any> }
) => Promise<any>

export async function getPostArchivePaths(lang: Lang, paginate: PaginateFn) {
  const sortedPosts = await getSortedPosts(lang)
  return paginate([...sortedPosts].reverse(), {
    pageSize: siteConfig.pageSize,
    props: { lang },
  })
}
