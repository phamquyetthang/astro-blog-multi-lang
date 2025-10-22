import siteConfig from '~/site.config'
import { TagsGroup } from '~/utils'
import type { Lang } from '~/i18n/config'
import type { CollectionEntry } from 'astro:content'

interface PaginateOptions {
  pageSize: number
  params?: Record<string, any>
  props?: Record<string, any>
}

type PaginateFn = (
  items: CollectionEntry<'posts'>[],
  options: PaginateOptions
) => Promise<any>

export async function getTagArchivePaths(lang: Lang, paginate: PaginateFn) {
  const tagsGroup = await TagsGroup.build(undefined, lang)
  const pages = tagsGroup.collations.flatMap((tag) => {
    return paginate([...tag.entries].reverse(), {
      pageSize: siteConfig.pageSize,
      params: { tag: tag.titleSlug },
      props: { tagTitle: tag.title, lang },
    })
  })
  return pages
}
