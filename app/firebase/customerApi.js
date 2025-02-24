import { createUserWithEmailAndPassword, updateProfile, updatePassword } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  getCountFromServer
} from "firebase/firestore";
import { db, auth } from "./config";
import toast from 'react-native-toast-message';
import { getQuery } from "./orderApi";

const collectionName = "users";

export const newUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const updateUser = (user, displayName, photoURL) =>
  updateProfile(user, { displayName, photoURL });


export const createCustomer = async (user) => {

  try {
    const res = await createUserWithEmailAndPassword(auth, user.email, user.password);
    const userRes = res.user;
    await addDoc(collection(db, collectionName), {
      uid: userRes.uid,
      authProvider: "local",
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: "customer"
    });
    return true;
  } catch (err) {
    console.error(err);
    toast.show({
      type: 'error',
      text1: err.message
    });
    return false;
  }

}

export const updateCustomer = async (user) => {

  try {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const data = await getDocs(q);
    const docId = data.docs[0].id;
    await updateDoc(doc(db, collectionName, docId), user);
    return true;
  } catch (err) {
    console.error(err);
    toast.show({
      type: 'error',
      text1: err.message
    });
    return false;
  }

}

export const deleteCustomer = async (id) => {

  try {
    const q = query(collection(db, "users"), where("uid", "==", id));
    const data = await getDocs(q);
    const docId = data.docs[0].id;
    await deleteDoc(doc(db, collectionName, docId));
    return true;
  } catch (err) {
    console.error(err);
    toast.show({
      type: 'error',
      text1: err.message
    });
    return false;
  }

}

export const getCustomerById = async (id) => {

  try {
    debugger;
    const q = query(collection(db, "users"), where("uid", "==", id));
    const doc = await getDocs(q);
    return doc.docs[0].data();
  } catch (err) {
    console.error(err);
    toast.show({
      type: 'error',
      text1: "Kullanıcı verisi çekerken bir hata oluştu!"
    });
  }

}

export const getCustomers = async (withOrderCount, date) => {

  try {
    const q = query(collection(db, "users"), where("role", "==", "customer"));
    const doc = await getDocs(q);
    const userList = await doc.docs.map(async doc => {
      let customer = doc.data();
      if (withOrderCount) {
        let totalOrderSnapshot, waitingOrderSnapshot;
        if (date) {
          totalOrderSnapshot = await getCountFromServer(query(collection(db, "orders"), where("customerId", "==", customer.uid), where("date", "==", date)));
          waitingOrderSnapshot = await getCountFromServer(query(collection(db, "orders"), where("customerId", "==", customer.uid), where("date", "==", date), where("state", "==", false)));
        }
        else {
          totalOrderSnapshot = await getCountFromServer(query(collection(db, "orders"), where("customerId", "==", customer.uid)));
          waitingOrderSnapshot = await getCountFromServer(query(collection(db, "orders"), where("customerId", "==", customer.uid), where("state", "==", false)));
        }
        customer.totalOrderCount = totalOrderSnapshot.data().count;
        customer.waitingOrderCount = waitingOrderSnapshot.data().count;
        customer.completedOrderCount = customer.totalOrderCount - customer.waitingOrderCount;
      }
      return customer;
    });
    return Promise.all(userList).then((values) => {
      return values;
    });

  } catch (err) {
    console.error(err);
    toast.show({
      type: 'error',
      text1: "An error occured while fetching user data"
    });
  }

}
