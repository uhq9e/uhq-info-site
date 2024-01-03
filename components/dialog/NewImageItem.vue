<template>
  <div class="flex flex:col gap:8">
    <Dialog
      v-model:visible="importDialogVisible"
      header="导入"
      :pt="{ root: { class: 'w:50rem max-w:100vw' } }"
      modal
    >
      <Textarea
        v-model="importJson"
        v-bind="importJsonAttrs"
        :class="[{ 'p-invalid': errors.json }, 'w:full h:35vh']"
      />
      <small class="p-error">{{ errors.json }}</small>
      <template #footer>
        <Button
          label="导入"
          icon="pi pi-download"
          @click="onImportDialogSubmit"
        />
      </template>
    </Dialog>
    <Menubar v-if="!isEdit" :model="menuItems" />
    <TabView
      v-model:active-index="activeIndex"
      :pt="{ panelContainer: { class: 'px:0' } }"
      scrollable
    >
      <TabPanel
        v-for="uploadItem in pendingUploadItems"
        :pt="{ headerAction: { class: 'py:8' } }"
      >
        <template #header>
          <div class="f:bold flex flex:row flex:nowrap white-space:nowrap_*">
            <span class="mr:4" :style="{ color: `#${uploadItem.id.slice(-6)}` }"
              >●</span
            >
            <span>条目</span>
            <span v-if="uploading" class="ml:4">
              <span v-if="!uploadedItems.includes(uploadItem.id)" class="f:red"
                >上传中</span
              >
              <span v-else class="f:green-60">上传完毕</span>
            </span>
          </div>
        </template>
        <BlockUI :blocked="uploading">
          <DialogNewImageItemBase
            :key="uploadItem.id"
            :initial-value="uploadItem.initialValue"
            ref="uploadItemInstances"
          />
        </BlockUI>
      </TabPanel>
    </TabView>
    <Button
      @click="onSubmit"
      :label="!isEdit ? '添加' : '修改'"
      :loading="uploading"
    />
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import Textarea from "primevue/textarea";
import Menubar from "primevue/menubar";
import BlockUI from "primevue/blockui";

import type { DynamicDialogInstance } from "primevue/dynamicdialogoptions";
import type { MenuItem } from "primevue/menuitem";
import type { ImportImageItem } from "~/utils/misc";
import type { PartialDeep } from "type-fest";
import { v4 } from "uuid";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import NewImageItemBase from "./NewImageItemBase.vue";
import AuthorLinkType from "~/utils/authorLinkType";
import { ImportImageItemSchema, ImportImageItemsSchema } from "~/utils/misc";
import { Toast } from "~/utils";

const dialogRef = inject<Ref<DynamicDialogInstance>>("dialogRef");
const isEdit = (dialogRef?.value?.data?.edit ?? false) as boolean;
const editItems: ImageItem[] | undefined = dialogRef?.value?.data?.editItems;

const authorList = useState<Author[] | undefined>(
  "new-image-item-author-list",
  () => undefined
);
const authorListPending = useState(
  "new-image-item-author-list-pending",
  () => false
);

if (!authorList.value) {
  execute();
}

if (isEdit && editItems === undefined) {
  throw Error("编辑条目请传入items");
}

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      json: z.string().refine((v) => {
        try {
          return ImportImageItemsSchema.safeParse(JSON.parse(v)).success;
        } catch {
          return false;
        }
      }),
    })
  ),
});

const [importJson, importJsonAttrs] = defineField("json");

interface PendingUploadItem {
  id: string;
  initialValue?: PartialDeep<UploadItem>;
}

const menuItems = ref<MenuItem[]>([
  {
    icon: "pi pi-plus",
    label: "添加",
    command: newTab,
  },
  {
    icon: "pi pi-minus",
    label: "删除",
    command: () => removeTab(activeIndex.value),
    disabled: () => pendingUploadItems.value.length <= 1,
  },
  {
    icon: "pi pi-download",
    label: "导入",
    command: () => (importDialogVisible.value = true),
  },
]);
const uploading = ref(false);
const pendingUploadItems = ref<PendingUploadItem[]>([]);
const uploadedItems = ref<string[]>([]);
const uploadItemInstances = ref<InstanceType<typeof NewImageItemBase>[]>([]);
const activeIndex = ref(0);
const importDialogVisible = ref(false);

const editIds = ref<number[]>([]);

if (isEdit && editItems) {
  for (const item of editItems) {
    editIds.value = [...editIds.value, item.id];
    pendingUploadItems.value = [
      ...pendingUploadItems.value,
      {
        id: v4(),
        initialValue: {
          date: new Date(item.date),
          author: item.author,
          urls: item.urls,
          nsfw: item.nsfw,
          images: [],
        },
      },
    ];
  }
} else {
  pendingUploadItems.value = [{ id: v4() }];
}

async function execute() {
  authorListPending.value = true;
  authorList.value = (
    await $fetch<ListResponse<Author>>("/api/authors/all")
  ).items;
  authorListPending.value = false;
}

function newTab() {
  pendingUploadItems.value.splice(activeIndex.value + 1, 0, { id: v4() });
  activeIndex.value++;
}

function removeTab(index: number) {
  if (activeIndex.value === pendingUploadItems.value.length - 1) {
    activeIndex.value--;
  }
  pendingUploadItems.value = pendingUploadItems.value.filter(
    (_, i) => i !== index
  );
}

const onSubmit = async () => {
  const validationResults = await Promise.all(
    uploadItemInstances.value.map((v) => v.form.validate())
  );

  for (const entry of Object.entries(validationResults)) {
    if (!entry[1].valid) {
      activeIndex.value = parseInt(entry[0]);
      return;
    }
  }

  const itemValues = validationResults.map((v) => v.values);

  const returnItems: (InsertResponse<number> | UpdateResponse<number>)[] = [];

  uploading.value = true;
  for (const i in itemValues) {
    const pendingItem = pendingUploadItems.value[i];

    const values = itemValues[i];
    if (!values) continue;

    if (!isEdit) {
      let pendingLocalItems: File[] = [];
      let pendingWebItems: string[] = [];

      for (const file of values.images) {
        if (file.type === "local") {
          pendingLocalItems.push(file.file);
        } else {
          pendingWebItems.push(file.url);
        }
      }

      let imageIds: string[] = [];

      try {
        if (pendingLocalItems.length) {
          const formData = new FormData();

          for (const file of pendingLocalItems) {
            formData.append("files", file);
          }

          let result = await $fetch<InsertResponse<string[]>>(
            "/api/storage/image/item_multi",
            {
              method: "POST",
              body: formData,
            }
          );
          imageIds = [...imageIds, ...result.id];
        }
        if (pendingWebItems.length) {
          let result = await $fetch<InsertResponse<string[]>>(
            "/api/storage/image/item_from_web_multi",
            {
              method: "POST",
              body: pendingWebItems.join(","),
            }
          );
          imageIds = [...imageIds, ...result.id];
        }
      } catch (error) {
        Toast.error("图片上传阶段失败，请检查错误并重试", error);
        uploading.value = false;
        return;
      }

      try {
        let insertedItem = await $fetch<InsertResponse<number>>(
          "/api/images/item",
          {
            method: "POST",
            body: {
              author_id: (values.author as Author).id,
              local_file_ids: imageIds,
              urls: values.urls,
              date: formatDate(values.date),
              nsfw: values.nsfw,
            },
          }
        );

        uploadedItems.value = [...uploadedItems.value, pendingItem.id];
        returnItems.push(insertedItem);
      } catch (error) {
        Toast.error("提交阶段失败，请检查错误并重试", error);
        uploading.value = false;
        return;
      }
    } else {
      try {
        let updatedItem = await $fetch<UpdateResponse<number>>(
          `/api/images/item/${editIds.value[i]}`,
          {
            method: "PUT",
            body: {
              author_id: (values.author as Author).id,
              urls: values.urls,
              date: formatDate(values.date),
              nsfw: values.nsfw,
            },
          }
        );

        uploadedItems.value = [...uploadedItems.value, pendingItem.id];
        returnItems.push(updatedItem);
      } catch (error) {
        Toast.error("提交阶段失败，请检查错误并重试", error);
        uploading.value = false;
        return;
      }
    }
  }

  dialogRef?.value.close(returnItems);
  uploading.value = false;
};

const onImportDialogSubmit = handleSubmit((values) => {
  const importItemsOrig: ImportImageItem[] = JSON.parse(values.json);

  let importItems: ImportImageItem[];

  try {
    importItems = z.array(ImportImageItemSchema).parse(importItemsOrig);
  } catch (error) {
    throw Error("解析JSON失败");
  }

  if (importItems) {
    pendingUploadItems.value = [];
  }

  for (const item of importItems) {
    const matchedAuthor = authorList.value?.find((v) => {
      return v.urls?.some((authorUrl) => {
        const authorUrlType = AuthorLinkType.matchByUrl(authorUrl);
        return item.authorUrls?.some((targetUrl) => {
          const targetUrlType = AuthorLinkType.matchByUrl(targetUrl);
          return (
            authorUrlType.groups?.user &&
            targetUrlType.groups?.user &&
            authorUrlType.groups.user === targetUrlType.groups.user
          );
        });
      });
    });

    pendingUploadItems.value = [
      ...pendingUploadItems.value,
      {
        id: v4(),
        initialValue: {
          date: item.date ? new Date(item.date) : undefined,
          author: matchedAuthor,
          urls: item.urls,
          nsfw: item.nsfw ?? false,
          images: item.imageUrls?.map<WebImage>((url) => ({
            type: "web",
            url: url,
          })),
        },
      },
    ];
  }

  importJson.value = "";
  importDialogVisible.value = false;
});
</script>
