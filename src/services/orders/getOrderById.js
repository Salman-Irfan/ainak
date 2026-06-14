import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { serializeFirestore } from "../../utils/serializeFirestore";

export const getOrderById = async (id) => {
	const ref = doc(db, "orders", id);
	const snap = await getDoc(ref);

	if (!snap.exists()) return null;

	return serializeFirestore({
		id: snap.id,
		...snap.data(),
		
	});
};
