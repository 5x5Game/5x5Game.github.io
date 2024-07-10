import type { GridCell } from '@/types';
import nuxtStorage from 'nuxt-storage';


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
      if (nuxtStorage.localStorage.getData('score')) {
        state.score = Number(nuxtStorage.localStorage.getData('score'))
      }
      return state.score;
    },
    getBestScore: state => {
      if (nuxtStorage.localStorage.getData('best_score')) {
        state.best_score = Number(nuxtStorage.localStorage.getData('best_score'))
      }
      return state.best_score
    },
    getTable: state => {
      if (nuxtStorage.localStorage.getData('table')) {
        state.table = JSON.parse(nuxtStorage.localStorage.getData('table')!)
      }
      return state.table;
    },
    getLastSelected: state => {
      if (nuxtStorage.localStorage.getData('lastSelected')) {
        state.lastSelected = Number(nuxtStorage.localStorage.getData('lastSelected'))
      }
      return state.lastSelected
    },
    getCells: state => {
      if (nuxtStorage.localStorage.getData('cells')) {
        state.cells = JSON.parse(nuxtStorage.localStorage.getData('cells')!)
      }
      return state.cells
    },
  },
  actions: {
    setScore(value: number) {
      nuxtStorage.localStorage.setData('score', value.toString())
      this.score = value
    },
    setBestScore(value: number) {
      nuxtStorage.localStorage.setData('best_score', value.toString())
      this.best_score = value
    },
    updateTable(x: number, y: number, value: number) {
      this.table[x][y] = value
      nuxtStorage.localStorage.setData('table', JSON.stringify(this.table))
    },
    setLastSelected(value: number) {
      nuxtStorage.localStorage.setData('lastSelected', value.toString())
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
      nuxtStorage.localStorage.setData('cells', JSON.stringify(this.cells))
      nuxtStorage.localStorage.setData('table', JSON.stringify(this.table))
    },
    setCells(value: GridCell) {
      this.cells.push({
        index: value.index,
        value: value.value
      })
      nuxtStorage.localStorage.setData('cells', JSON.stringify(this.cells))
    },
  }
})