import { SeriesGroup } from '~/utils'
import type { Lang } from '~/i18n/config'

export async function getSeriesPaths(lang: Lang) {
  const seriesGroup = await SeriesGroup.build(undefined, lang)
  return seriesGroup.collations.map((series) => ({
    params: { slug: series.titleSlug },
    props: {
      posts: series.entries,
      seriesTitle: series.title,
      lang,
    },
  }))
}
