<template>
  <Menu :model="items">
    <template #item="{ item, props }">
      <a
        v-ripple
        :class="[
          'flex align-items:center bg:transparent',
          { 'item-actived': route.path === item.url },
        ]"
        :href="item.url"
        v-bind="props.action"
      >
        <span v-if="item.icon" :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
      </a>
    </template>
  </Menu>
</template>

<script setup lang="ts">
import Menu from "primevue/menu";

import type { MenuItem } from "primevue/menuitem";

defineProps<{
  items: MenuItem[];
}>();

const route = useRoute();
</script>

<style scoped lang="scss">
.item-actived {
  background-color: var(--surface-hover);
  color: var(--primary-color);
}
</style>
