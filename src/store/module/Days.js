export default {
  namespaced: true,
  state: {
    days: ["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"]
  },

  getters: {
    getComputerDayName(state) {
      return day => {
        return state.days[day].toLowerCase();
      };
    },
    getDisplayDayName(state) {
      return day => {
        return state.days[day];
      };
    }
  }
};
