<script setup lang="ts">

import { useGame } from '@/composables/useGame';
import { CellCount, type GridSize } from '@/types';

import { useTime } from '@/composables/useTime';
import AtomsIconsFGame from '@/components/atoms/icons/FGame.vue';
import AtomsIconsFClock from '@/components/atoms/icons/FClock.vue';
import AtomsIconsFSparkle from '@/components/atoms/icons/FSparkle.vue';

const size: GridSize = 'normal'
const cellCount: CellCount = CellCount[size];
const { cn } = useCn()
const gameStore = useGameStore()

onBeforeMount(() => {
  gameStore.initilize()
})

const { check, numToXy, isGameOver } = useGame(gameStore.getTable, toRef(gameStore, 'getLastSelected'))
const { formatTime } = useTime()

const curren_value = ref(1)
const gameOver = ref(false)
const score = computed<string>(_ => formatTime(gameStore.getScore))
const best_score = computed<string>(_ => formatTime(gameStore.getBestScore))

const incrementTime = () => {
  gameStore.setScore(gameStore.getScore + 1);
};
let intervalId: NodeJS.Timeout | null = null;
if (gameStore.getScore !== 0) {
  intervalId = setInterval(incrementTime, 1000);
}

const cellClicked = (num: number) => {

  if (gameStore.getCells.length === 0) {
    intervalId = setInterval(incrementTime, 1000);
  }
  if (check(num, cellCount)) {
    gameStore.updateCells({
      index: num,
      value: curren_value.value
    })
    gameStore.setLastSelected(num)
    const [x, y] = numToXy(num, cellCount)
    gameStore.updateTable(x, y, 1)
    curren_value.value++

    if (isGameOver(num, cellCount)) {
      gameOver.value = true
      clearInterval(intervalId!);
    }
    if (gameStore.getCells.length === 25) {
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
  gameOver.value = false
  gameStore.restart()
  curren_value.value = 1
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

    <TemplatesFGrid :size @clicked="cellClicked" :last-selected-cell="gameStore.getLastSelected">
      <template v-for="(cell, key) of gameStore.getCells" :key="key" v-slot:[`grid-${cell.index}`]>
        <span :class="cn(`text-5xl font-bold`)">{{ cell.value }}</span>
      </template>
    </TemplatesFGrid>

    <MoleculesFPopupLayer v-if="gameOver && gameStore.getCells.length !== 25"
                          :text="$t('game_over')"
                          @button:click="restartGame">
      <p class="text-lg">{{ $t('reached') }}
        <span class="text-rose-600">{{ gameStore.getCells.length }}</span> {{ $t('in') }} <span class="text-rose-600">{{ score }}</span>
      </p>
      <p class="text-lg">{{ $t('good_luck') }}</p>
    </MoleculesFPopupLayer>
    <MoleculesFPopupLayer v-if="gameStore.getCells.length === 25"
                          :text="$t('you_won')"
                          @button:click="restartGame">
      <p class="text-lg">{{ $t('congratulations') }}</p>
      <p>{{ $t('got') }} <span class="text-rose-600">{{ gameStore.getCells.length }}</span> {{ $t('in') }} <span class="text-rose-600">{{ score }}</span>
      </p>
    </MoleculesFPopupLayer>
    </NuxtLayout>
  </div>
</template>
