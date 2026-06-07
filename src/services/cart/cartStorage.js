const CART_KEY = "cart";

// get cart
export const getCart = () => {
	const cart = localStorage.getItem(CART_KEY);
	return cart ? JSON.parse(cart) : [];
};

// save cart
export const saveCart = (cart) => {
	localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// add item
export const addToCart = (product) => {
	const cart = getCart();

	const existing = cart.find((item) => item.productId === product.productId);

	if (existing) {
		existing.quantity += 1;
	} else {
		cart.push({ ...product, quantity: 1 });
	}

	saveCart(cart);
};

// remove item completely
export const removeFromCart = (productId) => {
	const cart = getCart().filter((item) => item.productId !== productId);
	saveCart(cart);
};

// update quantity (MOST IMPORTANT)
export const updateQuantity = (productId, quantity) => {
	let cart = getCart();

	cart = cart.map((item) =>
		item.productId === productId
			? { ...item, quantity: Math.max(1, quantity) }
			: item,
	);

	saveCart(cart);
};
