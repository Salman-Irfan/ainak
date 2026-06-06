import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";

export const uploadImage = async (file) => {
	if (!file) return null;

	const imageRef = ref(storage, `products/${Date.now()}-${file.name}`);

	await uploadBytes(imageRef, file);

	const url = await getDownloadURL(imageRef);

	return url;
};
