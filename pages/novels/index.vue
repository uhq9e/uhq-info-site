<template>
  <div>
    <PageTitle value="鱼文" :caption="pageDescription" show-back-button />
    <div class="flex flex:col align-items:center">
      <div class="general-width w:full mb:24">
        <span><i class="pi pi-tags mr:4"></i><b>标签</b></span>
        <div class="flex flex:wrap gap:8">
          <!-- TODO: 做Tag页 -->
          <NuxtLink
            v-for="countItem in tagsCount"
            :key="countItem.tag"
            :to="`/novels?tag=${countItem.tag}`"
            :class="[
              'text-decoration italic',
              {
                'font:bold font-color:var(--primary-color)':
                  tag === countItem.tag,
              },
            ]"
          >
            {{ `${countItem.tag}(${countItem.count})` }}
          </NuxtLink>
          <NuxtLink v-if="tag" :to="`/novels`">取消选择</NuxtLink>
        </div>
      </div>
      <div class="general-width w:full flex flex:col gap:16">
        <NuxtLink v-for="item in data?.items" :to="`/novels/item/${item.id}`">
          <article
            class="shadow-1 bg:white r:6 p:16 mt:16 cursor:pointer translateY(-0.5rem):hover ~transform|250ms|ease"
          >
            <div class="f:1.5em f:bold mt:-32 mb:8 text-decoration">
              {{ item.title }}
            </div>
            <div class="mb:16">
              <i class="pi pi-user"></i>
              {{ item.author_name }}
            </div>
            <div class="mb:16 font:0.8em white-space:pre-line">
              {{ item.description }}
            </div>
            <div class="flex flex:row gap:4">
              <Tag v-if="item.nsfw" value="NSFW" severity="danger" />
              <Tag v-for="tag in item.tags" :value="tag" />
            </div>
          </article>
        </NuxtLink>
      </div>
    </div>
    <BlockUI :blocked="pending">
      <Paginator
        v-model:first="first"
        @update:first="onFirstChange"
        v-model:rows="rows"
        :totalRecords="data?.count"
        :pt="{ root: { style: { background: 'transparent' } } }"
      />
    </BlockUI>
  </div>
</template>

<script setup lang="ts">
import Tag from "primevue/tag";
import BlockUI from "primevue/blockui";
import Paginator from "primevue/paginator";

import { pageTitleFormat } from "~/utils";

import type { DataTableSortMeta } from "primevue/datatable";
import type { WritableComputedRef } from "vue";

const isDev = process.env.NODE_ENV === "development";

interface QueryParams {
  offset: Ref<number>;
  limit: Ref<number>;
  order_by?: Ref<string>;
  id?: Ref<number>;
  date?: Ref<string>;
  author_id?: Ref<number>;
  nsfw?: Ref<boolean>;
  tags: WritableComputedRef<string | undefined>;
}

const pageTitle = pageTitleFormat("鱼文");
const pageDescription = "翻译的一些yu文。或许以后会有自己写的也说不定。";

useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  twitterTitle: pageTitle,
  description: pageDescription,
  ogDescription: pageDescription,
  twitterDescription: pageDescription,
});

const defaultOrderBy: DataTableSortMeta[] = [
  { field: "created_at", order: -1 },
];

const route = useRoute();
const router = useRouter();

const page = computed({
  get: () => Number(route.query.p ?? "1"),
  set: (p) => router.push({ query: { ...route.query, p } }),
});

const tag = computed({
  get: () => route.query.tag as string | undefined,
  set: (p) => router.push({ query: { ...route.query, tag: p } }),
});

const rows = ref(20);
const first = ref((page.value - 1) * rows.value);

const queryParams = ref<QueryParams>({
  offset: first,
  limit: rows,
  tags: tag,
  order_by: ref(sortMetaArrayToFormat(defaultOrderBy)),
});

const { data, pending, error, execute } = useFetch<ListResponse<Novel>>(
  "/api/novels/item",
  {
    query: queryParams,
    server: false,
  }
);

const tagsCount = await $fetch<TagsCount[]>(
  `${isDev ? SiteData.hostDev : SiteData.host}/api/novels/tags_count`
);

function onFirstChange(first: number) {
  page.value = Math.floor(first / rows.value) + 1;
}
</script>
