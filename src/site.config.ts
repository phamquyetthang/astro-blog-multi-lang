import type { SiteConfig } from '~/types'

const config: SiteConfig = {
  // Absolute URL to the root of your published site, used for generating links and sitemaps.
  site: 'https://codeduthu.stelclementine.com',
  // The name of your site, used in the title and for SEO.
  title: 'Codeduthu',
  // The description of your site, used for SEO and RSS feed.
  description:
    'A coder-ready Astro blog theme with 59 of your favorite color schemes to choose from',
  // The author of the site, used in the footer, SEO, and RSS feed.
  author: 'Katy Kookaburra',
  // Keywords for SEO, used in the meta tags.
  tags: ['Astro', 'Terminal', 'Theme', 'Codeduthu', 'stelcodes'],
  // Path to the image used for generating social media previews.
  // Needs to be a square JPEG file due to limitations of the social card generator.
  // Try https://squoosh.app/ to easily convert images to JPEG.
  socialCardAvatarImage: './src/content/avatar.jpg',
  // Font imported from Google Fonts or elsewhere, used site-wide.
  font: 'Lexend Deca',
  // For pagination, the number of posts to display per page.
  // The homepage will display half this number in the "Latest Posts" section.
  pageSize: 6,
  // Whether Astro should resolve trailing slashes in URLs or not.
  // This value is used in the astro.config.mjs file and in the "Search" component to make sure pagefind links match this setting.
  // It is not recommended to change this, since most links existing in the site currently do not have trailing slashes.
  trailingSlashes: false,
  // The navigation links to display in the header.
  navLinks: [
    {
      name: 'Home',
      url: '/',
      i18nKey: 'nav.home',
    },
    {
      name: 'About',
      url: '/about',
      i18nKey: 'nav.about',
    },
    {
      name: 'Archive',
      url: '/posts',
      i18nKey: 'nav.archive',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/phamquyetthang/astro-blog-multi-lang',
      external: true,
      i18nKey: 'nav.github',
    },
  ],
  // The theming configuration for the site.
  themes: {
    // The theming mode. One of "single" | "select" | "light-dark-auto".
    mode: 'select',
    // The default theme identifier, used when themeMode is "select" or "light-dark-auto".
    // Make sure this is one of the themes listed in `themes` or "auto" for "light-dark-auto" mode.
    default: 'catppuccin-mocha',
    // Shiki themes to bundle with the site.
    // https://expressive-code.com/guides/themes/#using-bundled-themes
    // These will be used to theme the entire site along with syntax highlighting.
    // To use light-dark-auto mode, only include a light and a dark theme in that order.
    // include: [
    //   'github-light',
    //   'github-dark',
    // ]
    include: [
      'catppuccin-latte',
      'catppuccin-mocha',
      'dracula',
      'github-dark',
      'github-light',
      'material-theme-darker',
      'material-theme-lighter',
    ],
    // Optional overrides for specific themes to customize colors.
    // Their values can be either a literal color (hex, rgb, hsl) or another theme key.
    // See themeKeys list in src/types.ts for available keys to override and reference.
    overrides: {
      // Improve readability for aurora-x theme
      // 'aurora-x': {
      //   background: '#292929FF',
      //   foreground: '#DDDDDDFF',
      //   warning: '#FF7876FF',
      //   important: '#FF98FFFF',
      //   note: '#83AEFFFF',
      // },
      // Make the GitHub dark theme a little cuter
      // 'github-light': {
      //   accent: 'magenta',
      //   heading1: 'magenta',
      //   heading2: 'magenta',
      //   heading3: 'magenta',
      //   heading4: 'magenta',
      //   heading5: 'magenta',
      //   heading6: 'magenta',
      //   separator: 'magenta',
      //   link: 'list',
      // },
    },
  },
  // Social links to display in the footer.
  socialLinks: {
    github: 'https://github.com/phamquyetthang/astro-blog-multi-lang',
    mastodon: 'https://github.com/phamquyetthang/astro-blog-multi-lang',
    email: 'https://github.com/phamquyetthang/astro-blog-multi-lang',
    linkedin: 'https://github.com/phamquyetthang/astro-blog-multi-lang',
    bluesky: 'https://github.com/phamquyetthang/astro-blog-multi-lang',
    twitter: 'https://github.com/phamquyetthang/astro-blog-multi-lang',
    rss: true, // Set to true to include an RSS feed link in the footer
  },
  // Configuration for Giscus comments.
  // To set up Giscus, follow the instructions at https://giscus.app/
  // You'll need a GitHub repository with discussions enabled and the Giscus app installed.
  // Take the values from the generated script tag at https://giscus.app and fill them in here.
  // IMPORTANT: Update giscus.json in the root of the project with your own website URL
  // If you don't want to use Giscus, set this to undefined.
  giscus: {
    repo: 'phamquyetthang/astro-blog-multi-lang',
    repoId: 'R_kgDOPNnBig',
    category: 'Giscus',
    categoryId: 'DIC_kwDOPNnBis4CteOc',
    reactionsEnabled: true, // Enable reactions on post itself
  },
  // These are characters available for the character chat feature.
  // To add your own character, add an image file to the top-level `/public` directory
  // Make sure to compress the image to a web-friendly size (<100kb)
  // Try using the excellent https://squoosh.app web app for creating small webp files
  characters: {
    owl: '/owl.webp',
    unicorn: '/unicorn.webp',
    duck: '/duck.webp',
  },
}

export default config
