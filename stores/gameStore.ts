import type { GridCell } from '@/types';

export const useGameStore = defineStore("gameStore", {
  state: () => ({
    score: 0,
    best_score: 0,
    table: [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
    ],
    lastSelected: 0,
    cells: [] as GridCell[]
  }),
  getters: {
    getScore: state => state.score,
    getBestScore: state => state.best_score,
    getTable: state => state.table,
    getLastSelected: state => state.lastSelected,
    getCells: state => state.cells,
  },
  actions: {
    setScore(value: number) {
      this.score = value
    },
    setBestScore(value: number) {
      this.best_score = value
    },
    updateTable(x: number, y: number, value: number) {
      this.table[x][y] = value
    },
    setLastSelected(value: number) {
      this.lastSelected = value
    },
    restart() {
      for(let z = 0; z < this.table.length; z++) {
        for (let j = 0; j < this.table.length; j++) {
          this.table[z][j] = 0;
        }
      }
      this.setLastSelected(0);
      this.setScore(0)
      this.cells = []
    },
    setCells(value: GridCell) {
      this.cells.push({
        index: value.index,
        value: value.value
      })
    },
  }
})