<template>
  <form @submit="onSubmit" class="flex flex:col gap:16">
    <div class="flex flex:col gap:4">
      <label for="date" class="f:bold">选择日期</label>
      <Calendar
        input-id="date"
        v-model="date"
        v-bind="dateAttrs"
        :input-class="{ 'p-invalid': errors.date }"
        date-format="yy-mm-dd"
        class="w:full"
      />
      <small class="p-error">{{ errors.date }}</small>
    </div>
    <div class="flex flex:col gap:4">
      <label for="author" class="f:bold">选择作者</label>
      <div class="flex flex:row gap:4 w:full">
        <AutoComplete
          v-model="author"
          v-bind="authorAttrs"
          option-label="name"
          input-id="author"
          placeholder="输入名称查找作者"
          :suggestions="filteredAuthors"
          :loading="pending"
          :disabled="pending"
          :input-class="['w:full', { 'p-invalid': errors.author }]"
          class="flex-grow:1"
          @complete="search"
        />
        <Button @click="addAuthor" icon="pi pi-plus" />
      </div>
      <small class="p-error">{{ errors.author }}</small>
    </div>
    <div class="flex flex:col gap:4">
      <label for="urls" class="f:bold">原址链接</label>
      <Chips
        v-model="urls"
        v-bind="urlsAttrs"
        placeholder="输入网址后按回车添加"
        input-id="urls"
        :class="{ 'p-invalid': errors.urls }"
        :pt="{ container: { class: 'w:full' } }"
      >
        <template #chip="slotProps">
          <UseSocialPost :url="slotProps.value" v-slot="slotProps_">
            <div class="flex flex:row align-items:center gap:4">
              <Tag>
                <img
                  :src="urlToFavicon(slotProps.value) ?? 'favicon.ico'"
                  alt="favicon"
                  class="h:16 aspect:1/1 mr:2"
                />
                {{ slotProps_.socialPostType.key }}
              </Tag>
              <span>{{
                slotProps_.socialPostType.toDisplay() || slotProps.value
              }}</span>
            </div>
          </UseSocialPost>
        </template>
      </Chips>
      <small class="p-error">{{ errors.urls }}</small>
    </div>
    <div class="flex flex:col gap:4">
      <label for="nsfw" class="f:bold">是否为NSFW</label>
      <Checkbox
        input-id="nsfw"
        v-model="nsfw"
        v-bind="nsfwAttrs"
        :input-class="{ 'p-invalid': errors.nsfw }"
        :binary="true"
      />
      <small class="p-error">{{ errors.nsfw }}</small>
    </div>
    <div class="flex flex:col gap:4">
      <Button
        @click="addImage"
        label="上传图片"
        icon="pi pi-plus"
        class="as:start"
        :badge="images?.length.toString()"
      />
      <div
        v-if="images?.length"
        class="w:full h:150 py:8 flex flex:row gap:8 overflow-x:auto"
      >
        <UseObjectUrl
          v-for="(file, i) in images"
          :key="i"
          v-slot="url"
          :object="(file as File)"
        >
          <div
            class="h:full r:6 aspect:1/1 bg:center bg:cover shadow-2 image-container"
            :style="`background-image: url(${url.value})`"
          >
            <div
              class="rel w:full h:full bg:#00000020 ~opacity|200ms image-actions"
            >
              <Button
                @click="removeImage(i)"
                icon="pi pi-trash"
                severity="danger"
                text
                rounded
                size="small"
                class="abs top:10 right:10 bg:white"
              />
            </div>
          </div>
        </UseObjectUrl>
      </div>
      <small class="p-error">{{ errors.images }}</small>
    </div>
    <Button type="submit" label="添加" :loading="uploading" />
  </form>
</template>

<style scoped>
.image-container:hover .image-actions {
  opacity: 1;
}
.image-actions {
  opacity: 0;
}
</style>

<script setup lang="ts">
import type { AutoCompleteCompleteEvent } from "primevue/autocomplete";
import type { DynamicDialogInstance } from "primevue/dynamicdialogoptions";
import { UseObjectUrl } from "@vueuse/components";
import { formatDate, urlToFavicon } from "~/utils";
import NewAuthor from "./NewAuthor.vue";
import * as yup from "yup";

import { useDialog } from "primevue/usedialog";

const dialog = useDialog();

const dialogRef = inject<Ref<DynamicDialogInstance>>("dialogRef");

const { data, pending, error, execute } = useFetch<ListResponse<Author>>(
  "/api/authors/all",
  {
    server: false,
  }
);

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      date: yup.date().required().default(new Date()),
      author: yup.object<Author>().required(),
      urls: yup.array().of(yup.string().url()).default([]),
      nsfw: yup.bool().required().default(false),
      images: yup.array().of(yup.mixed()).default([]),
    })
  ),
});

const [date, dateAttrs] = defineField("date");
const [author, authorAttrs] = defineField("author");
const [urls, urlsAttrs] = defineField("urls");
const [nsfw, nsfwAttrs] = defineField("nsfw");
const [images, imagesAttrs] = defineField("images");

const filteredAuthors = ref<Author[]>([]);
const uploading = ref(false);

function search(event: AutoCompleteCompleteEvent) {
  if (data.value) {
    if (event.query.trim().length) {
      filteredAuthors.value = data.value.items.filter((author) => {
        return author.name.toLowerCase().includes(event.query.toLowerCase());
      });
    } else {
      filteredAuthors.value = [...data.value.items];
    }
  }
}

function addImage() {
  let input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.multiple = true;
  input.onchange = (e) => {
    const files = (e?.target as HTMLInputElement)?.files;
    if (files) {
      images.value = [...(images.value ?? []), ...files];
    }
  };
  input.click();
}

function removeImage(index: number) {
  images.value = images.value?.filter((_, i) => i !== index);
}

const onSubmit = handleSubmit(async (values) => {
  uploading.value = true;

  let requests: Promise<InsertResponse<string>>[] = [];
  for (const file of values.images) {
    if (file) {
      const f = file as File;
      requests.push(
        $fetch<InsertResponse<string>>("/api/storage/item", {
          method: "POST",
          body: f,
        })
      );
    }
  }

  let imageIds = (await Promise.all(requests)).map((v) => v.id);

  let insertedItem = await $fetch<InsertResponse<number>>("/api/images/item", {
    method: "POST",
    body: {
      author_id: (values.author as Author).id,
      local_file_ids: imageIds,
      urls: values.urls,
      date: formatDate(values.date),
      nsfw: values.nsfw,
    },
  });

  uploading.value = false;

  dialogRef?.value.close(insertedItem);
});

function addAuthor() {
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
</script>
