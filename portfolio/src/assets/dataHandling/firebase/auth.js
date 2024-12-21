import { auth } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

// Allowed email address for sign-up and Google sign-in
const ALLOWED_EMAIL = "omar.kouzi424@gmail.com"; 

// Initialize Google provider
const googleProvider = new GoogleAuthProvider();

// Sign up user with email and password (only allowed email)
export const signup = (email, password) => {
  if (email !== ALLOWED_EMAIL) {
    throw new Error("You are not authorized to sign up.");
  }
  return createUserWithEmailAndPassword(auth, email, password);
};

// Log in user with email and password
export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Log out user
export const logout = () => signOut(auth);

// Sign in with Google (only allowed email)
export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider)
    .then((result) => {
      // Optional: Access user info
      const user = result.user;

      // Check if the user's email matches the allowed email
      if (user.email !== ALLOWED_EMAIL) {
        throw new Error("You are not authorized to sign in with Google.");
      }

      console.log("Google Sign-In successful:", user);
      return user;
    })
    .catch((error) => {
      console.error("Error during Google Sign-In:", error);
      throw error;
    });
};

// Get the current user
export const getCurrentUser = () => auth.currentUser;
