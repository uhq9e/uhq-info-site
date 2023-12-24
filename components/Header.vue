<template>
  <Menubar
    :model="items"
    :pt="{
      root: {
        style: {
          backdropFilter: 'blur(10px)',
          background: 'rgba(0, 0, 0, 0.02)',
          padding: '0 1.25rem',
          zIndex: 999,
          border: 'none',
        },
        class: 'shadow-1',
      },
    }"
  >
    <template #start>
      <NuxtLink
        to="/"
        :class="{ 'font-color:var(--primary-color)': isActive('/') }"
        class="mr:16"
      >
        <span class="f:bold">{{ t("site.title") }}</span>
      </NuxtLink>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <NuxtLink
        v-ripple
        class="flex align-items:center"
        :to="item.to"
        v-bind="props.action"
      >
        <span :class="item.icon" />
        <span class="ml:8">{{ item.label }}</span>
        <span
          v-if="item.shortcut"
          class="ml:auto b:1 b:var(--surface-border) r:6 p:8"
          >{{ item.shortcut }}</span
        >
        <i
          v-if="hasSubmenu"
          :class="[
            'pi pi-angle-down',
            { 'pi-angle-down ml:8': root, 'pi-angle-right ml:auto': !root },
          ]"
        ></i>
      </NuxtLink>
    </template>
  </Menubar>
  <!--
  <Toolbar
    :pt="{
      root: {
        style: {
          backdropFilter: 'blur(10px)',
          background: 'rgba(0, 0, 0, 0.02)',
          padding: '0 1.25rem',
          zIndex: 999,
          border: 'none',
        },
        class: 'shadow-1',
      },
    }"
  >
    <template #start>
      <NuxtLink
        to="/"
        :class="{ 'font-color:var(--primary-color)': isActive('/') }"
      >
        <span class="f:bold">{{ t("site.title") }}</span>
      </NuxtLink>
    </template>
    <template #end>
      <NuxtLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        rel="noopener noreferrer"
        :class="{ 'font-color:var(--primary-color)': isActive(item.path) }"
        class="p-button font-bold bg:transparent b:0"
        >{{ item.name }}</NuxtLink
      >
    </template>
  </Toolbar>
  -->
</template>

<script setup lang="ts">
import Menubar from "primevue/menubar";

import type { MenuItem } from "primevue/menuitem";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const items: MenuItem[] = [
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
  {
    label: "随想",
    icon: "pi pi-comment",
    to: "/thoughts",
  },
];

function isActive(linkPath: string): boolean {
  return route.path === linkPath;
}
</script>

<style scoped></style>
