import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "@/config/firebase";

export const addCategory = async (categoryName) => {
	await addDoc(collection(db, "categories"), {
		name: categoryName,
		slug: categoryName.toLowerCase().replace(/\s+/g, "-"),

		createdAt: serverTimestamp(),

		updatedAt: serverTimestamp(),
	});
};
