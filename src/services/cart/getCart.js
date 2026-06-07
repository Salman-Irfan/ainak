// src/services/cart/getCart.js

export const getCart = () => {
	if (typeof window === "undefined") {
		return [];
	}

	return JSON.parse(localStorage.getItem("cart")) || [];
};
