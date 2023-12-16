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
        class="mr:8"
      >
        <span class="f:bold">{{ t("site.title") }}</span>
      </NuxtLink>
    </template>
    <!--
    <template #item="{ item, props, hasSubmenu, root }">
      <a v-ripple class="flex align-items-center" v-bind="props.action">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
        <Badge
          v-if="item.badge"
          :class="{ 'ml-auto': !root, 'ml-2': root }"
          :value="item.badge"
        />
        <span
          v-if="item.shortcut"
          class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1"
          >{{ item.shortcut }}</span
        >
        <i
          v-if="hasSubmenu"
          :class="[
            'pi pi-angle-down text-primary',
            { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root },
          ]"
        ></i>
      </a>
    </template>
    -->
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
import Toolbar from "primevue/toolbar";
import Menubar from "primevue/menubar";

import type { MenuItem } from "primevue/menuitem";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const items: MenuItem[] = [
  {
    label: "鱼图",
    icon: "pi pi-image",
    // to: "/images/daily",
    command: () => router.push("/images/daily"),
  },
  {
    label: "鱼文",
    icon: "pi pi-book",
    // to: "/novels",
    command: () => router.push("/novels"),
  },
];

function isActive(linkPath: string): boolean {
  return route.path === linkPath;
}
</script>

<style scoped></style>
