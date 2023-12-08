<template>
  <slot :social-post-type="socialPostType" />
</template>

<script setup lang="ts">
import type { SocialPostType } from "@/utils/index";
import { matchSocialPostByUrl } from "@/utils/index";

const props = defineProps<{
  url: string;
}>();

const socialPostType = ref<SocialPostType>(matchSocialPostByUrl(props.url));
</script>
