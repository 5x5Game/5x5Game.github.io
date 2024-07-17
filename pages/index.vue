<script setup lang="ts">

import { useGame } from '@/composables/useGame';
import { CellCount, type GridCell, type GridSize } from '@/types';

import { useTime } from '@/composables/useTime';
import AtomsIconsFGame from '@/components/atoms/icons/FGame.vue';
import AtomsIconsFClock from '@/components/atoms/icons/FClock.vue';
import AtomsIconsFSparkle from '@/components/atoms/icons/FSparkle.vue';

const size: GridSize = 'normal'
const cellCount: CellCount = CellCount[size];
const { cn } = useCn()
const gameStore = useGameStore()

onBeforeMount(() => gameStore.initialize())

const getScore = computed<number>(_ => gameStore.getScore)
const getBestScore = computed<number>(_ => gameStore.getBestScore)
const getLastSelected = computed<number>(_ => gameStore.getLastSelected)
const getCells = computed<GridCell[]>(_ => gameStore.getCells)

const { check, numToXy, isGameOver } = useGame(
  toRef(gameStore, 'getTable'),
  toRef(gameStore, 'getLastSelected')
)
const { formatTime } = useTime()

const gameOver = ref(false)
const score = computed<string>(_ => formatTime(getScore.value))
const best_score = computed<string>(_ => formatTime(getBestScore.value))

const incrementTime = () => {
  gameStore.setScore(getScore.value + 1);
};
let intervalId: NodeJS.Timeout | null = null;
if (getScore.value !== 0) {
  intervalId = setInterval(incrementTime, 1000);
}

const cellClicked = (num: number) => {
  if (getCells.value.length === 0) {
    intervalId = setInterval(incrementTime, 1000);
  }
  if (check(num, cellCount)) {
    gameStore.updateCells({
      index: num,
      value: getCells.value.length + 1
    })
    gameStore.setLastSelected(num)
    const [x, y] = numToXy(num, cellCount)
    gameStore.updateTable(x, y, 1)

    if (isGameOver(num, cellCount)) {
      gameOver.value = true
      clearInterval(intervalId!);
    }
    if (getCells.value.length === 25) {
      if (
        (getScore.value < getBestScore.value && getBestScore.value !== 0)
        || getBestScore.value === 0
      ) {
        gameStore.setBestScore(getScore.value)
      }
    }
  }
}
const restartGame = () => {
  clearInterval(intervalId!)
  gameOver.value = false
  gameStore.restart()
}
</script>

<template>
  <div>
    <NuxtLayout name="game">
    <template #start>
      <AtomsFButton
        class="bg-primary hover:bg-primary-800"
        :text="$t('new_game')"
        :icon="AtomsIconsFGame"
        @click="restartGame"
      />
    </template>
    <template #score>
      <MoleculesFTimer class="w-32" :time="score" :icon="AtomsIconsFClock"  />
    </template>
    <template #best_score>
      <MoleculesFTimer class="w-32" :time="best_score" :icon="AtomsIconsFSparkle" icon-color="text-yellow-200" />
    </template>

    <TemplatesFGrid :size @clicked="cellClicked" :last-selected-cell="getLastSelected">
      <template v-for="(cell, key) of getCells" :key="key" v-slot:[`grid-${cell.index}`]>
        <span :class="cn(`text-5xl font-bold`)">{{ cell.value }}</span>
      </template>
    </TemplatesFGrid>

    <MoleculesFPopupLayer v-if="gameOver && getCells.length !== 25"
                          :text="$t('game_over')"
                          @button:click="restartGame">
      <p class="text-lg">{{ $t('reached') }}
        <span class="text-rose-600">{{ getCells.length }}</span> {{ $t('in') }} <span class="text-rose-600">{{ score }}</span>
      </p>
      <p class="text-lg">{{ $t('good_luck') }}</p>
    </MoleculesFPopupLayer>
    <MoleculesFPopupLayer v-if="getCells.length === 25"
                          :text="$t('you_won')"
                          @button:click="restartGame">
      <p class="text-lg">{{ $t('congratulations') }}</p>
      <p>{{ $t('got') }} <span class="text-rose-600">{{ getCells.length }}</span> {{ $t('in') }} <span class="text-rose-600">{{ score }}</span>
      </p>
    </MoleculesFPopupLayer>
    </NuxtLayout>
  </div>
</template>
