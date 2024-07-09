<script setup lang="ts">
defineProps<{
  title: string,
  content: string,
}>()
</script>

<template>
  <div>
    <h1 class="text-4xl text-primary pl-8">{{ title }}</h1>
    <div class="p-8 mt-8">
      <div v-html="content"></div>
    </div>
  </div>
</template>
