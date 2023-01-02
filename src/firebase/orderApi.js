import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "./config";

const collectionName = "orders";

export const save = (newOrder) =>
  addDoc(collection(db, collectionName), newOrder);

export const update = (id, updatedFields) => {
  updateDoc(doc(db, collectionName, id), updatedFields)
};

export const onGetLinks = (callback) => {
  const unsub = onSnapshot(collection(db, collectionName), callback);
  return unsub;
};

export const getList = async () => {
  try {
    const doc = await getDocs(collection(db, collectionName));
    return doc.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (err) {
    console.error(err);
    alert("An error occured while fetching order list data");
  }
};

export const getListByCustomerId = async (id) => {
  try {
    const q = query(collection(db, collectionName), where("customerId", "==", id));
    const doc = await getDocs(q);
    return doc.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (err) {
    console.error(err);
    alert("An error occured while fetching order list data");
  }
};

export const remove = (id) => deleteDoc(doc(db, collectionName, id));

export const get = async (id) => {
  const result = await getDoc(doc(db, collectionName, id));
  return result.data();
};

export const uploadImage = (file, setPercent, setUrl) => {
  const storageRef = ref(storage, `/files/${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      setPercent(percent);
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        setUrl(url);
      });
    }
  );

};