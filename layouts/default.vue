<script setup lang="ts">
const { locale, setLocale } = useI18n()
setLocale(locale.value)
</script>

<template>
  <div class="bg-white flex flex-col justify-start items-center gap-6 pt-7 px-4 h-lvh w-lvw">
    <slot />
  </div>
</template>

<style scoped>

</style>