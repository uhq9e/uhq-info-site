<template>
  <div class="app-container">
    <link
      rel="stylesheet"
      href="https://font.sec.miui.com/font/css?family=MiSans:200,300,400,450,500,600,650,700:Chinese_Simplify,Japanese,Latin&display=swap"
    />
    <NuxtLoadingIndicator />
    <Header class="app-header" />
    <NuxtPage class="app-page" />
  </div>
</template>

<script setup lang="ts">
import "@master/css";
import * as pkg from "@master/css";
const { init, Style } = pkg;

Style.extend("classes", {
  "general-width": "max-w:40rem",
  "text-outline":
    "text-shadow:-1|-1|0|gray-84,1|-1|0|gray-84,-1|1|0|gray-84,1|1|0|gray-84",
});
init();
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
}
</style>
