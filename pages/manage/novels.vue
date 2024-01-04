<template>
  <div class="h:full flex flex:column">
    <Menubar :model="menuItems" :pt="{ root: { class: 'border:none' } }" />
    <DataTable
      :value="data?.items ?? []"
      :first="queryParams.offset"
      :rows="queryParams.limit"
      :loading="pending"
      :total-records="data?.count ?? 0"
      sort-mode="multiple"
      :multi-sort-meta="defaultOrderBy"
      v-model:filters="filters"
      :globalFilterFields="['id', 'author_name', 'nsfw']"
      filterDisplay="menu"
      data-key="id"
      lazy
      paginator
      @page="onPage"
      @sort="onSort"
      @filter="onFilter"
      class="flex-grow:1"
    >
      <Column field="id" header="ID" :show-filter-match-modes="false" sortable>
        <template #filter="{ filterModel, filterCallback }">
          <InputNumber
            v-model="filterModel.value"
            @keydown.enter="filterCallback()"
            :useGrouping="false"
            class="p-column-filter"
            placeholder="检索ID"
          />
        </template>
      </Column>
      <Column field="title" header="标题"></Column>
      <Column
        field="author_name"
        header="作者名"
        :show-filter-match-modes="false"
        sortable
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            @keydown.enter="filterCallback()"
            class="p-column-filter"
            placeholder="检索作者名"
          />
        </template>
      </Column>
      <Column field="tags" header="标签">
        <template #body="slotProps">
          <div class="flex flex:row flex:wrap gap:4">
            <Tag v-for="tag in slotProps.data.tags" :value="tag" />
          </div>
        </template>
      </Column>
      <Column
        field="nsfw"
        header="NSFW"
        :show-filter-match-modes="false"
        sortable
      >
        <template #body="slotProps">
          <Checkbox
            :model-value="slotProps.data.nsfw"
            :binary="true"
            readonly
          />
        </template>
        <template #filter="{ filterModel }">
          <div>
            <TriStateCheckbox
              id="nsfw"
              v-model="filterModel.value"
              class="p-column-filter"
            />
            <label for="nsfw">是否为NSFW</label>
          </div>
        </template>
      </Column>
      <Column header="操作">
        <template #body="slotProps">
          <div class="flex flex:row gap:4">
            <Button
              @click="showEditItemDialog(slotProps.data)"
              icon="pi pi-pencil"
              size="small"
              severity="info"
              text
            />
            <ConfirmPanel
              @execute="() => onDeleteItem(slotProps.data.id)"
              v-slot="slot"
            >
              <Button
                @click="slot.op?.show($event)"
                icon="pi pi-trash"
                size="small"
                severity="danger"
                :loading="loading"
                text
              />
            </ConfirmPanel>
          </div>
        </template>
      </Column>
    </DataTable>
    <DynamicDialog />
  </div>
</template>

<script setup lang="ts">
import NewNovel from "~/components/dialog/NewNovel.vue";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import DynamicDialog from "primevue/dynamicdialog";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Menubar from "primevue/menubar";
import Tag from "primevue/tag";
import Checkbox from "primevue/checkbox";

import { useToast } from "primevue/usetoast";
import { useDialog } from "primevue/usedialog";

import type {
  DataTablePageEvent,
  DataTableSortEvent,
  DataTableFilterEvent,
  DataTableFilterMetaData,
  DataTableSortMeta,
} from "primevue/datatable";
import type { MenuItem } from "primevue/menuitem";
import { FilterMatchMode } from "primevue/api";
import { sortMetaArrayToFormat, statusHandler } from "~/utils";

interface QueryParams {
  offset: number;
  limit: number;
  order_by?: string;
  id?: number;
  name?: string;
  nsfw?: boolean;
}

const defaultOrderBy: DataTableSortMeta[] = [{ field: "id", order: -1 }];
const filters = ref({
  id: { value: null, matchMode: FilterMatchMode.EQUALS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  nsfw: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const { t } = useI18n();
const toast = useToast();
const dialog = useDialog();

const loading = ref(false);
const queryParams = ref<QueryParams>({
  offset: 0,
  limit: 20,
  order_by: sortMetaArrayToFormat(defaultOrderBy),
});
const menuItems = ref<MenuItem[]>([
  { label: "添加条目", icon: "pi pi-plus", command: showNewItemDialog },
  { label: "刷新", icon: "pi pi-refresh", command: () => execute() },
]);

const { data, pending, error, execute } = useFetch<ListResponse<Novel>>(
  "/api/novels/item",
  {
    query: queryParams,
    server: false,
  }
);

function onDeleteItem(id: number) {
  $fetch
    .raw(`/api/novels/item/${id}`, {
      method: "DELETE",
      ignoreResponseError: true,
    })
    .catch(() => {
      toast.add({
        severity: "error",
        summary: t("shared.error"),
        detail: t("requestErrors.network"),
        life: 3000,
      });
    })
    .then((resp) => {
      if (resp) statusHandler(resp.status);
    })
    .finally(() => {
      execute();
      loading.value = false;
    });
}

function onPage(event: DataTablePageEvent) {
  queryParams.value = {
    ...queryParams.value,
    offset: event.first,
    order_by: sortMetaArrayToFormat(event.multiSortMeta ?? defaultOrderBy),
    id: (event.filters.id as DataTableFilterMetaData).value ?? undefined,
    name: (event.filters.name as DataTableFilterMetaData).value
      ? `%${(event.filters.name as DataTableFilterMetaData).value}%`
      : undefined,
    nsfw: (event.filters.nsfw as DataTableFilterMetaData).value,
  };

  execute();
}

function onSort(event: DataTableSortEvent) {
  queryParams.value = {
    ...queryParams.value,
    offset: event.first,
    order_by: sortMetaArrayToFormat(event.multiSortMeta ?? defaultOrderBy),
    id: (event.filters.id as DataTableFilterMetaData).value ?? undefined,
    name: (event.filters.name as DataTableFilterMetaData).value
      ? `%${(event.filters.name as DataTableFilterMetaData).value}%`
      : undefined,
    nsfw: (event.filters.nsfw as DataTableFilterMetaData).value,
  };

  execute();
}

function onFilter(event: DataTableFilterEvent) {
  queryParams.value = {
    ...queryParams.value,
    offset: event.first,
    order_by: sortMetaArrayToFormat(event.multiSortMeta ?? defaultOrderBy),
    id: (event.filters.id as DataTableFilterMetaData).value ?? undefined,
    name: (event.filters.name as DataTableFilterMetaData).value
      ? `%${(event.filters.name as DataTableFilterMetaData).value}%`
      : undefined,
    nsfw: (event.filters.nsfw as DataTableFilterMetaData).value,
  };
}

function showNewItemDialog() {
  dialog.open(NewNovel, {
    props: {
      header: "添加作品",
      modal: true,
      style: {
        width: "50rem",
        maxWidth: "100vw",
      },
    },
    onClose: (opt) => {
      // Inserted item id => opt.data.id
      if (opt?.type === "config-close") {
        execute();
      }
    },
  });
}

function showEditItemDialog(item: Novel) {
  dialog.open(NewNovel, {
    props: {
      header: "编辑作品",
      modal: true,
      style: {
        width: "50rem",
        maxWidth: "100vw",
      },
    },
    data: {
      edit: true,
      editItem: item,
    },
    onClose: (opt) => {
      // Inserted item id => opt.data.id
      if (opt?.type === "config-close") {
        execute();
      }
    },
  });
}
</script>
