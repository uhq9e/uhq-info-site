<template>
  <div>
    <slot :op="op" />
    <OverlayPanel v-if="author" ref="op">
      <div class="mb:16">
        <div class="f:0.8em">作者</div>
        <div class="f:bold f:1.2em max-w:full"><span>{{ author.name }}</span><span class="ml:4 f:0.5em color:gray-72">{{ author.id }}</span></div>
      </div>
      <div>
        <div class="f:0.8em mb:4">社交链接</div>
        <div class="flex flex:row gap:4">
          <AuthorLinkTag v-for="url in author.urls" :url="url" />
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>

<script setup lang="ts">
import OverlayPanel from "primevue/overlaypanel";

defineProps<{
  author?: Author;
}>();

const op = ref<OverlayPanel>();
</script>
