<template>
  <NuxtLink :href="url" target="_blank">
    <Tag class="p-ripple capitalize" v-ripple>
      <div class="flex flex:row align-items:center gap:2">
        <img :src="faviconUrl" :alt="hostname" class="h:1.25em w:1.25em" />
        {{ hostname }}
      </div>
    </Tag>
  </NuxtLink>
</template>

<script setup lang="ts">
import Tag from "primevue/tag";

const props = defineProps<{
  url: string;
}>();

const hostname = urlToHostname(props.url);
const faviconUrl = urlToFavicon(props.url);
</script>
