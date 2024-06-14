import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns user
 */
export function login(email, password) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
}