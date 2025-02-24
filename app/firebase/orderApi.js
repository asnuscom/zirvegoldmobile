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
  where,
  orderBy,
  limit,
  getCountFromServer, startAfter, QueryConstraint
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "./config";
import toast from 'react-native-toast-message';
import moment from 'moment';

const collectionName = "orders";

export const save = (newOrder) =>
  addDoc(collection(db, collectionName), newOrder);

export const saveMulti = async (order) => {
  let success = true;
  let count = 0;
  let errorList = [];

  const result = await order.imageList.map(async (image) => {
    try {
      const newOrder = {
        color: order.color,
        content: order.content,
        image: image,
        state: false,
        customerId: '',
        customerName: '',
        date: new Date().toDateString(),
      };
      await addDoc(collection(db, collectionName), newOrder).then(x => {
        count += 1;
      }).catch((err) => {
        success = false;
        toast.show({
          type: 'error',
          text1: "Siparişler oluşturulurken hata oluştu:",
          text2: err.message
        });
        errorList.push(image);
      });
    } catch (err) {
      toast.show({
        type: 'error',
        text1: "Siparişler oluşturulurken hata oluştu:",
        text2: err.message
      });
      errorList.push(image);
    }
    return image;
  });

  await Promise.all(result);

  return { success, count, errorList };
};

export const update = (id, updatedFields) => updateDoc(doc(db, collectionName, id), updatedFields);
;

export const updateMulti = async (selectedIds, updatedFields) => {
  for (const [key, value] of Object.entries(updatedFields)) {
    if (value === '') delete updatedFields[key]
  }
  await selectedIds.forEach(async (id) => {
    await updateDoc(doc(db, collectionName, id), updatedFields);
  });
};

export const onGetLinks = (callback) => {
  const unsub = onSnapshot(collection(db, collectionName), callback);
  return unsub;
};


export const getQuery = (filters, lastDoc, customerId) => {
  const queryConst = [];

  if (customerId) {
    queryConst.push(where("customerId", "==", customerId));
  }

  if (Object.entries(filters).length > 0) {
    Object.entries(filters).forEach((filter) => {

      const type = filter[0];
      const items = filter[1];

      if (type === "date" && items) {
        queryConst.push(where("date", "==", new Date(items).toDateString()));
      }
      else if (type === "customer" && items.length > 1) {
        queryConst.push(where("customerId", "in", items.map((item) => item.uid)));
      }
      else if (type === "customer" && items.length === 1) {
        queryConst.push(where("customerId", "==", items[0].uid));
      }
      else if (type === "nocustomer" && items) {
        queryConst.push(where("customerId", "==", ""));
      }
      else if (["state", "urgent"].includes(type) && items.length > 1) {
        queryConst.push(where(type, "in", items.map((item) => Boolean(item === 'true'))));
      }
      else if (["state", "urgent"].includes(type) && items.length === 1) {
        queryConst.push(where(type, "==", Boolean(items[0] === 'true')));
      }
      else if (items && items.length > 1) {
        queryConst.push(where(type, "in", items));
      }
      else if (items && items.length === 1) {
        queryConst.push(where(type, "==", items[0]));
      }
    });
  }
  queryConst.push(orderBy("customerName"));
  //if(lastDoc) queryConst.push(startAfter(lastDoc));
  return queryConst;
}

export const getList = async (orders, filters, customerId) => {
  try {

    const coll = collection(db, collectionName);
    const queryConst = getQuery(filters, orders.lastDoc, customerId);
    //const snapshot = await getCountFromServer(query(coll, ...queryConst));
    const q = query(coll, ...queryConst); //, limit(20));
    const doc = await getDocs(q);
    const newLastDoc = doc.docs[doc.docs.length - 1];
    return {
      data: [...orders.data, ...doc.docs.map((doc) => ({ ...doc.data(), id: doc.id }))],
      lastDoc: newLastDoc,
      total: doc.docs.length //snapshot.data().count
    };
  } catch (err) {
    toast.show({
      type: 'error',
      text1: "Veri çekilirken hata oluştu:",
      text2: err.message
    });
  }
};

export const getDayOrders = async (dayCount) => {
  try {
    const coll = collection(db, collectionName);
    let dayList = [];
    for (let i = dayCount; i >= 0; i--) {
      dayList.push({
        date: moment().subtract(i, 'day').toDate().toDateString(),
        totalOrderCount: 0,
        waitingOrderCount: 0,
        completedOrderCount: 0,
      });
    }

    dayList = dayList.map(async (day) => {
      const totalOrderSnapshot = await getCountFromServer(query(coll, where("date", "==", day.date)));
      const waitingOrderSnapshot = await getCountFromServer(query(coll, where("date", "==", day.date), where("state", "==", false)));
      day.totalOrderCount = totalOrderSnapshot.data().count;
      day.waitingOrderCount = waitingOrderSnapshot.data().count;
      day.completedOrderCount = day.totalOrderCount - day.waitingOrderCount;
      return day;
    });

    return Promise.all(dayList).then((values) => {
      return values;
    });

  } catch (err) {
    toast.show({
      type: 'error',
      text1: "Veri çekilirken hata oluştu:",
      text2: err.message
    });
  }
};

export const getListByCustomerId = async (id) => {
  try {
    const q = query(collection(db, collectionName), where("customerId", "==", id), orderBy("date"));
    const doc = await getDocs(q);
    return doc.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (err) {
    toast.show({
      type: 'error',
      text1: "Veri çekilirken hata oluştu:",
      text2: err.message
    });
  }
};

export const remove = (id) => deleteDoc(doc(db, collectionName, id));

export const removeMulti = (idList) => {
  idList.forEach(async (id) => {
    await deleteDoc(doc(db, collectionName, id));
  });
};

export const get = async (id) => {
  const result = await getDoc(doc(db, collectionName, id));
  return result.data();
};

