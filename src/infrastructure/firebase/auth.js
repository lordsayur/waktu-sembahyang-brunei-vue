import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  connectAuthEmulator,
} from "firebase/auth";

import { firebase } from "./index";
import fbConfig from "../../../firebase.json";

export async function createUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      getAuthInstance(),
      email,
      password
    );

    return {
      data: userCredential,
      error: null,
    };
  } catch (error) {
    console.error("[Create User]", error);

    return {
      data: null,
      error,
    };
  }
}

export function getCurrentUser() {
  const user = getAuthInstance()().currentUser;

  return user;
}

export async function signInUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      getAuthInstance(),
      email,
      password
    );

    return {
      data: userCredential,
      error: null,
    };
  } catch (error) {
    console.error("[Sign In]", error);
    return {
      data: null,
      error,
    };
  }
}

export async function signOutUser() {
  try {
    await signOut(getAuthInstance());
  } catch (error) {
    console.error("[Sign Out]", error);
  }
}

function getAuthInstance() {
  return getAuth(firebase);
}

export async function useAuthEmulator() {
  connectAuthEmulator(
    getAuthInstance(),
    "http://localhost:" + fbConfig.emulators.auth.port,
    { disableWarnings: true }
  );
  console.info("[Development] Using authentication emulator. ✅");

  await seedData();
}

async function seedData() {
  try {
    console.info("[Development] Seeding user. ⌛");

    await createUserWithEmailAndPassword(
      getAuthInstance(),
      "admin@wsb.com",
      "!Password1"
    ).catch((e) => {
      const errorData = e.customData._tokenResponse.error;
      if (+errorData.code !== 400) {
        throw e;
      }
    });
    console.info("[Development] User seeded. ✅");
  } catch (error) {
    console.error(error);
  }
}
