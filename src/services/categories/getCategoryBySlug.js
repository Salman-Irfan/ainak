// /src/services/categories/getCategoryBySlug.js

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

export const getCategoryBySlug = async (slug) => {

    const q = query(
        collection(db, "categories"),
        where("slug", "==", slug)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];

    const data = doc.data();

    return {
        id: doc.id,
        name: data.name,
        slug: data.slug
    };
};