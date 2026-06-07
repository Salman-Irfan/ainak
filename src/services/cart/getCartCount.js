// src/services/cart/getCartCount.js

export const getCartCount = () => {
	const cart = JSON.parse(localStorage.getItem("cart")) || [];

	return cart.reduce((total, item) => total + item.quantity, 0);
};
