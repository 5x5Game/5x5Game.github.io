// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-07-04",
  ssr: false, // Disable server-side rendering
  app: {
    baseURL: '/5x5Game.github.io/', // Replace <REPO_NAME> with your GitHub repository name
  },
})