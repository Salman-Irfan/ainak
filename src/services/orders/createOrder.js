// /src/services/orders/createOrder.js

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase";

export const createOrder = async (data) => {
	await addDoc(collection(db, "orders"), {
		customerName: data.customerName,
		phone: data.phone,
		email: data.email || "",
		city: data.city,
		address: data.address,
		notes: data.notes || "",

		items: data.items,

		totalAmount: data.totalAmount,

		status: "pending",

		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp(),
	});
};