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
    getScore: state => {
      if (localStorage.getItem('score')) {
        state.score = Number(localStorage.getItem('score'))
      }
      return state.score;
    },
    getBestScore: state => {
      if (localStorage.getItem('best_score')) {
        state.best_score = Number(localStorage.getItem('best_score'))
      }
      return state.best_score
    },
    getTable: state => {
      if (localStorage.getItem('table')) {
        state.table = JSON.parse(localStorage.getItem('table')!)
      }
      return state.table;
    },
    getLastSelected: state => {
      if (localStorage.getItem('lastSelected')) {
        state.lastSelected = Number(localStorage.getItem('lastSelected'))
      }
      return state.lastSelected
    },
    getCells: state => {
      if (localStorage.getItem('cells')) {
        state.cells = JSON.parse(localStorage.getItem('cells')!)
      }
      return state.cells
    },
  },
  actions: {
    setScore(value: number) {
      localStorage.setItem('score', value.toString())
      this.score = value
    },
    setBestScore(value: number) {
      localStorage.setItem('best_score', value.toString())
      this.best_score = value
    },
    updateTable(x: number, y: number, value: number) {
      this.table[x][y] = value
      localStorage.setItem('table', JSON.stringify(this.table))
    },
    setLastSelected(value: number) {
      localStorage.setItem('lastSelected', value.toString())
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
      localStorage.setItem('cells', JSON.stringify(this.cells))
      localStorage.setItem('table', JSON.stringify(this.table))
    },
    setCells(value: GridCell) {
      this.cells.push({
        index: value.index,
        value: value.value
      })
      localStorage.setItem('cells', JSON.stringify(this.cells))
    },
  }
})