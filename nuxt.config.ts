// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  compatibilityDate: "2024-07-06",
  ssr: true,
  app: {
    baseURL: "/",
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      title: '5x5Game',
      htmlAttrs: {
        lang: 'en', // default language
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'description', content: 'Challenge your mind with a unique puzzle experience! In 5x5GAME, navigate a grid using strategic steps to reach the goal number: 25.' },
        { hid: 'keywords', name: 'keywords', content: '5x5game, game, puzzle, karim oulad chalha, herr.linux88, 5x5, 2048 like' },
        { name: 'author', content: 'Karim Oulad Chalha' },
        { name: 'robots', content: 'index, follow' },

        { property: 'og:title', content: '5x5Game' },
        { property: 'og:description', content: 'Challenge your mind with a unique puzzle experience! In 5x5GAME, navigate a grid using strategic steps to reach the goal number: 25.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://5x5game.github.io/' },
        { property: 'og:image', content: 'https://5x5game.github.io/public/images/preview.png' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '5x5Game' },
        { name: 'twitter:description', content: 'Challenge your mind with a unique puzzle experience! In 5x5GAME, navigate a grid using strategic steps to reach the goal number: 25.' },
        { name: 'twitter:image', content: 'https://5x5game.github.io/public/images/preview.png' },
        { name: 'twitter:site', content: '@5x5game' },


      ],
      link: [
        { rel: 'apple-touch-icon', href: 'assets/images/logo.png' },
        { rel: 'icon', type: 'image/x-icon', href: 'assets/images/favicon.ico' },
      ]
    },
  },

  css: ["@/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxtjs/tailwindcss", '@pinia/nuxt', '@nuxtjs/i18n'],
  i18n: {
    locales: ['ar', 'en', 'fr'],
    defaultLocale: 'en',
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        baseUrl: ".",
        paths: {
          "@/*": ["./*"]
        }
      }
    }
  },
})