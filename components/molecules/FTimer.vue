<script setup lang="ts">
import type { Component } from 'vue';

const { cn } = useCn()

defineProps<{
  time: Date | string,
  icon?: Component
  iconColor?: string
}>()
</script>

<template>
  <div :class="cn(
    'flex justify-between gap-2 items-center rounded-2xl bg-primary text-white',
    'p-4',
    $options.class
    )">
    <component v-if="icon" :is="icon" :class="cn('text-white h-4 w-4', iconColor)" />
    {{ time }}
  </div>
</template>

<style scoped>

</style>