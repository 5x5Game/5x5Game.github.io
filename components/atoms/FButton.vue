<script setup lang="ts">
import type { Component } from 'vue';
import { attrs } from 'ultrahtml';

const { cn } = useCn()

defineProps<{
  text: string,
  icon?: Component
}>()
</script>

<template>
  <button
    :class="cn('bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded', $options.class)"
  >
    <span class="flex justify-between items-center gap-2">
      <component v-if="icon" :is="icon" class="text-white" />
      {{ text }}
    </span>
  </button>
</template>
