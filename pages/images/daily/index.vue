<template>
  <div>
    <PageTitle value="鱼图" :caption="pageDescription" />
    <section class="flex flex:col">
      <div class="flex flex:col gap:16 align-items:center">
        <NuxtLink
          v-for="collection in data?.items"
          :to="`/images/daily/${collection[0]}`"
          class="general-width w:full"
        >
          <article
            class="shadow-1 r:6 p:16 mt:16 bg:white translateY(-0.5rem):hover ~transform|250ms|ease"
          >
            <div class="f:1.5em f:bold mt:-32 mb:8 text-decoration">
              {{ collection[0] }}
            </div>
            <div
              class="rel w:full h:150 px:16 py:8 flex flex:row gap:8 overflow-x:hidden b:2 b:dashed b:var(--surface-border) r:6 bg:var(--surface-ground)"
            >
              <div
                v-for="file in collection[1].slice(0, 6)"
                class="h:full r:6 shadow-2 aspect:1/1 bg:center bg:cover"
                :class="{ 'filter:blur(10px)': file.nsfw }"
                :style="{
                  backgroundImage: `url('${SiteData.objectUrl(
                    file.local_files[0].path
                  )}')`,
                }"
              ></div>
              <div class="abs bottom:0 right:0 flex gap:8 align-items:center color:white bg:rgba(0,0,0,0.4) rtl:6 p:8 shadow-2">
                <i class="pi pi-image"></i>
                <span>{{ collection[1].length }}</span>
              </div>
            </div>
          </article>
        </NuxtLink>
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
    </section>
  </div>
</template>

<script setup lang="ts">
import BlockUI from "primevue/blockui";
import Paginator from "primevue/paginator";

import { SiteData } from "~/utils";

import type { DataTableSortMeta } from "primevue/datatable";

const pageTitle = pageTitleFormat("鱼图");
const pageDescription =
  "每日收集鱼图。由于个人喜好及人工收集难免漏图等缘故，如有遗漏属正常现象。";

useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  twitterTitle: pageTitle,
  description: pageDescription,
  ogDescription: pageDescription,
  twitterDescription: pageDescription,
});

interface QueryParams {
  offset: Ref<number>;
  limit: Ref<number>;
  id?: Ref<number>;
  date?: Ref<string>;
  author_id?: Ref<number>;
  nsfw?: Ref<boolean>;
}

const defaultOrderBy: DataTableSortMeta[] = [
  { field: "date", order: -1 },
  { field: "id", order: 1 },
];

const route = useRoute();
const router = useRouter();

const page = computed({
  get: () => Number(route.query.p ?? "1"),
  set: (p) => router.push({ query: { p } }),
});

const rows = ref(10);
const first = ref((page.value - 1) * rows.value);
const queryParams = ref<QueryParams>({
  offset: first,
  limit: rows,
});

const { data, pending, error, execute } = await useFetch<
  ListResponse<GroupedImageItems>
>("/api/images/items_by_date", {
  query: queryParams,
  server: false,
});

function onFirstChange(first: number) {
  page.value = Math.floor(first / rows.value) + 1;
}
</script>

<style scoped lang="scss">
.collection-thumbnail {
  aspect-ratio: 16 / 9;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
