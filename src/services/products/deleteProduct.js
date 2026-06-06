// /src/services/products/deleteProduct.js

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export const deleteProduct = async (id) => {
	await deleteDoc(doc(db, "products", id));
};
