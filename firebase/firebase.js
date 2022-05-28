import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // apiKey: "AIzaSyButGmLABh8aSNYasU9PbROUTYFPbs28NE",
  // authDomain: "bookit-9a9e7.firebaseapp.com",
  // projectId: "bookit-9a9e7",
  // storageBucket: "bookit-9a9e7.appspot.com",
  // messagingSenderId: "494465565116",
  // appId: "1:494465565116:web:3dd8c12ea7429c75946bb9",
  // measurementId: "G-MPV074TW98",
  apiKey: "AIzaSyDrY-kGKx9ZuWM-BpZ_hQWqU31jiMvGnzA",
  authDomain: "bookit2-4366a.firebaseapp.com",
  projectId: "bookit2-4366a",
  storageBucket: "bookit2-4366a.appspot.com",
  messagingSenderId: "737226120698",
  appId: "1:737226120698:web:46f22a3305ff333a03d843",
  measurementId: "G-QRKRMD1D26"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function uploadToStorage(folder, file) {
  try {
    const originalname = file.originalname.split(".");
    const fileName =
      originalname[0] +
      Math.random().toFixed(5).toString() +
      "." +
      originalname[1];
    const storageRef = ref(storage, `${folder}/${fileName}`);
    const snapshot = await uploadBytes(storageRef, file.buffer, {
      contentType: file.mimetype,
    });

    const downloadUrl = await getDownloadURL(snapshot.ref);
    const avatar = { avatarUrl: downloadUrl, fullPath: snapshot.ref.fullPath };
    return avatar;
  } catch (err) {
    throw err;
  }
}
export async function uploadToStorageRoomImage(folder, file) {
  try {
    const originalname = file.originalname.split(".");
    const fileName =
      originalname[0] +
      Math.random().toFixed(5).toString() +
      "." +
      originalname[1];
    const storageRef = ref(storage, `${folder}/${fileName}`);
    const snapshot = await uploadBytes(storageRef, file.buffer, {
      contentType: file.mimetype,
    });

    const downloadUrl = await getDownloadURL(snapshot.ref);
    return { url: downloadUrl, public_id: snapshot.ref.fullPath };
  } catch (err) {
    throw err;
  }
}

export async function deleteFromStorage(fullPath) {
  try {
    if (fullPath === "avatarImages/defaultAvatar.png") return;
    await deleteObject(ref(storage, fullPath));
  } catch (err) {
    throw err;
  }
}
