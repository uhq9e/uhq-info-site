<template>
  <form @submit="onSubmit" class="flex flex:col gap:16">
    <div class="flex flex:col gap:4">
      <label for="author_name" class="f:bold">作者名</label>
      <InputText
        id="author_name"
        v-model="name"
        v-bind="nameAttrs"
        :input-class="{ 'p-invalid': errors.name }"
        class="w:full"
      />
      <small class="p-error">{{ errors.name }}</small>
    </div>
    <div class="flex flex:col gap:4">
      <label for="author_urls" class="f:bold">社交链接</label>
      <Chips
        v-model="urls"
        v-bind="urlsAttrs"
        placeholder="输入网址后按回车添加"
        input-id="author_urls"
        :class="{ 'p-invalid': errors.urls }"
        :pt="{ container: { class: 'w:full' } }"
      >
        <template #chip="slotProps">
          <AuthorLinkTag :url="slotProps.value" />
        </template>
      </Chips>
      <small class="p-error">{{ errors.urls }}</small>
    </div>
    <Button
      type="submit"
      :label="!isEdit ? '添加' : '修改'"
      :loading="uploading"
    />
  </form>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import Chips from "primevue/chips";
import Button from "primevue/button";

import type { DynamicDialogInstance } from "primevue/dynamicdialogoptions";

import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const dialogRef = inject<Ref<DynamicDialogInstance>>("dialogRef");
const isEdit = (dialogRef?.value?.data?.edit ?? false) as boolean;
const item: Author | undefined = dialogRef?.value?.data?.item;

if (isEdit && !item) {
  throw Error("编辑条目请传入item");
}

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      name: z.string(),
      urls: z.array(z.string()).min(1).default([]),
    })
  ),
});

const [name, nameAttrs] = defineField("name");
const [urls, urlsAttrs] = defineField("urls");

if (isEdit && item) {
  name.value = item.name;
  urls.value = item.urls;
}

const uploading = ref(false);

const onSubmit = handleSubmit(async (values) => {
  uploading.value = true;

  if (!isEdit) {
    let insertedItem = await $fetch<InsertResponse<number>>(
      "/api/authors/item",
      {
        method: "POST",
        body: {
          name: values.name,
          urls: values.urls,
        },
      }
    );

    dialogRef?.value.close(insertedItem);
  } else {
    let updatedItem = await $fetch<UpdateResponse<number>>(
      `/api/authors/item/${item?.id}`,
      {
        method: "PUT",
        body: {
          name: values.name,
          urls: values.urls,
        },
      }
    );

    dialogRef?.value.close(updatedItem);
  }

  uploading.value = false;
});
</script>
