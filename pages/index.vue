<template>
  <div>
    <div
      class="h:calc(100vh-5.5rem) flex flex:row r:6 overflow:hidden shadow-2"
    >
      <div
        class="w:100% w:50%@sm p:32@>sm text:center text:left@sm flex align-items:center justify-content:center@<sm justify-content:start@>sm z:1"
      >
        <section class="py:32 w:full bd:blur(10)@<md">
          <div class="f:3rem f:bold mb:16">
            <span class="heading-gradient">{{ t("site.title") }}</span>
          </div>
          <p class="mt:0 mb:16 lh:1.5">{{ t("site.description") }}</p>

          <NuxtLink
            to="/images/daily"
            class="p-button p-button-raised f:bold f:white f:white:hover"
            >鱼图</NuxtLink
          >
        </section>
      </div>
      <div
        class="w:100% w:50%@sm static@>sm abs@<sm r:6@md overflow:hidden top:0 right:0 bottom:0 left:0"
      >
        <div
          class="clip:polygon(8%|0,100%|0%,100%|100%,0|100%)@sm w:full h:full bg:url('/images/hero.jpg') bg:cover bg:center"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pageTitleFormat } from "~/utils";

const { t } = useI18n();

const pageTitle = pageTitleFormat("主页");
const pageDescription = "若千人的末路";

useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  twitterTitle: pageTitle,
  description: pageDescription,
  ogDescription: pageDescription,
  twitterDescription: pageDescription,
});
</script>

<style scoped lang="scss">
@import "primeflex/primeflex.scss";

.heading-gradient {
  background-color: var(--primary-color);
  background-image: linear-gradient(45deg, #00f, #f00);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
