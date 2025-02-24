import { ref, uploadBytesResumable, getDownloadURL, list, getMetadata, deleteObject } from "firebase/storage";
import { db, storage } from "./config";
import toast from 'react-native-toast-message';

export const uploadImage = (file, setPercent, setUrl) => {
  const storageRef = ref(storage, `/images/${file.name}`);

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

export const uploadMultiImage = (files, setPercent, setMultiUrl) => {

  if (files.length > 0) {
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const storageRef = ref(storage, `/images/${file.name}`);

      try {
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setPercent(percent);
          },
          (err) =>
            toast.show({
              type: 'error',
              text1: err
            })
          ,
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            setMultiUrl(url);
          }
        );
      }
      catch (err) {
        toast.show({
          type: 'error',
          text1: err.message
        });
      }
    }
  }

};

export const getFiles = (setFileList, repo, nextPageToken, setNextPageToken, displayImages) => {

  const listRef = ref(storage, repo);
  const listOptions = {
    maxResults: 50,
    pageToken: nextPageToken,
  };
  return list(listRef, listOptions)
    .then(res => {
      res.items.forEach((item) => {
        getMetadata(item)
          .then((metadata) => {
            if (displayImages) {
              getDownloadURL(item).then((url) => {
                setFileList(arr => [...arr, { name: item.name, url: url, createdDate: metadata.timeCreated, size: metadata.size }]);
              });
            }
            else {
              setFileList(arr => [...arr, { name: item.name, createdDate: metadata.timeCreated, size: metadata.size }]);
            }
          });
      });
      setNextPageToken(res.nextPageToken);
      if (!res.nextPageToken) {
        toast.info("Tüm dosyalar getirildi.");
      }
    })
    .catch(err => {
      toast.show({
        type: 'error',
        text1: err.message
      });
    })

};

export const deleteFile = async (file, repo) => {
  let isSuccess = false;
  const desertRef = ref(storage, `/${repo}/${file.name}`);
  await deleteObject(desertRef).then(() => {
    isSuccess = true;
  }).catch((err) => {
    toast.show({
      type: 'error',
      text1: err.message
    });
    isSuccess = false;
  });
  return isSuccess;
};

export const deleteMultiFiles = async (fileList, days, repo) => {
  let deleteFileList = fileList.filter(file => new Date(file.createdDate).getTime() < new Date().getTime() - (24 * 60 * 60 * 1000) * days);
  let successFileCount = deleteFileList.length;

  let result = await deleteFileList.map(async (file) => {
    const desertRef = ref(storage, `/${repo}/${file.name}`);
    await deleteObject(desertRef).catch((err) => {
      toast.show({
        type: 'error',
        text1: err.message
      });
      successFileCount -= 1;
    });
    return file;
  });
  return successFileCount;
};