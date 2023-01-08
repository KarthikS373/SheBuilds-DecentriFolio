import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const app = initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
})

export const storage = getStorage(app)
