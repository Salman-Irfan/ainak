import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "@/config/firebase";

import { uploadImage } from "@/utils/uploadImage";
import generateSlug from "@/utils/generateSlug";

export const addProduct = async (data, files) => {
	const imageUrls = [];

	for (let file of files) {
		const url = await uploadImage(file);
		if (url) imageUrls.push(url);
	}

	await addDoc(collection(db, "products"), {
		name: data.name,
		slug: generateSlug(data.name),
		description: data.description,
		price: Number(data.price),
		categoryId: data.categoryId,
		categoryName: data.categoryName,
		stock: Number(data.stock),
		images: imageUrls,
		isActive: true,
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp(),
	});
};
