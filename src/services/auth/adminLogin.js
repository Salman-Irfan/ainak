// services/auth/adminLogin.ts
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

export const adminLogin = async (email, password) => {
	return await signInWithEmailAndPassword(auth, email, password);
};
