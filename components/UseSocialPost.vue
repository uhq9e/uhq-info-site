<template>
  <slot :social-post-type="socialPostType" />
</template>

<script setup lang="ts">
import SocialPostType from "@/utils/socialPostType";

const props = defineProps<{
  url: string;
}>();

const socialPostType = ref<SocialPostType>(
  SocialPostType.matchByUrl(props.url)
);
</script>
