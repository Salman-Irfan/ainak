// /src/services/products/updateProduct.js

import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase";

export const updateProduct = async (id, data) => {
	const ref = doc(db, "products", id);

	await updateDoc(ref, {
		...data,
		updatedAt: serverTimestamp(),
	});
};
