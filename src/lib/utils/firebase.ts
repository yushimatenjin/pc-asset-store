import { firebaseConfig } from "./../../constants/firebase";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
export const auth = firebase.auth;
export const db = firebase.firestore();
export const storage = firebase.storage;
