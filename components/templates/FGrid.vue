<script setup lang="ts">
import { useCn } from '~/composables/useCn';
import { CellCount, type GridSize } from '@/types';

const { cn } = useCn()
const { check } = useGame()

const props = defineProps<{
  size: GridSize,
  lastSelectedCell: number
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
  } else if ('normal' === props.size) {
    return 'w-[93px] h-[93px]'
  } else if ('easy' === props.size) {
    return 'w-[94px] h-[94px]'
  }
  return 'w-full h-full'
})
const cellCount = computed<number>(_ => (
  CellCount[props.size as keyof typeof CellCount] * CellCount[props.size as keyof typeof CellCount]
))
const selectedCell = (num: number) => {
  if (num === props.lastSelectedCell) {
    return 'text-white bg-accent'
  }
  return `bg-accent-200 text-accent`
}

const clicked = (num: number) => {
  emits('clicked', num)
}
</script>

<template>
  <div :class="cn(`grid gap-2 ${gridClass}`)">
    <div
      v-for="n of cellCount" :key="n"
      :class="cn(
        `flex items-center justify-center rounded-lg`,
        `${selectedCell(n)} border border-accent ${cellClass}`,
        'hover:shadow-lg hover:border-accent',
        )"
      @click="clicked(n)">
        <slot :name="`grid-${n}`" />
    </div>
  </div>
</template>
