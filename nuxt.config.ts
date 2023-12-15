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
    components: {
      include: [],
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  vite: {
    build: {
      modulePreload: false,
    },
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
  hooks: {
    /*
    "build:manifest": (manifest) => {
      for (const key in manifest) {
        // or other logic
        manifest[key].dynamicImports = [];
      }
      for (const key in manifest) {
        const file = manifest[key];

        if (file.assets) {
          file.assets = file.assets.filter(
            (asset: string) =>
              !asset.endsWith(".webp") &&
              !asset.endsWith(".jpg") &&
              !asset.endsWith(".png") &&
              !asset.endsWith(".woff2")
          );
        }
      }
    },
    */
  },
});
