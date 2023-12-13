<template>
  <div class="flex flex:column h:calc(100vh-5.5rem)">
    <Sidebar
      v-model:visible="sidebarVisible"
      :pt="{ content: { class: 'px:0' } }"
    >
      <NavigateMenu :items="items" class="w:full border:0" />
    </Sidebar>
    <Button
      @click="sidebarVisible = !sidebarVisible"
      label="导航"
      icon="pi pi-bars"
      class="mb:8 hidden@xs"
      text
    />
    <div class="flex flex:row flex-grow:1 w:full">
      <NavigateMenu class="hidden@<xs mr:8" :items="items" />
      <div
        class="flex-grow:1 b:1 b:solid b:var(--surface-border) r:6 overflow:hidden"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Sidebar from "primevue/sidebar";

import type { MenuItem } from "primevue/menuitem";

defineSlots<{
  default(props: {}): any;
}>();

const items = ref<MenuItem[]>([
  { label: "图片管理", url: "/manage/images" },
  { label: "作者管理", url: "/manage/authors" },
]);
const sidebarVisible = ref(false);
</script>
