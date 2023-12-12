<template>
  <Toolbar
    :pt="{
      root: {
        style: {
          backdropFilter: 'blur(10px)',
          background: 'rgba(0, 0, 0, 0.02)',
          padding: '0 1.25rem',
          zIndex: 999,
        },
      },
    }"
  >
    <template #start>
      <NuxtLink to="/" :class="{ 'font-color:var(--primary-color)': isActive('/') }">
        <span class="f:bold">{{ t("site.title") }}</span>
      </NuxtLink>
    </template>
    <template #end>
      <NuxtLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        :class="{ 'font-color:var(--primary-color)': isActive(item.path) }"
        >{{ item.name }}</NuxtLink
      >
    </template>
  </Toolbar>
</template>

<script setup lang="ts">
import Toolbar from "primevue/toolbar";

const route = useRoute();
const { t } = useI18n();

interface HeaderNavItem {
  name: string;
  path: string;
}

const navItems: HeaderNavItem[] = [
  {
    name: "鱼图",
    path: "/images/daily",
  },
];

function isActive(linkPath: string): boolean {
  return route.path === linkPath;
}
</script>

<style scoped></style>
