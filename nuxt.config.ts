// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseUrl: 'https://api.football-data.org/v4',
      apiKey: '350b521f25d54db8a6402c67c0ab79f6',
    },
  },
  devtools: { enabled: true },
})
