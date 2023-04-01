import { firebase } from "./index";
import fbConfig from "../../../firebase.json";

const {
  firestore,
  waktuCollection,
  metadataCollection,
} = initializeFirestore();

useEmulatorForDevelopment();

export async function updatePrayerByMonth(month, days) {
  await waktuCollection.doc(month.toString()).set({
    Day: days,
  });
}

export async function getPrayers() {
  return await waktuCollection.get();
}

export async function updateMetadata(version) {
  await metadataCollection.doc("data").set({
    data: { version },
  });
}

export async function getMetadata() {
  return await metadataCollection.get();
}

function initializeFirestore() {
  const fb = firebase.firestore();
  const waktu = fb.collection("waktu");
  const metadata = fb.collection("metadata");

  return {
    firestore: fb,
    waktuCollection: waktu,
    metadataCollection: metadata,
  };
}

function useEmulatorForDevelopment() {
  if (process.env.NODE_ENV !== "production") {
    firestore.useEmulator("localhost", fbConfig.emulators.firestore.port);
    seedData();
    console.info("Using firebase emulator");
  }
}

function seedData() {
  updateMetadata(1);
  const day = [];
  for (let index = 0; index < 32; index++) {
    day.push({
      Asar: "3.50",
      Date: "1.3.2023",
      Duha: "6.54",
      Imsak: "5.04",
      Isya: "7.43",
      Maghrib: "6.33",
      Subuh: "5.14",
      Syuruk: "6.32",
      Tarikh: "8 Sya'ban 1444",
      Zuhur: "12.34",
    });
  }
  for (let index = 0; index < 12; index++) {
    let m = index + 1;

    if (m > 9) {
      m = "9" + m;
    }

    updatePrayerByMonth(m, day);
  }
}
