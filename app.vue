<template>
  <div class="app-container">
    <Head>
      <Meta name="theme-color" content="#c384db" />
    </Head>
    <NuxtLoadingIndicator />
    <Toast />
    <Header class="app-header" />
    <NuxtPage class="app-page" />
  </div>
</template>

<script setup lang="ts">
import Toast from "primevue/toast";

import "@master/css";
import * as pkg from "@master/css";
const { init, Style } = pkg;

Style.extend("classes", {
  "general-width": "max-w:40rem",
  "large-width": "max-w:50rem",
  "text-outline":
    "text-shadow:-1|-1|0|gray-84,1|-1|0|gray-84,-1|1|0|gray-84,1|1|0|gray-84",
});
init();

onMounted(() => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href =
    "https://font.sec.miui.com/font/css?family=MiSans:200,300,400,450,500,600,650,700:Chinese_Simplify,Chinese_Traditional,Latin&display=swap";
  document.getElementsByTagName("head")[0].appendChild(link);
});
</script>

<style scoped>
.app-container {
  position: relative;
}

.app-header {
  height: 4rem;
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  right: 0.5rem;
}
</style>

<style>
.app-page {
  margin-top: 5rem;
  height: calc(100vh - 5rem - 8px) !important;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.35s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
