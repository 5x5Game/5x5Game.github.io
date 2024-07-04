// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-07-04",

  // Disable server-side rendering
  ssr: false,

  app: {
    baseURL: '/5x5Game.github.io/', // Replace <REPO_NAME> with your GitHub repository name
  },

  css: ["~/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  tailwindcss: {
    configPath: "tailwind.config.ts",
    cssPath: "assets/css/tailwind.css",
  },

  modules: [
    "@nuxtjs/tailwindcss",
  ],
  typescript: {
    tsConfig: {
      compilerOptions: {
        baseUrl: ".",
        paths: {
          "@/*": ["./*"]
        }
      }
    }
  }
})