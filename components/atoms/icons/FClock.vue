<script setup lang="ts">
const { cn } = useCn()

</script>

<template>
  <svg :class="cn('text-red-500', $options.class)"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z"/>
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 15" />
  </svg>
</template>

<style scoped>

</style>