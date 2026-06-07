import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";

export const getProductsByCategory = async (categoryId) => {
	if (!categoryId) return [];

	const q = query(
		collection(db, "products"),
		where("categoryId", "==", categoryId),
	);

	const snapshot = await getDocs(q);

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
};
