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
          <p class="mt:0 lh:1.5">{{ t("site.description") }}</p>
          <Divider class="w:50%@>sm w:full@<sm display:none@<sm" />
          <div class="flex flex:col">
            <NuxtLink
              v-for="item in menuItems"
              :to="item.to"
              class="p:16 bg:#6366f110:hover w:50%@>sm w:full@<sm matrix(1,0,-0.2,1,16,0):hover>div@>sm scale(1.2):hover>div@<sm"
            >
              <div class="~transform|250ms|ease">
                <i :class="item.icon" class="mr:4"></i>
                {{ item.label }}
              </div>
            </NuxtLink>
          </div>
        </section>
      </div>
      <div
        class="w:100% w:50%@sm static@>sm abs@<sm r:6@md overflow:hidden top:0 right:0 bottom:0 left:0"
      >
        <div
          class="clip:polygon(8%|0,100%|0%,100%|100%,0|100%)@sm w:full h:full bg:url('/images/hero.webp') bg:cover bg:center"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import Divider from "primevue/divider";
import { pageTitleFormat, siteData } from "~/utils";

const { t } = useI18n();

const pageTitle = pageTitleFormat("主页");
const pageDescription = "若千人的末路";
const pageImage = `${siteData.host}images/hero.webp`;

useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  twitterTitle: pageTitle,
  description: pageDescription,
  ogDescription: pageDescription,
  twitterDescription: pageDescription,
  ogImage: pageImage,
  twitterImage: pageImage,
});

const menuItems: MenuItem[] = [
  {
    label: "鱼图",
    icon: "pi pi-image",
    to: "/images/daily",
  },
  {
    label: "鱼文",
    icon: "pi pi-book",
    to: "/novels",
  },
];
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
