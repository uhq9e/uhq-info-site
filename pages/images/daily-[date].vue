<template>
  <div class="flex flex:col">
    <PageTitle :value="(route.params.date as string)" :caption="pageDescription" show-back-button />
    <div
      class="flex flex:col w:full align-items:center as:center gap:8 general-width"
    >
      <ImageItem
        v-for="item in data?.items ?? []"
        :item="item"
        class="w:full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { siteData } from "~/utils";

const route = useRoute();
const { data, pending, error, execute } = await useFetch<
  ListResponse<ImageItem>
>("/api/images/item", {
  server: false,
  query: {
    date: route.params.date,
    order_by: "+id",
  },
});

const pageDescription = `${route.params.date}的鱼图`;
const pageTitle = pageTitleFormat(pageDescription);
const pageImageItem = computed(() => data.value?.items.find((v) => !v.nsfw));
const pageImage = computed(() =>
  pageImageItem.value
    ? siteData.objectUrl(pageImageItem.value.local_files[0].path)
    : undefined
);

useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  twitterTitle: pageTitle,
  description: pageDescription,
  ogDescription: pageDescription,
  twitterDescription: pageDescription,
  ogImage: pageImage,
  twitterImage: pageImage,
});

watchEffect(() => {
  if (error.value) {
    switch (error.value?.status) {
      case 422:
        throw createError({
          statusCode: 404,
          statusMessage: "日期不存在",
        });

      default:
        console.error("网络错误");
        break;
    }
  }
});

watchEffect(() => {
  if (data.value) {
    if (!data.value.count) {
      throw createError({
        statusCode: 404,
        statusMessage: "日期不存在",
        fatal: true,
      });
    }
  }
});
</script>
