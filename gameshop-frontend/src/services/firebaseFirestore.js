import { db } from "../config/firebaseConfig";
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Guardar datos
export const saveData = async (collection, id, data) => {
  try {
    await setDoc(doc(db, collection, id), data);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Obtener datos
export const getData = async (collection, id) => {
  try {
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("Documento no encontrado");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Actualizar datos
export const updateData = async (collection, id, newData) => {
  try {
    const docRef = doc(db, collection, id);
    await updateDoc(docRef, newData);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Eliminar datos
export const deleteData = async (collection, id) => {
  try {
    const docRef = doc(db, collection, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};
