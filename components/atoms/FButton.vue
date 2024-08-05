<script setup lang="ts">
import type { Component } from 'vue';

const { cn } = useCn()

defineProps<{
  text?: string,
  icon?: Component
}>()
</script>

<template>
  <button
    :class="cn(
      'bg-primary hover:bg-primary-800 text-white font-bold py-2 px-4 rounded',
      $options.class
    )"
  >
    <span class="flex justify-between items-center gap-2">
      <component v-if="icon" :is="icon" class="text-white h-6 w-6 lg:w-5 lg:h-5" />
      <span class="hidden md:block" :title="text">{{ text }}</span>
    </span>
  </button>
</template>
