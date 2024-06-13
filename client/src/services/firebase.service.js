import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export function login(email, password) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
}