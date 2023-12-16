<template>
  <div>
    <PageTitle value="鱼文" :caption="pageDescription" show-back-button />
    <h3 class="text:center">施工中</h3>
  </div>
</template>

<script setup lang="ts">
import { pageTitleFormat } from "~/utils";

const pageTitle = pageTitleFormat("鱼文");
const pageDescription = "翻译的一些yu文。或许以后会有自己写的也说不定。";

useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  twitterTitle: pageTitle,
  description: pageDescription,
  ogDescription: pageDescription,
  twitterDescription: pageDescription,
});
</script>
