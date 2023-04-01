import { getPrayers, getMetadata } from "@/infrastructure/firebase/firestore";

export default {
  namespaced: true,
  state: {
    hasData: false,
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
      december: [],
    },
    prayer_name: [
      {
        name: "Imsak",
        state: "am",
      },
      {
        name: "Subuh",
        state: "am",
      },
      {
        name: "Syuruk",
        state: "am",
      },
      {
        name: "Duha",
        state: "am",
      },
      {
        name: "Zuhur",
        state: "pm",
      },
      {
        name: "Asar",
        state: "pm",
      },
      {
        name: "Maghrib",
        state: "pm",
      },
      {
        name: "Isya",
        state: "pm",
      },
    ],
    metadata: {},
  },

  mutations: {
    updatePrayer(state, n) {
      state.prayer_data[n[0]] = n[1];
    },
    updateMetaData(state, data) {
      state.metadata = data;
    },
    updateDataStatus(state, newState) {
      state.hasData = newState;
    },
  },

  getters: {
    getPrayerData(state) {
      return (date) => {
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
    },
    getMetaData(state) {
      return state.metadata;
    },
  },

  actions: {
    async getPrayerData(context) {
      try {
        // check if prayer data is available in local storage
        // if present, get prayer data from local storage
        // else get from firebase
        if (localStorage.prayer_data !== undefined) {
          getDataFromLocalStorage(context);
        } else {
          await getDataFromFireBase(context);
        }

        // Check for new data from database
        // if present, update data
        checkNewData().then((isNewDataAvailable) => {
          if (isNewDataAvailable) {
            getDataFromFireBase(context);
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
};

let getDataFromLocalStorage = function(context) {
  console.log("Fetching data from local storage...");
  // Get data from local storage
  // save data to prayer_data vuex state
  let documents = JSON.parse(localStorage.prayer_data);
  for (let [month, item] of Object.entries(documents)) {
    context.commit("updatePrayer", [month, item]);
  }

  context.commit("updateDataStatus", true);

  // save metadata from local storage to metadata vuex state
  context.commit("updateMetaData", localStorage.local_storage_metadata);
};

let getDataFromFireBase = async function(context) {
  console.log("Fetching data from Firebase...");

  // Get prayer data from firebase
  // save prayer data to prayer_data vuex state
  // save prayer data to local storage
  await getDataFromFirebaseAndSaveToPrayerModule(context);
  localStorage.prayer_data = JSON.stringify(context.state.prayer_data);

  // Get metadata from firebase
  // save metadata to metadata vuex state
  // save metadata to local storage
  let fetchedMetadata = await getDatabaseMetaDataFromFirebase();
  context.commit("updateMetaData", fetchedMetadata);
  localStorage.local_storage_metadata = JSON.stringify(fetchedMetadata);

  context.commit("updateDataStatus", true);
};

let checkNewData = async function() {
  try {
    // return false if no data is available in local storage
    if (localStorage.local_storage_metadata === undefined) {
      console.log("No local data is available...");
      return false;
    }

    // get data version in local storage
    // get data version in firebase
    let local_storage_version = JSON.parse(localStorage.local_storage_metadata)
      .version;
    let firebase_metadata = await getDatabaseMetaDataFromFirebase();

    // if is data version in local storage is outdated
    if (+local_storage_version < +firebase_metadata.version) {
      console.log("New data is available...");
      return true;
    } else {
      console.log("No new data is available...");
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

let getDataFromFirebaseAndSaveToPrayerModule = async function(context) {
  try {
    const documents = await getPrayers();
    let index = 0;
    documents.forEach((doc) => {
      if (index > 11) {
        return;
      }
      let item = doc.data().Day;
      let month = context.rootGetters["months/getComputerMonthName"](index);
      context.commit("updatePrayer", [month, item]);
      index++;
    });
  } catch (error) {
    console.error(error);
  }
};

let getDatabaseMetaDataFromFirebase = async function() {
  try {
    const fbMetaData = await getMetadata();
    let fetchedMetadata;
    fbMetaData.forEach((metadata) => {
      fetchedMetadata = metadata.data().data;
    });
    return fetchedMetadata;
  } catch (error) {
    console.error(error);
  }
};
