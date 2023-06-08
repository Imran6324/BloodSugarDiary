import React, { useContext, useEffect, useState, createContext } from "react";
import { auth, db } from "../firebase/firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }
  const d = {
    dob: "",
    gender: "",
    bloodGroup: "",
    Consultant: "",
    phNumber: "",
    location: "",
    address: "",
    lastAppointment: "not set",
    nextAppointment: "not set",
    carePoints: [],
    medicineList: [],
    Avatar: {
      avatar: "",
      avatarPath: "",
    },
  };
  function addUser(user) {
    return addDoc(collection(db, "user"), {
      ...user,
      ...d,
      jointime: new serverTimestamp(),
      uId: auth.currentUser.uid,
    });
  }

  // All Records CRUD Section ///////////////////////////////////////////////////////////////////////

  function addRecord(record) {
    let defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 3);
    let d = defaultDate.toLocaleDateString("en-CA");
    return addDoc(
      collection(doc(db, "allRecord", auth.currentUser.uid), "records"),
      { ...record, creationDate: d, lastUpdated: d }
    );
  }

  function updateRecord(record) {
    let defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 3);
    const recRef = doc(
      db,
      "allRecord",
      auth.currentUser.uid,
      "records",
      record.docId
    );
    // const q = query(recRef, where("id", "==", `${record.d}`));
    return updateDoc(recRef, {
      ...record,
      lastUpdated: defaultDate.toLocaleDateString("en-CA"),
    });
  }

  function deleteRecord(record) {
    const docRef = doc(
      db,
      "allRecord",
      auth.currentUser.uid,
      "records",
      record
    );
    return deleteDoc(docRef);
  }

  async function updateCurrentRecord(record, filename) {
    await getDocs(collection(db, "user"))
      .then((snapshot) => {
        snapshot.docs.forEach((user) => {
          if (user.data().uId === `${auth.currentUser.uid}`) {
            console.log(user.id);
            if (record === "Random")
              return updateDoc(doc(db, "user", `${user.id}`), {
                currentRandom: filename,
              });
            else
              return updateDoc(doc(db, "user", `${user.id}`), {
                currentRoutine: filename,
              });
          }
        });
      })
      .catch((err) => {
        console.log(err.message);
        return err.message;
      });
  }

  // Routine Record Table CRUD Section ///////////////////////////////////////////////////////////////////////

  function addRoutineResult(record, recordId) {
    let defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 3);
    let d = defaultDate.toLocaleDateString("en-CA");
    return addDoc(
      collection(doc(db, "allRoutineResult", auth.currentUser.uid), recordId),
      { ...record, creationDate: d, lastUpdated: d }
    );
  }

  function updateRoutineResult(record, recordId) {
    let defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 3);
    const recRef = doc(
      db,
      "allRoutineResult",
      auth.currentUser.uid,
      recordId,
      record.docId
    );
    return updateDoc(recRef, {
      ...record,
      lastUpdated: defaultDate.toLocaleDateString("en-CA"),
    });
  }
  function deleteRoutineResult(record, recordId) {
    const docRef = doc(
      db,
      "allRoutineResult",
      auth.currentUser.uid,
      recordId,
      record
    );
    return deleteDoc(docRef);
  }

  // Random Record Table CRUD Section ///////////////////////////////////////////////////////////////////////

  function addRandomResult(record, recordId) {
    let defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 3);
    let d = defaultDate.toLocaleDateString("en-CA");
    return addDoc(
      collection(doc(db, "allRandomResult", auth.currentUser.uid), recordId),
      { ...record, creationDate: d, lastUpdated: d }
    );
  }

  function updateRandomResult(record, recId) {
    let defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 3);
    const recRef = doc(
      db,
      "allRandomResult",
      auth.currentUser.uid,
      recId,
      record.docId
    );
    return updateDoc(recRef, {
      ...record,
      lastUpdated: defaultDate.toLocaleDateString("en-CA"),
    });
  }
  function deleteRandomResult(record, recId) {
    const docRef = doc(
      db,
      "allRandomResult",
      auth.currentUser.uid,
      recId,
      record
    );
    return deleteDoc(docRef);
  }

  // Direct test result add functionality ///////////////////////////////////////////////////////////////////////

  async function addDirectResult(result) {
    let defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 3);
    let d = defaultDate.toLocaleDateString("en-CA");
    if (result.readingType === "Random") {
      const recRef = collection(
        doc(db, "allRandomResult", auth.currentUser.uid),
        result.docId
      );
      return addDoc(recRef, { ...result, creationDate: d, lastUpdated: d });
    } else {
      // const recRef = collection(doc(db,'allRoutineResult',auth.currentUser.uid),result.docId);
      // return addDoc(recRef, {...result,creationDate:d,lastUpdated:d})

      const q = collection(
        doc(db, "allRoutineResult", auth.currentUser.uid),
        result.docId
      );
      let flag = false;
      let uid = "";
      await getDocs(q)
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            // if (doc.data().testDate === result.testDate) { // line was buggy
            if (doc.data().testDate === result.testDate) {
              flag = true;
              uid = doc.id;
              console.log(uid)
            }
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
      if (flag === false) {
        let testResult = {
          id: result.id,
          testDate: result.testDate,
          Bfast: `${result.readingType === "Bfast" ? result.result : ""}`,
          Bpp: `${result.readingType === "Bpp" ? result.result : ""}`,
          Lfast: `${result.readingType === "Lfast" ? result.result : ""}`,
          Lpp: `${result.readingType === "Lpp" ? result.result : ""}`,
          Dfast: `${result.readingType === "Dfast" ? result.result : ""}`,
          Dpp: `${result.readingType === "Dpp" ? result.result : ""}`,
          description: result.description,
          creationDate: d,
          lastUpdated: d,
        };
        return addDoc(
          collection(
            doc(db, "allRoutineResult", auth.currentUser.uid),
            result.docId
          ),
          testResult
        );
      } else {
        console.log("Doc exist");
        const recRef = doc(db,"allRoutineResult",auth.currentUser.uid,result.docId,uid
        );
        if (result.readingType === "Bfast")
          return updateDoc(recRef, {
            lastUpdated: defaultDate.toLocaleDateString("en-CA"),
            Bfast: result.result,
            BfastTime: result.testTime,
          });
        else if (result.readingType === "Bpp")
          return updateDoc(recRef, {
            lastUpdated: defaultDate.toLocaleDateString("en-CA"),
            Bpp: result.result,
            BppTime: result.testTime,
          });
        else if (result.readingType === "Lfast")
          return updateDoc(recRef, {
            lastUpdated: defaultDate.toLocaleDateString("en-CA"),
            Lfast: result.result,
            LfastTime: result.testTime,
          });
        else if (result.readingType === "Lpp")
          return updateDoc(recRef, {
            lastUpdated: defaultDate.toLocaleDateString("en-CA"),
            Lpp: result.result,
            LppTime: result.testTime,
          });
        else if (result.readingType === "Dfast")
          return updateDoc(recRef, {
            lastUpdated: defaultDate.toLocaleDateString("en-CA"),
            Dfast: result.result,
            DfastTime: result.testTime,
          });
        else if (result.readingType === "Dpp")
          return updateDoc(recRef, {
            lastUpdated: defaultDate.toLocaleDateString("en-CA"),
            Dpp: result.result,
            DppTime: result.testTime,
          });
      }
    }
  }

  ////////////////////////PROFILE SECTION////////////////////////////////////////

  async function updateUserProfile(userData) {
    await getDocs(collection(db, "user"))
      .then((snapshot) => {
        snapshot.docs.forEach((user) => {
          if (user.data().uId === `${auth.currentUser.uid}`) {
            console.log(user.id, userData);
            updateDoc(doc(db, "user", `${user.id}`), userData);
          }
        });
      })
      .catch((err) => {
        console.log(err.message);
        return err.message;
      });
  }

  async function updateMedicines(Data) {
    await getDocs(collection(db, "user"))
      .then((snapshot) => {
        snapshot.docs.forEach((user) => {
          if (user.data().uId === `${auth.currentUser.uid}`) {
            updateDoc(doc(db, "user", `${user.id}`), { medicineList: Data });
          }
        });
      })
      .catch((err) => {
        console.log(err.message);
        return err.message;
      });
  }

  async function updateProfileImg(Data) {
    await getDocs(collection(db, "user"))
      .then((snapshot) => {
        snapshot.docs.forEach((user) => {
          if (user.data().uId === `${auth.currentUser.uid}`) {
            updateDoc(doc(db, "user", `${user.id}`), { Avatar: Data });
          }
        });
      })
      .catch((err) => {
        console.log(err.message);
        return err.message;
      });
  }

  async function updateCarePoints(Data) {
    await getDocs(collection(db, "user"))
      .then((snapshot) => {
        snapshot.docs.forEach((user) => {
          if (user.data().uId === `${auth.currentUser.uid}`) {
            updateDoc(doc(db, "user", `${user.id}`), { carePoints: Data });
          }
        });
      })
      .catch((err) => {
        console.log(err.message);
        return err.message;
      });
  }

  /////////////////RESPONSE///////////////////////////////

  function sentResponse(data) {
    return addDoc(collection(db, "responses"), data);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    signUp,
    logIn,
    logOut,
    currentUser,
    addUser,
    resetPassword,
    addRecord,
    updateRecord,
    deleteRecord,
    addRoutineResult,
    updateRoutineResult,
    deleteRoutineResult,
    addRandomResult,
    updateRandomResult,
    deleteRandomResult,
    addDirectResult,
    updateCurrentRecord,
    updateUserProfile,
    updateMedicines,
    updateCarePoints,
    updateProfileImg,
    sentResponse,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
export function useAuth() {
  return useContext(AuthContext);
}
