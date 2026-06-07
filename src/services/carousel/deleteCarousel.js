import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export const deleteCarousel = async (id) => {
	await deleteDoc(doc(db, "carousel", id));
};
