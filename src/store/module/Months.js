export default {
  namespaced: true,
  state: {
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  },

  getters: {
    getComputerMonthName(state) {
      return month => {
        return state.months[month].toLowerCase();
      };
    }
  }
};
