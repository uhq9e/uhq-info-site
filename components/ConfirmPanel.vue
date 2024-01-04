<template>
  <div>
    <slot :op="opConfirmPanel" />
    <OverlayPanel ref="opConfirmPanel">
      <div class="mb:16">是否确定执行操作？</div>
      <div class="flex flex:row justify-content:end gap:8">
        <Button label="取消" @click="opConfirmPanel?.hide()" size="small" text />
        <Button
          label="确定"
          @click="
            opConfirmPanel?.hide();
            $emit('execute');
          "
          severity="danger"
          size="small"
        />
      </div>
    </OverlayPanel>
  </div>
</template>

<script setup lang="ts">
import OverlayPanel from "primevue/overlaypanel";
import Button from "primevue/button";

// defineProps<{}>();

defineEmits<{
  execute: [];
}>();

const opConfirmPanel = ref<OverlayPanel>();
</script>
