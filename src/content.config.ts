import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'
import { defaultLang, supportedLangs } from '~/i18n/config'

const languageEnum = z.enum(supportedLangs as [typeof supportedLangs[number], ...typeof supportedLangs[number][]])

const postsCollection = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      lang: languageEnum.default(defaultLang),
      published: z.coerce.date(),
      // updated: z.coerce.date().optional(),
      draft: z.boolean().optional().default(false),
      description: z.string().optional(),
      author: z.string().optional(),
      series: z.string().optional(),
      tags: z.array(z.string()).optional().default([]),
      coverImage: z
        .strictObject({
          src: image(),
          alt: z.string(),
        })
        .optional(),
      toc: z.boolean().optional().default(true),
    }),
})

const homeCollection = defineCollection({
  loader: glob({ pattern: ['home/**/*.{md,mdx}'], base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      lang: languageEnum.default(defaultLang),
      avatarImage: z
        .object({
          src: image(),
          alt: z.string().optional().default('My avatar'),
        })
        .optional(),
      githubCalendar: z.string().optional(), // GitHub username for calendar
    }),
})

const addendumCollection = defineCollection({
  loader: glob({ pattern: ['addendum/**/*.{md,mdx}'], base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      lang: languageEnum.default(defaultLang),
      avatarImage: z
        .object({
          src: image(),
          alt: z.string().optional().default('My avatar'),
        })
        .optional(),
    }),
})

const pagesCollection = defineCollection({
  loader: glob({ pattern: ['pages/**/*.{md,mdx}'], base: './src/content' }),
  schema: () =>
    z.object({
      title: z.string(),
      lang: languageEnum.default(defaultLang),
    }),
})

export const collections = {
  posts: postsCollection,
  home: homeCollection,
  addendum: addendumCollection,
  pages: pagesCollection,
}
