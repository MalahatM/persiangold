import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

export const updateProduct = async (
  id: string,
  data: { price?: number; imageUrl?: string; name?: string; category?: string; description?: string }
) => {
  const productRef = doc(db, "products", id);
  await updateDoc(productRef, data);
};

export const addProduct = async (data: {
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
}) => {
  const ref = await addDoc(collection(db, "products"), data);
  return ref.id;
};

export const deleteProduct = async (id: string) => {
  const productRef = doc(db, "products", id);
  await deleteDoc(productRef);
};