<template>
  <div class="flex flex:col gap:16">
    <div class="flex flex:col gap:4">
      <label :for="`${id}-date`" class="f:bold">选择日期</label>
      <Calendar
        :input-id="`${id}-date`"
        v-model="date"
        v-bind="dateAttrs"
        :input-class="{ 'p-invalid': errors.date }"
        date-format="yy-mm-dd"
        class="w:full"
      />
      <small class="p-error">{{ errors.date }}</small>
    </div>
    <div class="flex flex:col gap:4">
      <label :for="`${id}-author`" class="f:bold">选择作者</label>
      <div class="flex flex:row gap:4 w:full">
        <AutoComplete
          v-model="author"
          v-bind="authorAttrs"
          option-label="name"
          :input-id="`${id}-author`"
          placeholder="输入名称查找作者"
          :suggestions="filteredAuthors"
          :loading="authorListPending"
          :disabled="authorListPending"
          :input-class="['w:full', { 'p-invalid': errors.author }]"
          class="flex-grow:1"
          @complete="search"
        />
        <Button @click="execute()" icon="pi pi-refresh" />
        <Button @click="addAuthor" icon="pi pi-plus" />
      </div>
      <small class="p-error">{{ errors.author }}</small>
    </div>
    <div class="flex flex:col gap:4">
      <label :for="`${id}-urls`" class="f:bold">原址链接</label>
      <Chips
        v-model="urls"
        v-bind="urlsAttrs"
        placeholder="输入网址后按回车添加"
        :input-id="`${id}-urls`"
        :class="{ 'p-invalid': errors.urls }"
        :pt="{ container: { class: 'w:full' } }"
      >
        <template #chip="slotProps">
          <UseSocialPost :url="slotProps.value" v-slot="slotProps_">
            <div class="flex flex:row align-items:center gap:4">
              <NuxtLink :href="slotProps.value" target="_blank">
                <Tag>
                  <NuxtImg
                    :src="urlToFavicon(slotProps.value) ?? 'favicon.ico'"
                    alt="favicon"
                    class="h:16 aspect:1/1 mr:2"
                  />
                  {{ slotProps_.socialPostType.obj.key }}
                </Tag>
              </NuxtLink>
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
      <div class="as:start">
        <Button
          @click="uploadImageMenu?.toggle($event)"
          label="上传图片"
          icon="pi pi-plus"
          :badge="images?.length.toString()"
        />
        <Menu
          ref="uploadImageMenu"
          :model="uploadImageMenuItems"
          :popup="true"
        />
      </div>
      <div
        v-if="images?.length"
        class="w:full h:150 py:8 flex flex:row gap:8 overflow-x:auto"
      >
        <div v-for="(file, i) in images" :key="i">
          <UseObjectUrl
            v-if="(file as UploadImage).type === 'local'"
            v-slot="url"
            :object="(file as LocalImage).file"
          >
            <UploadImageItem
              :item="(file as LocalImage)"
              :preview-url="url.value"
              @remove="removeImage(i)"
            />
          </UseObjectUrl>
          <UploadImageItem
            v-else
            :item="(file as UploadImage)"
            :preview-url="(file as WebImage).url"
            @remove="removeImage(i)"
          />
        </div>
      </div>
      <small class="p-error">{{ errors.images }}</small>
      <Dialog v-model:visible="webImageDialogvisible" modal header="网络图片">
        <div class="flex flex:col gap:4">
          <label :for="`${id}-web_image_url`" class="f:bold">图片链接</label>
          <InputText
            v-model="webImageUrl"
            :id="`${id}-web_image_url`"
            v-bind="webImageUrlAttrs"
          />
          <small class="p-error">{{ webImageUrlForm.errors.value.url }}</small>
        </div>
        <template #footer>
          <Button
            @click="onWebImageUrlSubmit"
            label="确认"
            icon="pi pi-check"
            :disabled="!!webImageUrlForm.errors.value.url"
          />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import Chips from "primevue/chips";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Menu from "primevue/menu";
import Tag from "primevue/tag";

import type { AutoCompleteCompleteEvent } from "primevue/autocomplete";
import type { MenuItem } from "primevue/menuitem";
import { UseObjectUrl } from "@vueuse/components";
import { urlToFavicon } from "~/utils";
import NewAuthor from "./NewAuthor.vue";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { v4 } from "uuid";
import { useDialog } from "primevue/usedialog";
import type { PartialDeep } from "type-fest";

import AuthorLinkType from "~/utils/authorLinkType";

const props = defineProps<{
  key?: string;
  initialValue?: PartialDeep<UploadItem>;
}>();

const id = props.key ?? v4();

const dialog = useDialog();

const dateState = useState("new-image-item-date", () => new Date());
const authorList = useState<Author[] | undefined>(
  "new-image-item-author-list",
  () => undefined
);
const authorListPending = useState(
  "new-image-item-author-list-pending",
  () => false
);

if (authorList.value === undefined && !authorListPending.value) {
  execute().then();
}

const form = useForm({
  validationSchema: toTypedSchema(UploadItemSchema),
  initialValues: props.initialValue ?? {
    date: dateState.value,
    urls: [],
    nsfw: false,
    images: [],
  },
});

const { errors, defineField } = form;

const webImageUrlForm = useForm({
  validationSchema: toTypedSchema(
    z.object({
      url: z.string().url(),
    })
  ),
});

const [date, dateAttrs] = defineField("date");
const [author, authorAttrs] = defineField("author");
const [urls, urlsAttrs] = defineField("urls");
const [nsfw, nsfwAttrs] = defineField("nsfw");
const [images, imagesAttrs] = defineField("images");

const [webImageUrl, webImageUrlAttrs] = webImageUrlForm.defineField("url");

watch(
  () => date.value,
  (v) => {
    dateState.value = v ?? new Date();
  }
);

const filteredAuthors = ref<Author[]>([]);
const uploadImageMenu = ref<Menu>();
const uploadImageMenuItems = ref<MenuItem[]>([
  {
    label: "图源",
    items: [
      {
        label: "本地",
        icon: "pi pi-upload",
        command: () => {
          addImage();
        },
      },
      {
        label: "网络",
        icon: "pi pi-link",
        command: () => {
          webImageDialogvisible.value = true;
        },
      },
    ],
  },
]);
const webImageDialogvisible = ref(false);

async function execute() {
  authorListPending.value = true;
  authorList.value = (
    await $fetch<ListResponse<Author>>("/api/authors/all")
  ).items;
  authorListPending.value = false;
}

function search(event: AutoCompleteCompleteEvent) {
  if (!authorList.value) return;

  const query = event.query.trim().toLowerCase();
  if (query.length) {
    filteredAuthors.value = authorList.value.filter((author) => {
      const matchUrl = author.urls?.some((url) =>
        AuthorLinkType.matchByUrl(url)
          ?.groups?.user?.toLowerCase()
          .includes(query)
      );
      const matchName = author.name.toLowerCase().includes(query);
      return matchUrl || matchName;
    });
  } else {
    filteredAuthors.value = [...authorList.value];
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
      images.value = [
        ...(images.value ?? []),
        ...Array.from(files).map<LocalImage>((f) => ({
          type: "local",
          file: f,
        })),
      ];
    }
  };
  input.click();
}

function removeImage(index: number) {
  images.value = images.value?.filter((_, i) => i !== index);
}

const onWebImageUrlSubmit = webImageUrlForm.handleSubmit((values) => {
  const struct: UploadImage = {
    type: "web",
    url: values.url,
  };

  images.value = [...(images.value ?? []), struct];
  webImageDialogvisible.value = false;
  webImageUrl.value = "";
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
    onClose: async (opt) => {
      // Inserted item id => opt.data.id
      if (opt?.type === "config-close") {
        await execute();
      }
    },
  });
}

defineExpose({
  form,
});
</script>
