<script setup lang="ts">
import AtomsIconsFGame from '@/components/atoms/icons/FGame.vue';

defineProps<{
  text: string;
}>()

const icon = AtomsIconsFGame
const emits = defineEmits(['button:click'])
</script>

<template>
  <div class="absolute w-lvw h-lvh bg-transparent backdrop-blur-sm">
    <div class="flex justify-center items-center h-screen w-screen mx-auto">
      <div class="">
        <h1 class="text-4xl font-bold text-gray-800 pb-6 uppercase">{{ text }}</h1>
        <slot />
        <AtomsFButton class="bg-primary hover:bg-primary-800 mt-4" text="New Game" :icon @click="emits('button:click')" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>