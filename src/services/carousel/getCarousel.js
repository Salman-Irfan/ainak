import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";

export const getCarousel = async () => {
	const q = query(collection(db, "carousel"), where("isActive", "==", true));

	const snap = await getDocs(q);

	return snap.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
};
