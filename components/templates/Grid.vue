<script setup lang="ts">
import { useCn } from '~/composables/useCn';
import { CellCount, type GridSize } from '@/types';

const { cn } = useCn()

const props = defineProps<{
  size: GridSize
}>()
const emits = defineEmits(['clicked'])

const sizes: Record<string, string> = {
  easy: `grid-cols-4 w-[400px] h-[400px]`,
  normal: `grid-cols-5 w-[500px] h-[500px]`,
  hard: `grid-cols-6 w-[500px] h-[600px]`
}

const gridClass = computed<string>(_ => sizes[props.size])
const cellClass = computed<string>(_ => {
  if ('hard' === props.size) {
    return 'w-[75px] h-[75px]'
  }
  return 'w-full h-full'
})
const cellCount = computed<number>(_ => (
  CellCount[props.size as keyof typeof CellCount] * CellCount[props.size as keyof typeof CellCount]
))
</script>

<template>
  <div :class="cn(`grid gap-2 ${gridClass}`)">
    <div
      :class="cn(
        `flex items-center justify-center rounded-lg`,
        `bg-teal-50 border border-teal-100 ${cellClass}`,
        'hover:shadow-lg hover:border-teal-600',
        )"
      v-for="n of cellCount" :key="n" @click="emits('clicked', n)">
        <slot :name="`grid-${n}`" />
    </div>
  </div>
</template>

<style scoped>

</style>