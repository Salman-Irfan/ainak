import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

import { db } from "@/config/firebase";
import generateSlug from "../../utils/generateSlug";

export const updateCategory = async (categoryId, categoryName) => {
	const categoryRef = doc(db, "categories", categoryId);

	await updateDoc(categoryRef, {
		name: categoryName,
		slug: generateSlug(categoryName),
		updatedAt: serverTimestamp(),
	});
};
