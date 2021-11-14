import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAkWNzhYRIE6WSaxUP9tz1uJjNNQDiD_uw",
  authDomain: "bookit-46dd0.firebaseapp.com",
  projectId: "bookit-46dd0",
  storageBucket: "bookit-46dd0.appspot.com",
  messagingSenderId: "682746419280",
  appId: "1:682746419280:web:4a68e3032fb3638b689955",
  measurementId: "G-ML84HXL1DE",
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
