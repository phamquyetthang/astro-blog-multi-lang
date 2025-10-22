import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'
import { defaultLang, languages } from '~/i18n/config'

const localeKeys = Object.keys(languages) as [keyof typeof languages, ...(keyof typeof languages)[]]

const postsCollection = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      published: z.coerce.date(),
      // updated: z.coerce.date().optional(),
      draft: z.boolean().optional().default(false),
      description: z.string().optional(),
      author: z.string().optional(),
      series: z.string().optional(),
      tags: z.array(z.string()).optional().default([]),
      lang: z.enum(localeKeys).default(defaultLang),
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
  loader: glob({ pattern: ['home*.md', 'home*.mdx'], base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      avatarImage: z
        .object({
          src: image(),
          alt: z.string().optional().default('My avatar'),
        })
        .optional(),
      githubCalendar: z.string().optional(), // GitHub username for calendar
      lang: z.enum(localeKeys).default(defaultLang),
    }),
})

const addendumCollection = defineCollection({
  loader: glob({ pattern: ['addendum*.md', 'addendum*.mdx'], base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      avatarImage: z
        .object({
          src: image(),
          alt: z.string().optional().default('My avatar'),
        })
        .optional(),
      lang: z.enum(localeKeys).default(defaultLang),
    }),
})

export const collections = {
  posts: postsCollection,
  home: homeCollection,
  addendum: addendumCollection,
}
