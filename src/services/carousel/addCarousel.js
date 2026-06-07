import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase";

export const addCarousel = async (data) => {
	await addDoc(collection(db, "carousel"), {
		imageUrl: data.imageUrl,
		title: data.title || "",
		link: data.link || "",
		isActive: true,
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp(),
	});
};
