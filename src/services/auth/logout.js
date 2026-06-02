import { signOut } from "firebase/auth";

import { auth } from "@/config/firebase";

export const logout = async () => {
	await signOut(auth);
};
