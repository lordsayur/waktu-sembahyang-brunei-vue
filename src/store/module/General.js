export default {
  namespaced: true,
  state: {
    TodayDateTime: undefined
  },

  getters: {
    getTodayDateTime(state) {
      return state.TodayDateTime;
    }
  },

  mutations: {
    updateTodayDateTime(state, newTodayDateTime) {
      state.TodayDateTime = newTodayDateTime;
    }
  }
};
