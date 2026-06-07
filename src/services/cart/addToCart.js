// src/services/cart/addToCart.js

export const addToCart = (product) => {
	const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

	const existingProduct = existingCart.find(
		(item) => item.productId === product.productId,
	);

	if (existingProduct) {
		existingProduct.quantity += 1;
	} else {
		existingCart.push({
			productId: product.productId,
			name: product.name,
			price: product.price,
			image: product.image,
			quantity: 1,
		});
	}

	localStorage.setItem("cart", JSON.stringify(existingCart));

	window.dispatchEvent(new Event("cartUpdated"));
};
