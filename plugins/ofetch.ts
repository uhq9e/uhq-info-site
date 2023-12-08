import { ofetch } from "ofetch";
import { useLocalStorage } from "@vueuse/core";

export default defineNuxtPlugin((_nuxtApp) => {
  globalThis.$fetch = ofetch.create({
    onRequest({ request, options }) {
      const tokenStorage = useLocalStorage<TokenStorage>("manage-token", {
        token: null,
      });

      if (tokenStorage.value.token !== null) {
        options.headers = { Authorization: tokenStorage.value.token };
      }
    },
  });
});
