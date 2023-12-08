<template>
  <div>
    <slot :op="op" />
    <OverlayPanel v-if="author" ref="op">
      <div class="mb:16">
        <div class="f:0.8em">作者</div>
        <div class="f:bold f:1.2em max-w:full">{{ author.name }}</div>
      </div>
      <div>
        <div class="f:0.8em mb:4">社交链接</div>
        <div class="flex flex:row gap:4">
          <NuxtLink
            v-for="(url, i) in author.urls"
            :key="i"
            :href="url"
            target="_blank"
          >
            <Tag
              :value="urlToHostname(url)"
              class="p-ripple capitalize"
              v-ripple
            />
          </NuxtLink>
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>

<script setup lang="ts">
import type OverlayPanel from "primevue/overlaypanel";

defineProps<{
  author?: Author;
}>();

const op = ref<OverlayPanel>();
</script>
