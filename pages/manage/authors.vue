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
      :globalFilterFields="['id', 'name']"
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
      <Column
        field="name"
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
      <Column field="urls" header="社交链接">
        <template #body="slotProps">
          <div class="flex flex:row flex:wrap gap:4">
            <AuthorLinkTag v-for="url in slotProps.data.urls" :url="url" />
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
            <Button
              @click="onDeleteItem(slotProps.data.id)"
              icon="pi pi-trash"
              size="small"
              severity="danger"
              :loading="loading"
              text
            />
          </div>
        </template>
      </Column>
    </DataTable>
    <Toast />
    <ConfirmDialog />
    <DynamicDialog />
  </div>
</template>

<script setup lang="ts">
import NewAuthor from "~/components/dialog/NewAuthor.vue";

import { useConfirm } from "primevue/useconfirm";
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
}

const defaultOrderBy: DataTableSortMeta[] = [{ field: "id", order: -1 }];
const filters = ref({
  id: { value: null, matchMode: FilterMatchMode.EQUALS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const { t } = useI18n();
const confirm = useConfirm();
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

const { data, pending, error, execute } = useFetch<ListResponse<Author>>(
  "/api/authors/item",
  {
    query: queryParams,
    server: false,
  }
);

function onDeleteItem(id: number) {
  confirm.require({
    message: "你是否确定要删除？",
    header: "确认删除",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger p-button-text",
    rejectClass: "p-button",
    accept: () => {
      loading.value = true;
      $fetch
        .raw(`/api/authors/item/${id}`, {
          method: "DELETE",
          ignoreResponseError: true,
        })
        .then((resp) => {
          statusHandler(resp.status, () => {
            execute();
          });
        })
        .catch(() => {
          toast.add({
            severity: "error",
            summary: t("shared.error"),
            detail: t("requestErrors.network"),
            life: 3000,
          });
        })
        .finally(() => {
          loading.value = false;
        });
    },
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
  };
}

function showNewItemDialog() {
  dialog.open(NewAuthor, {
    props: {
      header: "添加作者",
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

function showEditItemDialog(item: Author) {
  dialog.open(NewAuthor, {
    props: {
      header: "编辑作者",
      modal: true,
      style: {
        width: "50rem",
        maxWidth: "100vw",
      },
    },
    data: {
      edit: true,
      item: item,
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
