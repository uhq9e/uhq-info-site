// https://nuxt.com/docs/api/configuration/nuxt-config
import zh_CN from "./locales/primevue/zh-CN";

export default defineNuxtConfig({
  devtools: { enabled: true },
  // plugins: ["./plugins/primevue"],
  modules: [
    "nuxt-primevue",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    [
      "@vee-validate/nuxt",
      {
        autoImports: true,
        componentNames: {
          Form: "VeeForm",
          Field: "VeeField",
          FieldArray: "VeeFieldArray",
          ErrorMessage: "VeeErrorMessage",
        },
      },
    ],
  ],
  i18n: {
    vueI18n: "./i18n.config.ts", // if you are using custom path, default
  },
  css: [
    "primeicons/primeicons.css",
    // "primeflex/primeflex.scss",
    "@/assets/themes/lara-light-indigo-modified/theme.css",
    "@/assets/styles/main.css",
  ],
  primevue: {
    options: {
      ripple: true,
      locale: zh_CN,
    },
  },
  vite: {
    server: {
      proxy: {
        "/api": {
          target: "https://blog.wakachika.love",
          changeOrigin: true,
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      server: false,
    },
  },
});
