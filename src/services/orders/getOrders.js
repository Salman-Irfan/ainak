import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/config/firebase";
import { serializeFirestore } from "../../utils/serializeFirestore";

export const getOrders = async () => {
	const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

	const snapshot = await getDocs(q);

	return snapshot.docs.map((doc) => serializeFirestore(({
		id: doc.id,
		...doc.data(),
	})));
};
