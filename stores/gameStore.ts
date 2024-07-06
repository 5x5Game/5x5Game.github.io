
export const useGameStore = defineStore("gameStore", {
  state: () => ({
    score: 0,
    best_score: 0
  }),
  getters: {
    getScore: state => state.score,
    getBestScore: state => {
      if (localStorage.getItem('best_score')) {
        state.best_score = Number(localStorage.getItem('best_score'))
      }
      return state.best_score
    }
  },
  actions: {
    setScore(value: number) {
      this.score = value
    },
    setBestScore(value: number) {
      localStorage.setItem('best_score', value.toString())
      this.best_score = value
    }
  }
})