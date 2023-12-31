<template>
  <div class="h:full flex flex:column">
    <Menubar :model="menuItems" :pt="{ root: { class: 'border:none' } }" />
    <DataTable
      :value="data?.items ?? []"
      :first="queryParams.offset"
      :rows="queryParams.limit"
      :loading="pending"
      :total-records="data?.count ?? 0"
      :multi-sort-meta="defaultOrderBy"
      sort-mode="multiple"
      v-model:filters="filters"
      :globalFilterFields="['id', 'author_id', 'date', 'nsfw']"
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
      <Column header="图片数量">
        <template #body="slotProps">
          {{ slotProps.data.local_files.length }}
        </template>
      </Column>
      <Column header="预览">
        <template #body="slotProps">
          <div
            v-if="slotProps.data.local_files.length"
            :class="`aspect:1/1 w:6rem shadow-2 r:6 bg:center bg:cover bg:url('${SiteData.objectUrl(
              slotProps.data.local_files[0].path
            )}')`"
          ></div>
        </template>
      </Column>
      <Column field="author_id" header="作者" :show-filter-match-modes="false">
        <template #body="slotProps">
          <AuthorPanel :author="slotProps.data.author" v-slot="slot">
            <Tag
              class="cursor:pointer"
              :value="slotProps.data.author.name"
              @click="slot.op?.show($event)"
            ></Tag>
          </AuthorPanel>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputNumber
            v-model="filterModel.value"
            @keydown.enter="filterCallback()"
            :useGrouping="false"
            class="p-column-filter"
            placeholder="检索作者ID"
          />
        </template>
      </Column>
      <Column
        field="date"
        header="日期"
        :show-filter-match-modes="false"
        sortable
      >
        <template #filter="{ filterModel, filterCallback }">
          <Calendar
            v-model="filterModel.value"
            @keydown.enter="filterCallback()"
            date-format="yy-mm-dd"
            class="p-column-filter"
            placeholder="检索日期"
          />
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
    <Toast />
    <DynamicDialog />
  </div>
</template>

<script setup lang="ts">
import NewImageItem from "@/components/dialog/NewImageItem.vue";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import DynamicDialog from "primevue/dynamicdialog";
import InputNumber from "primevue/inputnumber";
import Menubar from "primevue/menubar";
import Tag from "primevue/tag";
import TriStateCheckbox from "primevue/tristatecheckbox";
import Toast from "primevue/toast";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

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
import { sortMetaArrayToFormat, statusHandler, SiteData } from "~/utils";

interface QueryParams {
  offset: number;
  limit: number;
  order_by?: string;
  id?: number;
  date?: string;
  author_id?: number;
  nsfw?: boolean;
}

const defaultOrderBy: DataTableSortMeta[] = [{ field: "id", order: -1 }];
const filters = ref({
  id: { value: null, matchMode: FilterMatchMode.EQUALS },
  author_id: { value: null, matchMode: FilterMatchMode.EQUALS },
  date: { value: null, matchMode: FilterMatchMode.EQUALS },
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

const { data, pending, error, execute } = useFetch<ListResponse<ImageItem>>(
  "/api/images/item",
  {
    query: queryParams,
    server: false,
  }
);

function onDeleteItem(id: number) {
  loading.value = true;
  $fetch
    .raw(`/api/images/item/${id}`, {
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
    author_id:
      (event.filters.author_id as DataTableFilterMetaData).value ?? undefined,
    date:
      formatDate((event.filters.date as DataTableFilterMetaData).value) ??
      undefined,
    nsfw: (event.filters.nsfw as DataTableFilterMetaData).value ?? undefined,
  };

  execute();
}

function onSort(event: DataTableSortEvent) {
  queryParams.value = {
    ...queryParams.value,
    offset: event.first,
    order_by: sortMetaArrayToFormat(event.multiSortMeta ?? defaultOrderBy),
    id: (event.filters.id as DataTableFilterMetaData).value ?? undefined,
    author_id:
      (event.filters.author_id as DataTableFilterMetaData).value ?? undefined,
    date:
      formatDate((event.filters.date as DataTableFilterMetaData).value) ??
      undefined,
    nsfw: (event.filters.nsfw as DataTableFilterMetaData).value ?? undefined,
  };

  execute();
}

function onFilter(event: DataTableFilterEvent) {
  queryParams.value = {
    ...queryParams.value,
    offset: event.first,
    order_by: sortMetaArrayToFormat(event.multiSortMeta ?? defaultOrderBy),
    id: (event.filters.id as DataTableFilterMetaData).value ?? undefined,
    author_id:
      (event.filters.author_id as DataTableFilterMetaData).value ?? undefined,
    date:
      formatDate((event.filters.date as DataTableFilterMetaData).value) ??
      undefined,
    nsfw: (event.filters.nsfw as DataTableFilterMetaData).value ?? undefined,
  };
}

function showNewItemDialog() {
  dialog.open(NewImageItem, {
    props: {
      header: "添加条目",
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

function showEditItemDialog(item: ImageItem) {
  dialog.open(NewImageItem, {
    props: {
      header: "编辑条目",
      modal: true,
      style: {
        width: "50rem",
        maxWidth: "100vw",
      },
    },
    data: {
      edit: true,
      editItems: [item],
    },
    onClose: (opt) => {
      // Updated item id => opt.data.id
      if (opt?.type === "config-close") {
        execute();
      }
    },
  });
}
</script>
