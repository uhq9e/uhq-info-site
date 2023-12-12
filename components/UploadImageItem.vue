<template>
  <div
    class="h:full r:6 aspect:1/1 bg:center bg:cover shadow-2 image-container"
    :style="`background-image: url(${previewUrl})`"
  >
    <div class="rel w:full h:full bg:#00000020 ~opacity|200ms image-actions">
      <Button
        @click="$emit('remove')"
        icon="pi pi-trash"
        severity="danger"
        text
        rounded
        size="small"
        class="abs top:10 right:10 bg:white"
      />
      <Tag
        :value="item.type"
        :title="item.type === 'local' ? item.file.name : item.url"
        class="abs bottom:10 left:10"
      />
    </div>
  </div>
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
defineProps<{
  item: UploadImage;
  previewUrl?: string;
}>();

defineEmits<{
  remove: [];
}>();
</script>
