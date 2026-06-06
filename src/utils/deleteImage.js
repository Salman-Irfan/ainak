// /src/utils/deleteImages.js

import { ref, deleteObject } from "firebase/storage";
import { storage } from "@/config/firebase";

/**
 * Firebase Storage URL se path extract karke image delete karta hai.
 * URL format: https://firebasestorage.googleapis.com/v0/b/<bucket>/o/<encoded-path>?alt=media&token=...
 */
export const deleteImages = async (imageUrls = []) => {
	for (const url of imageUrls) {
		try {
			const decodedPath = decodeURIComponent(
				url.split("/o/")[1].split("?")[0]
			);
			const imageRef = ref(storage, decodedPath);
			await deleteObject(imageRef);
		} catch (err) {
			console.error("Image delete failed:", url, err);
		}
	}
};