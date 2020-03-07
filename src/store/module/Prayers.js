export default {
  namespaced: true,
  state: {
    prayer_data: {
      january: [],
      february: [],
      march: [],
      april: [],
      may: [],
      june: [],
      july: [],
      august: [],
      september: [],
      october: [],
      november: [],
      december: []
    },
    prayer_name: [
      {
        name: "Imsak",
        state: "am"
      },
      {
        name: "Subuh",
        state: "am"
      },
      {
        name: "Syuruk",
        state: "am"
      },
      {
        name: "Duha",
        state: "am"
      },
      {
        name: "Zuhur",
        state: "pm"
      },
      {
        name: "Asar",
        state: "pm"
      },
      {
        name: "Maghrib",
        state: "pm"
      },
      {
        name: "Isya",
        state: "pm"
      }
    ],
    metadata: {}
  },

  mutations: {
    updatePrayer(state, n) {
      state.prayer_data[n[0]] = n[1];
    },
    updateMetaData(state, data) {
      state.metadata = data;
    }
  },

  getters: {
    getPrayerData(state) {
      return date => {
        try {
          var prayer_data = state.prayer_data[date.month][date.day_number];
          prayer_data.day = date.day_name;
          return prayer_data;
        } catch (error) {
          console.log(error);
        }
      };
    },
    getPrayersTime(state) {
      return state.prayer_name;
    }
  }
};
