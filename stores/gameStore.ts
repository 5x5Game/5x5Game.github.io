
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
    lastSelected: 0
  }),
  getters: {
    getScore: state => state.score,
    getBestScore: state => {
      if (localStorage.getItem('best_score')) {
        state.best_score = Number(localStorage.getItem('best_score'))
      }
      return state.best_score
    },
    getTable: state => state.table,
    getLastSelected: state => state.lastSelected,
  },
  actions: {
    setScore(value: number) {
      this.score = value
    },
    setBestScore(value: number) {
      localStorage.setItem('best_score', value.toString())
      this.best_score = value
    },
    updateTable(x: number, y: number, value: number) {
      this.table[x][y] = value
    },
    setLastSelected(value: number) {
      console.log('setLastSelected', value);
      this.lastSelected = value
      console.log(this.lastSelected);
    },
    restart() {
      for(let z = 0; z < this.table.length; z++) {
        for (let j = 0; j < this.table.length; j++) {
          this.table[z][j] = 0;
        }
      }
      this.lastSelected = 0;
    }
  }
})