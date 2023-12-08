<template>
  <div class="rel p:16 overflow-x:clip overflow-y:visible">
    <h1 class="my:0">{{ value }}</h1>
    <div
      class="abs left:-25 top:-75 f:15rem f:bold f:white untouchable user-select:none z:-1 white-space:nowrap text-outline matrix(1,0,-0.1,0.75,0,0)"
    >
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: string;
}>();
</script>
