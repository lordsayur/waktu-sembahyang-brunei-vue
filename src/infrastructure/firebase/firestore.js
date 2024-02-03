import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  connectFirestoreEmulator,
  getDoc,
} from "firebase/firestore";

import { firebase } from "./index";
import fbConfig from "../../../firebase.json";
import Axios from "axios";

const META_DATA_COLLECTION = "metadata";
const WAKTU_COLLECTION = "waktu";

function getFirestoreInstance() {
  return getFirestore(firebase);
}

function getWaktuCollection() {
  return collection(getFirestoreInstance(), WAKTU_COLLECTION);
}
function getMetadataDoc() {
  return doc(getFirestoreInstance(), META_DATA_COLLECTION, "data");
}

export async function updatePrayerByMonth(month, prayerData) {
  try {
    const _doc = doc(
      getFirestoreInstance(),
      WAKTU_COLLECTION,
      month.toString()
    );
    await setDoc(_doc, { Day: prayerData });
  } catch (error) {
    console.error(error);
  }
}

export async function getPrayers() {
  try {
    const querySnapshot = await getDocs(getWaktuCollection());
    return querySnapshot.docs.map((doc) => doc.data().Day);
  } catch (error) {
    console.error(error);
  }
}

export async function updateMetadata(version) {
  try {
    const _doc = doc(getFirestoreInstance(), META_DATA_COLLECTION, "data");
    await setDoc(_doc, { data: { version } });
  } catch (error) {
    console.error(error);
  }
}

export async function getMetadata() {
  try {
    const docSnapshot = await getDoc(getMetadataDoc());

    return docSnapshot.data().data;
  } catch (error) {
    console.error(error);
  }
}

export async function useFirestoreEmulator() {
  useFirebaseEmulator();

  await clearLocalStorageAndFlushFirestore();
  await seedData();
}

export function useFirebaseEmulator() {
  connectFirestoreEmulator(
    getFirestoreInstance(),
    "localhost",
    fbConfig.emulators.firestore.port
  );
  console.info("[Development] Using firebase emulator. ✅");
}

export async function clearLocalStorageAndFlushFirestore() {
  console.info("[Development] Clearing local storage. ⌛");
  localStorage.clear();
  console.info("[Development] Local storage cleared. ✅");

  try {
    console.info("[Development] Clearing firestore. ⌛");
    await Axios(
      `http://localhost:${fbConfig.emulators.firestore.port}/emulator/v1/projects/waktu-sembahyang-brunei/databases/(default)/documents`,
      { method: "DELETE" }
    );
    console.info("[Development] Firestore flushed. ✅");
  } catch (error) {
    console.error("[Development] error flushing firestore. ⛔");
    console.error(error);
  }
}

export async function seedData() {
  try {
    console.info("[Development] Seeding metada. ⌛");
    await updateMetadata(1);
    console.info("[Development] Metadata seeded. ✅");

    console.log("[Development] Seeding prayer data. ⌛");
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

      await updatePrayerByMonth(m, day);
    }
    console.info("[Development] Prayer data seeded. ✅");
  } catch (error) {
    console.error("[Development] Error while seeding ⛔");
  }
}
