<script setup lang="ts">

import { useGame } from '@/composables/useGame';
import { CellCount, type GridSize } from '@/types';
import AtomsIconsFClock from '@/components/atoms/icons/FClock.vue';
import AtomsIconsFSparkle from '@/components/atoms/icons/FSparkle.vue';
import { useTime } from '@/composables/useTime';
import { AtomsIconsFGame } from '#components';

const size: GridSize = 'normal'
const cellCount: CellCount = CellCount[size];
const { cn } = useCn()
const gameStore = useGameStore()
const { check, numToXy, isGameOver } = useGame(gameStore.getTable, toRef(gameStore, 'getLastSelected'))
const { formatTime } = useTime()

const selected_cells = ref<number[]>([])
const values = ref<number[]>([])
const curren_value = ref(1)
const gameOver = ref(false)
const score = computed<string>(_ => formatTime(gameStore.getScore))
const best_score = computed<string>(_ => formatTime(gameStore.getBestScore))
const incrementTime = () => {
  gameStore.setScore(gameStore.getScore + 1);
};
let intervalId: NodeJS.Timeout | null = null;
const cellClicked = (num: number) => {

  if (selected_cells.value.length === 0) {
    intervalId = setInterval(incrementTime, 1000);
  }
  if (check(num, cellCount)) {
    selected_cells.value.push(num)
    gameStore.setLastSelected(num)
    const [x, y] = numToXy(num, cellCount)
    gameStore.updateTable(x, y, 1)
    values.value.push(curren_value.value)
    curren_value.value++

    if (isGameOver(num, cellCount)) {
      gameOver.value = true
      clearInterval(intervalId!);
    }
    if (values.value.length === 25) {
      if (
        (gameStore.getScore < gameStore.getBestScore && gameStore.getBestScore !== 0)
        || gameStore.getBestScore === 0
      ) {
        gameStore.setBestScore(gameStore.getScore)
      }
    }
  }
}

const restartGame = () => {
  clearInterval(intervalId!)
  gameStore.setScore(0)
  gameOver.value = false
  gameStore.restart()
  curren_value.value = 1
  values.value = []
  selected_cells.value = []
}

</script>

<template>
  <div class="flex justify-between items-center gap-2 w-full px-8">
    <div class="flex justify-start gap-2 items-center">
      <div class="header font-extrabold text-4xl text-primary">5X5Game</div>
      <AtomsFButton
        class="bg-primary hover:bg-primary-800"
        text="New game"
        :icon="AtomsIconsFGame"
        @click="restartGame"
      />
    </div>
    <div class="flex justify-end gap-2 items-center">
      <MoleculesFTimer class="w-32" :time="score" :icon="AtomsIconsFClock"  />
      <MoleculesFTimer class="w-32" :time="best_score" :icon="AtomsIconsFSparkle" icon-color="text-yellow-200" />
    </div>
  </div>
  <TemplatesFGrid :size @clicked="cellClicked" :last-selected-cell="gameStore.getLastSelected">
    <template v-for="(cell, key) of selected_cells" :key="key" v-slot:[`grid-${cell}`]>
      <span :class="cn(`text-5xl font-bold`)">{{ values[key] }}</span>
    </template>
  </TemplatesFGrid>

  <MoleculesFPopupLayer v-if="gameOver &&values.length !== 25"
              text="game over"
              @button:click="restartGame">
    <p class="text-lg">You have reached
      <span class="text-rose-600">{{ values.length }}</span> in <span class="text-rose-600">{{ score }}</span>
    </p>
    <p class="text-lg">Good luck next time.</p>
  </MoleculesFPopupLayer>
  <MoleculesFPopupLayer v-if="values.length === 25" text="You win" @button:click="restartGame">
    <p class="text-lg">Congratulations!</p>
    <p>You got <span class="text-rose-600">{{ values.length }}</span> in <span class="text-rose-600">{{ score }}</span>
    </p>
  </MoleculesFPopupLayer>
</template>

<style scoped>

</style>