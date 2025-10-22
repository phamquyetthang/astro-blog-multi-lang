import { getPostSequenceContext, getSortedPosts } from '~/utils'
import type { Lang } from '~/i18n/config'

export async function getPostStaticPaths(lang: Lang) {
  const posts = await getSortedPosts(lang)
  return posts.map((post) => {
    const { prev, next } = getPostSequenceContext(post, posts)
    return {
      params: { slug: post.id },
      props: {
        post,
        prev,
        next,
        lang,
      },
    }
  })
}
