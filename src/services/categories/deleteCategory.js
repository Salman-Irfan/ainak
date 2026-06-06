import { deleteDoc, doc } from "firebase/firestore";

import { db } from "@/config/firebase";

export const deleteCategory = async (categoryId) => {
	await deleteDoc(doc(db, "categories", categoryId));
};
