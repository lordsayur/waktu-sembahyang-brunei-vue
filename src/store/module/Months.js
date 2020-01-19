export default {
  namespaced: true,
  state: {
    months: [
      { text: "January", value: 1 },
      { text: "February", value: 2 },
      { text: "March", value: 3 },
      { text: "April", value: 4 },
      { text: "May", value: 5 },
      { text: "June", value: 6 },
      { text: "July", value: 7 },
      { text: "August", value: 8 },
      { text: "September", value: 9 },
      { text: "October", value: 910 },
      { text: "November", value: 911 },
      { text: "December", value: 912 }
    ]
  },

  getters: {
    getComputerMonthName(state) {
      return month => {
        return state.months[month].text.toLowerCase();
      };
    },

    getDisplayMonthName(state) {
      return month => {
        return state.months[month].text;
      };
    },

    getAllDisplayMonthName(state) {
      return state.months;
    }
  }
};
