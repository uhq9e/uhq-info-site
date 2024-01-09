<template>
  <div class="shadow-1 r:6 bg:white p:16">
    <div
      class="flex {flex:col;gap:8}@<xs {flex:row;justify-content:space-between}@>xs mb:8"
    >
      <AuthorPanel :author="item.author" v-slot="slot">
        <div
          class="f:bold f:1.2em cursor:pointer"
          @click="slot.op?.show($event)"
        >
          <i class="pi pi-user mr:4"></i>{{ item.author?.name }}
        </div>
      </AuthorPanel>
      <div class="flex flex:row gap:4">
        <UseSocialPost v-for="(url, i) in item.urls" :url="url" v-slot="slot">
          <NuxtLink :href="url" target="_blank">
            <Tag
              :value="slot.socialPostType.obj.key"
              :title="slot.socialPostType.toDisplay()"
              :style="{ backgroundColor: slot.socialPostType.obj.color }"
              class="p-ripple capitalize"
              v-ripple
            />
          </NuxtLink>
        </UseSocialPost>
      </div>
    </div>
    <div class="w:full rel">
      <div class="flex flex:row flex:nowrap overflow-x:auto h:100 py:8 gap:8">
        <div
          v-for="(file, i) in item.local_files"
          :class="[
            'h:full r:6 aspect:1/1 cursor:pointer b:var(--primary-color) b:2 b:dashed:hover overflow:hidden',
            {
              'b:solid': i === selectionIndex,
            },
          ]"
          @click="selectionIndex = i"
        >
          <img
            :src="SiteData.objectUrl(file.path)"
            :alt="file.file_name"
            class="w:full h:full obj:cover"
            loading="lazy"
          />
        </div>
      </div>
      <img
        :src="SiteData.objectUrl(item.local_files[selectionIndex].path)"
        :alt="item.local_files[selectionIndex].file_name"
        class="w:inherit r:6"
        loading="lazy"
      />
      <div
        v-if="showNsfwMask && item.nsfw"
        class="abs top:0 right:0 bottom:0 left:0 w:full h:full bd:blur(75px) flex flex:row justify-content:center align-items:center"
      >
        <div class="flex flex:col align-items:center">
          <h1 class="mb:2">{{ t("shared.nsfw") }}</h1>
          <div class="f:0.8em mb:16">{{ t("shared.nsfwNotice") }}</div>
          <Button @click="showNsfwMask = false">{{
            t("shared.showContent")
          }}</Button>
        </div>
      </div>
      <Button
        v-if="!showNsfwMask && item.nsfw"
        @click="showNsfwMask = true"
        class="abs bottom:16 left:16"
        size="small"
        >隐藏内容</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Tag from "primevue/tag";

import { SiteData } from "~/utils";

const { t } = useI18n();

const props = defineProps<{
  item: ImageItem;
}>();

const selectionIndex = ref(0);
const showNsfwMask = ref(props.item.nsfw);
</script>
