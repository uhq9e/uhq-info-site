<template>
  <div class="flex flex:col gap:16">
    <div class="flex flex:col gap:4">
      <label :for="`${id}-title`" class="f:bold">标题</label>
      <InputText
        :input-id="`${id}-title`"
        v-model="title"
        v-bind="titleAttrs"
        :class="{ 'p-invalid': errors.title }"
        placeholder="标题"
        class="w:full"
      />
      <small class="p-error">{{ errors.title }}</small>
    </div>
    <div class="flex flex:col gap:4">
      <label :for="`${id}-description`" class="f:bold">简介</label>
      <Textarea
        :input-id="`${id}-description`"
        v-model="description"
        v-bind="descriptionAttrs"
        :input-class="{ 'p-invalid': errors.description }"
        placeholder="简介"
        class="w:full"
      />
      <small class="p-error">{{ errors.description }}</small>
    </div>
    <div class="flex flex:col gap:4">
      <label :for="`${id}-url`" class="f:bold">原址链接</label>
      <InputText
        :input-id="`${id}-url`"
        v-model="url"
        v-bind="urlAttrs"
        :class="{ 'p-invalid': errors.url }"
        placeholder="原址链接"
        class="w:full"
      />
      <small class="p-error">{{ errors.url }}</small>
    </div>
    <div class="flex flex:col gap:4">
      <label :for="`${id}-author_name`" class="f:bold">作者名</label>
      <InputText
        :input-id="`${id}-author_name`"
        v-model="authorName"
        v-bind="authorNameAttrs"
        :class="{ 'p-invalid': errors.author_name }"
        placeholder="作者名"
        class="w:full"
      />
      <small class="p-error">{{ errors.author_name }}</small>
    </div>
    <div class="flex flex:col gap:4">
      <label :for="`${id}-author_url`" class="f:bold">作者链接</label>
      <InputText
        :input-id="`${id}-author_url`"
        v-model="authorUrl"
        v-bind="authorUrlAttrs"
        :class="{ 'p-invalid': errors.author_url }"
        placeholder="作者链接"
        class="w:full"
      />
      <small class="p-error">{{ errors.author_url }}</small>
    </div>
    <div class="flex flex:col gap:4">
      <label :for="`${id}-nsfw`" class="f:bold">是否为NSFW</label>
      <Checkbox
        :input-id="`${id}-nsfw`"
        v-model="nsfw"
        v-bind="nsfwAttrs"
        :input-class="{ 'p-invalid': errors.nsfw }"
        :binary="true"
      />
      <small class="p-error">{{ errors.nsfw }}</small>
    </div>
    <div class="flex flex:col gap:4">
      <label :for="`${id}-tags`" class="f:bold">标签</label>
      <Chips
        :input-id="`${id}-tags`"
        v-model="tags"
        v-bind="tagsAttrs"
        :class="{ 'p-invalid': errors.tags }"
        :pt="{ container: { class: 'w:full' } }"
        placeholder="输入标签后按回车添加"
      />
      <small class="p-error">{{ errors.tags }}</small>
    </div>
    <div v-if="!isEdit" class="flex flex:col gap:4">
      <Button
        @click="setFile"
        label="上传文件"
        icon="pi pi-plus"
        :badge="file?.name"
        class="as:start"
      />
      <small class="p-error">{{ errors.file }}</small>
    </div>
    <Button
      @click="!isEdit ? onSubmit() : onEditSubmit()"
      :label="!isEdit ? '添加' : '修改'"
      :loading="uploading"
    />
  </div>
</template>

<script setup lang="ts">
import type { DynamicDialogInstance } from "primevue/dynamicdialogoptions";
import AutoComplete from "primevue/autocomplete";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Checkbox from "primevue/checkbox";
import Chips from "primevue/chips";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Menu from "primevue/menu";
import Tag from "primevue/tag";
import Textarea from "primevue/textarea";

import { UseObjectUrl } from "@vueuse/components";
import { urlToFavicon } from "~/utils";
import { toTypedSchema } from "@vee-validate/zod";
import type { PartialDeep } from "type-fest";
import { v4 } from "uuid";

import { UploadNovelItemSchema } from "~/utils/misc";

const id = v4();

const dialogRef = inject<Ref<DynamicDialogInstance>>("dialogRef");
const isEdit = (dialogRef?.value?.data?.edit ?? false) as boolean;
const editItem: Novel | undefined = dialogRef?.value?.data?.editItem;

if (isEdit && !editItem) {
  throw Error("编辑条目请传入item");
}

const form = useForm({
  validationSchema: toTypedSchema(UploadNovelItemSchema),
  initialValues: editItem ?? {
    nsfw: false,
  },
});

const { errors, defineField, handleSubmit, values } = form;

const [title, titleAttrs] = defineField("title");
const [description, descriptionAttrs] = defineField("description");
const [url, urlAttrs] = defineField("url");
const [authorName, authorNameAttrs] = defineField("author_name");
const [authorUrl, authorUrlAttrs] = defineField("author_url");
const [nsfw, nsfwAttrs] = defineField("nsfw");
const [tags, tagsAttrs] = defineField("tags");
const [file, fileAttrs] = defineField("file");

const uploading = ref(false);

function setFile() {
  let input = document.createElement("input");
  input.type = "file";
  input.accept = "application/pdf";
  input.onchange = (e) => {
    const files = (e?.target as HTMLInputElement)?.files;
    if (files) {
      file.value = files[0];
    }
  };
  input.click();
}

const onSubmit = handleSubmit(async (values) => {
  uploading.value = true;

  const uploadedFile = await $fetch<InsertResponse<number>>(
    "/api/storage/content/novel/item",
    {
      method: "POST",
      body: values.file,
    }
  );

  let insertedItem = await $fetch<InsertResponse<number>>("/api/novels/item", {
    method: "POST",
    body: {
      title: values.title,
      description: values.description,
      url: values.url,
      author_name: values.author_name,
      author_url: values.author_url,
      nsfw: values.nsfw,
      tags: values.tags,
      object_id: uploadedFile.id,
    },
  });

  dialogRef?.value.close(insertedItem);

  uploading.value = false;
});

const onEditSubmit = async () => {
  uploading.value = true;

  let updatedItem = await $fetch<UpdateResponse<number>>(
    `/api/novels/item/${editItem?.id}`,
    {
      method: "PUT",
      body: {
        title: values.title,
        description: values.description,
        url: values.url,
        author_name: values.author_name,
        author_url: values.author_url,
        nsfw: values.nsfw,
        tags: values.tags,
      },
    }
  );

  uploading.value = false;

  dialogRef?.value.close(updatedItem);
};

defineExpose({
  form,
});
</script>
