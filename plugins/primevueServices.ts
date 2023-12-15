import DialogService from "primevue/dialogservice";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(DialogService);
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.use(ConfirmationService);
});
