<script setup lang="ts">
import { useCn } from '~/composables/useCn';
import { CellCount, type GridSize } from '@/types';

const { cn } = useCn()

const props = defineProps<{
  size: GridSize,
  lastSelectedCell: number
}>()
const emits = defineEmits(['clicked'])

const lastSelectedCell = computed(_ => props.lastSelectedCell)
const sizes: Record<string, string> = {
  easy: `grid-cols-4 w-[400px] h-[400px]`,
  normal: `grid-cols-5 w-full aspect-square md:w-[500px] md:h-[500px] overflow-hidden`,
  hard: `grid-cols-6 w-[500px] h-[600px]`
}

const gridClass = computed<string>(_ => sizes[props.size])
const cellClass = computed<string>(_ => {
  if ('hard' === props.size) {
    return 'w-[75px] h-[75px]'
  } else if ('easy' === props.size) {
    return 'w-[94px] h-[94px]'
  }
  return 'w-full aspect-square md:w-[93px] md:h-[93px]'
})
const cellCount = computed<number>(_ => (
  CellCount[props.size as keyof typeof CellCount] * CellCount[props.size as keyof typeof CellCount]
))
const selectedCell = (num: number) => {
  if (num === lastSelectedCell.value) {
    return 'text-white bg-accent shadow-inner shadow-primary'
  }
  return `bg-accent-200 text-accent`
}

const clicked = (num: number) => {
  emits('clicked', num)
}
</script>

<template>
  <div v-if="lastSelectedCell !== -1" :class="cn(`grid gap-2 ${gridClass}`)">
    <div ref="cellElements"
      v-for="(n, key) of cellCount" :key="n + '-' + lastSelectedCell"
      :class="cn(
        `flex items-center justify-center rounded-lg`,
        selectedCell(n),
        `border border-accent`,
        cellClass,
        'hover:shadow-lg hover:border-accent',
        )"
      @click="clicked(n)">
      <slot :name="`grid-${n}`" />
    </div>
  </div>
</template>
