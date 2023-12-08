<template>
  <div>
    <PageTitle value="鱼图" />
    <section class="flex flex:col">
      <BlockUI :blocked="pending">
        <Paginator
          v-model:first="first"
          @update:first="onFirstChange"
          v-model:rows="rows"
          :totalRecords="data?.count"
          :pt="{ root: { style: { background: 'transparent' } } }"
        />
      </BlockUI>
      <div class="flex flex:col gap:8 align-items:center">
        <NuxtLink
          v-for="image in Object.entries(grouped)"
          :to="`/images/daily-${image[0]}`"
          target="_blank"
          class="b:1 b:solid b:var(--surface-border) r:6 px:16 py:8 bg:white general-width w:full"
        >
          <div class="f:bold mb:8 text-decoration">{{ image[0] }}</div>
          <div
            class="w:full h:150 px:16 py:8 flex flex:row gap:8 overflow-x:auto b:1 b:solid b:var(--surface-border) r:6 bg:var(--surface-ground)"
          >
            <div
              v-for="file in image[1]"
              class="h:full r:6 shadow-2 aspect:1/1 bg:center bg:cover"
              :style="{
                backgroundImage: `url('https://object.wakachika.love/${file.local_files[0].path}')`,
              }"
            ></div>
          </div>
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
import { groupBy } from "lodash-es";
import { sortMetaArrayToFormat } from "~/utils";

import type { DataTableSortMeta } from "primevue/datatable";

const pageTitle = pageTitleFormat("鱼图");
const pageDescription = "每天收集的一些鱼图";

useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  description: pageDescription,
  ogDescription: pageDescription,
});

interface QueryParams {
  offset: Ref<number>;
  limit: Ref<number>;
  order_by?: Ref<string>;
  id?: Ref<number>;
  date?: Ref<string>;
  author_id?: Ref<number>;
  nsfw?: Ref<boolean>;
}

const defaultOrderBy: DataTableSortMeta[] = [{ field: "date", order: -1 }];

const route = useRoute();
const router = useRouter();

const page = computed({
  get: () => Number(route.query.p ?? "1"),
  set: (p) => router.push({ query: { p } }),
});

const rows = ref(20);
const first = ref((page.value - 1) * rows.value);
const queryParams = ref<QueryParams>({
  offset: first,
  limit: rows,
  order_by: ref(sortMetaArrayToFormat(defaultOrderBy)),
});

const { data, pending, error, execute } = await useFetch<
  ListResponse<ImageItem>
>("/api/images/item", {
  query: queryParams,
  server: false,
});

const grouped = computed(() => groupBy(data.value?.items, "date"));

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
