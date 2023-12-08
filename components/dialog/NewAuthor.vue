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
          <div class="flex flex:row align-items:center gap:4">
            <Tag
              ><img
                :src="urlToFavicon(slotProps.value) ?? 'favicon.ico'"
                alt="favicon"
                class="h:16 aspect:1/1 mr:2"
              />{{ urlToHostname(slotProps.value) ?? "unknown" }}</Tag
            >
          </div>
        </template>
      </Chips>
      <small class="p-error">{{ errors.urls }}</small>
    </div>
    <Button type="submit" label="添加" :loading="uploading" />
  </form>
</template>

<script setup lang="ts">
import type { DynamicDialogInstance } from "primevue/dynamicdialogoptions";

import * as yup from "yup";

const dialogRef = inject<Ref<DynamicDialogInstance>>("dialogRef");

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      name: yup.string().required(),
      urls: yup.array().of(yup.string()).required().default([]),
    })
  ),
});

const [name, nameAttrs] = defineField("name");
const [urls, urlsAttrs] = defineField("urls");

const uploading = ref(false);

const onSubmit = handleSubmit(async (values) => {
  uploading.value = true;

  let insertedItem = await $fetch<InsertResponse<number>>("/api/authors/item", {
    method: "POST",
    body: {
      name: values.name,
      urls: values.urls,
    },
  });

  uploading.value = false;

  dialogRef?.value.close(insertedItem);
});
</script>
