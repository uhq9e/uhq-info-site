<template>
  <div v-if="data">
    <PageTitle :value="data.title" :caption="data.description" class="pb:0">
      <template #after>
        <Tag v-if="data.nsfw" value="NSFW" severity="danger" />
      </template>
    </PageTitle>
    <Divider />
    <div class="px:16 flex flex:col gap:16 {flex;flex:col;gap:4}>*">
      <NuxtLink
        :href="data.author_url ?? `javascript:;`"
        target="_blank"
        title="作者"
      >
        <div><i class="pi pi-user mr:4"></i>作者</div>
        <div class="word-break:break-all">{{ data.author_name }}</div>
      </NuxtLink>
      <NuxtLink v-if="data.url" :href="data.url" target="_blank" title="原址">
        <div><i class="pi pi-link mr:4"></i>原址</div>
        <div class="word-break:break-all">{{ data.url }}</div>
      </NuxtLink>
      <div title="标签">
        <div><i class="pi pi-tags mr:4"></i>标签</div>
        <div class="flex flex:row gap:4">
          <Tag v-for="tag in data.tags" :value="tag" />
        </div>
      </div>
      <div title="页数">
        <div><i class="pi pi-file mr:4"></i>页数</div>
        <span v-if="!pdfData">...</span>
        <span v-else>{{ pdfData.numPages }}</span>
      </div>
    </div>
    <Divider />
    <div class="px:16 f:yellow">
      如果字太小看不清，可以双指放大，或<NuxtLink
        :href="SiteData.objectUrl(data.object?.key)"
        target="_blank"
        class="f:bold"
        >下载源PDF文件阅读</NuxtLink
      >
    </div>
    <Divider />
    <div class="flex flex:row justify-content:center">
      <ClientOnly>
        <VuePdfEmbed
          :source="{
            cMapUrl: 'https://unpkg.com/pdfjs-dist/cmaps/',
            url: isDev
              ? `http://localhost:3000/test.pdf`
              : SiteData.objectUrl(data.object?.key),
          }"
          :width="viewerWidth"
          :scale="1.4143"
          @loaded="pdfLoaded"
          class="{mb:16;box-shadow:0|0|20|rgba(0,0,0,0.35);bg:white}>div"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import Divider from "primevue/divider";
import Tag from "primevue/tag";
import { SiteData } from "~/utils";

const isDev = process.env.NODE_ENV === "development";

const route = useRoute();

const data = await $fetch<Novel>(
  `${isDev ? SiteData.hostDev : SiteData.host}/api/novels/item/${
    route.params.id
  }`
);

const pageTitle = computed(() => pageTitleFormat(data.title));
const pageDescription = computed(() => data.description);

useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  twitterTitle: pageTitle,
  description: pageDescription,
  ogDescription: pageDescription,
  twitterDescription: pageDescription,
});

const pdfData = ref<any>(null);

function pdfLoaded(event: any) {
  pdfData.value = event;
}

const viewerWidth = computed(() => {
  if (screen.width > 800) {
    return 800 - 16;
  } else {
    return screen.width - 16;
  }
});
</script>
