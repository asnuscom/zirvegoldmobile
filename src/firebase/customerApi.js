import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import {db, auth, userDb} from './config';
import firestore from '@react-native-firebase/firestore';

const collectionName = 'users';

// export const newUser = (email, password) =>
//   createUserWithEmailAndPassword(auth, email, password);

// export const updateUser = (user, displayName, photoURL) =>
//   updateProfile(user, {displayName, photoURL});

export const getCustomerById = async id => {
  try {
    return userDb
      .where('uid', '==', id)
      .get()
      .then(querySnapshot => {
        return querySnapshot.docs[0].data();
      });
  } catch (err) {
    console.error(err);
    alert('An error occured while fetching user data');
  }
};

// export const createCustomer = async (user) => {

//   try {
//     const res = await createUserWithEmailAndPassword(auth, user.email, user.password);
//     const userRes = res.user;
//     await addDoc(collection(db, collectionName), {
//       uid: userRes.uid,
//       authProvider: "local",
//       email: user.email,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       role: "customer"
//     });
//     return true;
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//     return false;
//   }

// }

// export const updateCustomer = async (user) => {

//   try {
//     const q = query(collection(db, "users"), where("uid", "==", user.uid));
//     const data = await getDocs(q);
//     const docId = data.docs[0].id;
//     await updateDoc(doc(db, collectionName, docId), user)
//     return true;
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//     return false;
//   }

// }

// export const deleteCustomer = async (id) => {

//   try {
//     const q = query(collection(db, "users"), where("uid", "==", id));
//     const data = await getDocs(q);
//     const docId = data.docs[0].id;
//     await deleteDoc(doc(db, collectionName, docId));
//     return true;
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//     return false;
//   }

// }

export const getCustomers = async id => {
  try {
    userDb
      .where('role', '==', 'customer')
      .get()
      .then(querySnapshot => {
        return querySnapshot.docs.map(doc => doc.data());
      });
  } catch (err) {
    console.error(err);
    alert('An error occured while fetching user data');
  }
};
