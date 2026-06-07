// src/services/cart/clearCart.js

export const clearCart = () => {
	localStorage.removeItem("cart");

	window.dispatchEvent(new Event("cartUpdated"));
};
