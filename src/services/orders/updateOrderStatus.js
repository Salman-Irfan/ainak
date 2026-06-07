import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase";

export const updateOrderStatus = async (orderId, status) => {
	const ref = doc(db, "orders", orderId);

	await updateDoc(ref, {
		status,
		updatedAt: serverTimestamp(),
	});
};
