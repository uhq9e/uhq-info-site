<template>
  <div v-if="inited">
    <Toast />
    <div
      v-if="tokenStorage.token === null"
      class="flex flex:col align-items:center"
    >
      <Card class="w:20rem max-w:full">
        <template #title>需要认证</template>
        <template #content>
          <div class="flex flex:col gap:8">
            <label for="token" class="f:bold">Token</label>
            <InputText
              id="token"
              type="password"
              v-model="token"
              class="w:full"
            />
          </div>
        </template>
        <template #footer>
          <Button
            @click="onValidate"
            label="验证"
            :loading="loading"
            :disabled="!token.length"
          />
        </template>
      </Card>
    </div>
    <ManageLayout v-else>
      <NuxtPage />
    </ManageLayout>
  </div>
</template>

<script setup lang="ts">
import Toast from "primevue/toast";
import Button from "primevue/button";
import Card from "primevue/card";
import InputText from "primevue/inputtext";

import { useLocalStorage } from "@vueuse/core";
import { useToast } from "primevue/usetoast";
import { validateToken, pageTitleFormat } from "~/utils";

const pageTitle = pageTitleFormat("管理");
const pageDescription = "网站内容管理面板";

useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  twitterTitle: pageTitle,
  description: pageDescription,
  ogDescription: pageDescription,
  twitterDescription: pageDescription,
});

const { t } = useI18n();

const tokenValidated = useState("token-validated", () => false);
const tokenStorage = useLocalStorage<TokenStorage>("manage-token", {
  token: null,
});
const toast = useToast();
const toastLife = 3000;

const token = ref("");
const loading = ref(false);
const inited = ref(false);

onMounted(async () => {
  if (tokenValidated.value) inited.value = true;

  if (tokenStorage.value.token) {
    if (!(await validateToken(tokenStorage.value.token))) {
      tokenStorage.value.token = null;
      toast.add({
        severity: "warn",
        summary: t("messages.sessionExpired"),
        life: toastLife,
      });
    } else tokenValidated.value = true;
  }
  inited.value = true;
});

async function onValidate() {
  loading.value = true;
  if (await validateToken(token.value)) {
    toast.add({
      severity: "success",
      summary: t("messages.validationSuccess"),
      life: toastLife,
    });
    tokenStorage.value = { token: token.value };
  } else {
    toast.add({
      severity: "error",
      summary: t("messages.wrongToken"),
      life: toastLife,
    });
  }
  loading.value = false;
}
</script>
