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
    lastSelected: -1,
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
      if (import.meta.client) localStorage.setItem('score', value.toString())
      this.score = value
    },
    setBestScore(value: number) {
      if (import.meta.client) localStorage.setItem('best_score', value.toString())
      this.best_score = value
    },
    updateTable(x: number, y: number, value: number) {
      this.table[x][y] = value
      if (import.meta.client) localStorage.setItem('table', JSON.stringify(this.table))
    },
    setTable(value: number[][]) {
      this.table = value
      if (import.meta.client) localStorage.setItem('table', JSON.stringify(this.table))
    },
    setLastSelected(value: number) {
      if (import.meta.client) localStorage.setItem('lastSelected', value.toString())
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
      if (import.meta.client) {
        localStorage.setItem('cells', JSON.stringify(this.cells))
        localStorage.setItem('table', JSON.stringify(this.table))
      }
    },
    updateCells(value: GridCell) {
      this.cells.push({
        index: value.index,
        value: value.value
      })
      if (import.meta.client) localStorage.setItem('cells', JSON.stringify(this.cells))

    },
    setCells(value: GridCell[]) {
      this.cells = value
      if (import.meta.client) localStorage.setItem('cells', JSON.stringify(this.cells))

    },
    initialize() {
      if (import.meta.client) {
        if (localStorage.getItem('score')) {
          this.setScore(Number(localStorage.getItem('score')))
        }
        if (localStorage.getItem('best_score')) {
          this.setBestScore(Number(localStorage.getItem('best_score')))
        }
        if (localStorage.getItem('table')) {
          this.setTable(JSON.parse(localStorage.getItem('table')!))
        }
        if (localStorage.getItem('cells')) {
          this.setCells(JSON.parse(localStorage.getItem('cells')!))
        }
        if (localStorage.getItem('lastSelected')) {
          this.setLastSelected(Number(localStorage.getItem('lastSelected')))
        } else {
          this.setLastSelected(0)
        }
      }
    }
  }

})