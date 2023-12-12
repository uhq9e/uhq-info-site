<template>
  <div class="rel p:16 overflow-x:clip overflow-y:visible">
    <div class="flex flex:row flex:nowrap align-items:center gap:4">
      <Button
        @click="router.back()"
        icon="pi pi-arrow-left"
        class="color:inherit"
        severity="secondary"
        title="返回"
        v-show="showBackButton"
        text
        rounded
      />
      <slot name="before" />
      <h1 class="my:0">{{ value }}</h1>
    </div>
    <div class="mt:4">
      {{ caption }}
    </div>
    <div
      class="abs left:-25 top:-75 f:15rem f:bold f:white untouchable user-select:none z:-1 white-space:nowrap text-outline matrix(1,0,-0.1,0.75,0,0)"
    >
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

withDefaults(
  defineProps<{
    value: string;
    caption?: string;
    showBackButton?: boolean;
  }>(),
  {
    showBackButton: true,
  }
);
</script>
