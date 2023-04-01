import { firebase } from "./index";
import fbConfig from "../../../firebase.json";

const { auth } = initializeAuth();

useEmulatorForDevelopment();

export async function createUserWithEmailAndPassword(email, password) {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
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
  const user = auth().currentUser;

  return user;
}

export async function signIn(email, password) {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
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

export async function signOut() {
  try {
    await auth().signOut();
  } catch (error) {
    console.error("[Sign Out]", error);
  }
}

function initializeAuth() {
  return { auth: firebase.auth };
}

function useEmulatorForDevelopment() {
  if (process.env.NODE_ENV !== "production") {
    auth().useEmulator("http://localhost:" + fbConfig.emulators.auth.port);
    seedData();
    console.info("[firebase/auth]Using authentication emulator");
  }
}

function seedData() {
  createUserWithEmailAndPassword("admin@wsb.com", "!Password1");
}
