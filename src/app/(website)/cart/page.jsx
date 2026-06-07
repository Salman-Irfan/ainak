"use client";

import { useEffect, useState } from "react";

import {
	getCart,
	removeFromCart,
	updateQuantity,
} from "@/services/cart/cartStorage";
import Link from "next/link";

export default function CartPage() {
	const [cart, setCart] = useState([]);

	const loadCart = () => {
		setCart(getCart());
	};

	useEffect(() => {
		loadCart();
	}, []);

	const handleRemove = (productId) => {
		removeFromCart(productId);
		loadCart();
	};

	const increaseQty = (item) => {
		updateQuantity(item.productId, item.quantity + 1);
		loadCart();
	};

	const decreaseQty = (item) => {
		updateQuantity(item.productId, item.quantity - 1);
		loadCart();
	};

	const total = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	return (
		<div className="max-w-6xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

			{cart.length === 0 ? (
				<div className="text-gray-500">Cart is empty</div>
			) : (
				<>
					<div className="space-y-4">
						{cart.map((item) => (
							<div
								key={item.productId}
								className="border rounded-xl p-4 flex items-center gap-4">
								<img
									src={item.image}
									className="w-24 h-24 object-cover rounded"
								/>

								<div className="flex-1">
									<h2 className="font-semibold">
										{item.name}
									</h2>

									<p>Rs {item.price}</p>

									{/* QUANTITY CONTROLS */}
									<div className="flex items-center gap-3 mt-2">
										<button
											onClick={() => decreaseQty(item)}
											className="px-3 py-1 bg-gray-200 rounded">
											-
										</button>

										<span className="font-semibold">
											{item.quantity}
										</span>

										<button
											onClick={() => increaseQty(item)}
											className="px-3 py-1 bg-gray-200 rounded">
											+
										</button>
									</div>
								</div>

								<button
									onClick={() => handleRemove(item.productId)}
									className="bg-red-500 text-white px-4 py-2 rounded">
									Remove
								</button>
							</div>
						))}
					</div>

					<div className="mt-8 flex items-center justify-between">
						<h2 className="text-2xl font-bold">
							Total: Rs {total}
						</h2>
						<Link 
							href={`/checkout`}
							className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
						>
								Proceed to Checkout →

						</Link>
					</div>
				</>
			)}
		</div>
	);
}
