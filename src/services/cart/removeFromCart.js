// src/services/cart/removeFromCart.js

export const removeFromCart = (productId) => {
	const cart = JSON.parse(localStorage.getItem("cart")) || [];

	const updatedCart = cart.filter((item) => item.productId !== productId);

	localStorage.setItem("cart", JSON.stringify(updatedCart));

	window.dispatchEvent(new Event("cartUpdated"));
};
