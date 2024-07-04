<script setup lang="ts">

import { useGame } from '@/composables/useGame';
import { CellCount, type GridSize } from '@/types';

const size: GridSize = 'normal'
const cellCount: CellCount = CellCount[size];
const { cn } = useCn()
const { table, check, lastSelected, numToXy, isGameOver } = useGame()

const selected_cells: number[] = reactive<number[]>([])
const values: number[] = reactive<number[]>([])
const curren_value = ref(1)


const cellClicked = (num: number) => {

  if (check(num, cellCount)) {
    selected_cells.push(num)
    lastSelected.value = num
    const [x, y] = numToXy(num, cellCount)
    table[x][y] = 1
    values.push(curren_value.value)
    curren_value.value++

    if (isGameOver(num, cellCount)) {
      console.log('Game over');
    }
  }
}
</script>

<template>
  <TemplatesGrid :size @clicked="cellClicked" :last-selected-cell="lastSelected">
    <template v-for="(cell, key) of selected_cells" :key="key" v-slot:[`grid-${cell}`]>
      <span :class="cn(`text-5xl font-bold`)">{{ values[key] }}</span>
    </template>
  </TemplatesGrid>
</template>

<style scoped>

</style>