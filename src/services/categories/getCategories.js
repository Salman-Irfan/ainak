import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

export const getCategories = async () => {

    const snapshot = await getDocs(
        collection(db, "categories")
    );

    return snapshot.docs.map((doc) => {

        const data = doc.data();

        return {
            id: doc.id,
            name: data.name || "",
            slug: data.slug || "",

            // convert Firestore Timestamp → string
            createdAt: data.createdAt
                ? data.createdAt.toDate().toISOString()
                : null,

            updatedAt: data.updatedAt
                ? data.updatedAt.toDate().toISOString()
                : null,
        };
    });
};