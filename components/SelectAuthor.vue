<template>
  <div>
    <div>
      <DataTable
        data-key="id"
        :value="data?.items ?? []"
        :first="queryParams.offset"
        :rows="queryParams.limit"
        :loading="pending"
        :total-records="data?.count ?? 0"
        v-model:filters="filters"
        filter-display="row"
        v-model:selection="selectedItem"
        selection-mode="single"
        :meta-key-selection="false"
        lazy
        paginator
        @page="loadLazyData($event)"
        @filter="onFilter($event)"
        class="flex-grow:1"
      >
        <Column field="id" header="ID"></Column>
        <Column field="name" header="名">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @keydown.enter="filterCallback()"
              placeholder="搜索"
            /> </template
        ></Column>
      </DataTable>
    </div>
    <div class="flex flex:row justify-content:end gap:4">
      <Button
        @click="onCancel"
        label="选择"
        :disabled="selectedItem === null"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

import type {
  DataTablePageEvent,
  DataTableSortEvent,
  DataTableFilterEvent,
  DataTableFilterMeta,
  DataTableFilterMetaData,
} from "primevue/datatable";

type DataTableEvent =
  | DataTablePageEvent
  | DataTableSortEvent
  | DataTableFilterEvent;

interface QueryParams {
  name?: string;
  offset: number;
  limit: number;
  date?: number;
  author_id?: number;
}

const emit = defineEmits<{}>();

const dialogRef = inject<any>("dialogRef");

const queryParams = ref<QueryParams>({
  offset: 0,
  limit: 20,
});
const filters = ref<DataTableFilterMeta>({
  name: { value: "", matchMode: "contains" },
});
const selectedItem = ref<Author | null>(null);

const { data, pending, error, execute } = useFetch<ListResponse<Author>>(
  "/api/authors/item",
  {
    query: queryParams,
    server: false,
  }
);

function loadLazyData(event: DataTableEvent) {
  queryParams.value = {
    ...queryParams.value,
    offset: event.first,
  };

  execute();
}

function onFilter(event: DataTableFilterEvent) {
  const nameValue = (event.filters.name as DataTableFilterMetaData).value;
  queryParams.value.name = nameValue ? `%${nameValue}%` : undefined;

  loadLazyData(event);
}

function onCancel() {
  dialogRef.value.close(selectedItem.value!.id);
}
</script>
