<script setup lang="ts">
defineProps<{
  show: boolean
}>()
const emits = defineEmits(['close'])
const close = () => {
  emits('close');
}
</script>

<template>
  <div class="">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="close"
    >
      <div class="bg-white rounded-lg shadow-lg max-h-[90vh] w-[90vw] p-6 relative">
        <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-800" @click="close">
          &times;
        </button>
        <div class="overflow-auto max-h-[80vh]">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
