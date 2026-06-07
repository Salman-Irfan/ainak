// /src/app/(website)/checkout/page.jsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getCart, saveCart } from "@/services/cart/cartStorage";
import { createOrder } from "@/services/orders/createOrder";

export default function CheckoutPage() {
	const router = useRouter();

	const [cart, setCart] = useState([]);

	const [form, setForm] = useState({
		customerName: "",
		phone: "",
		email: "",
		city: "",
		address: "",
		notes: "",
	});

	useEffect(() => {
		setCart(getCart());
	}, []);

	const totalAmount = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!form.customerName || !form.phone || !form.address) {
			alert("Name, Phone and Address are required");
			return;
		}

		const orderData = {
			...form,
			items: cart,
			totalAmount,
		};

		await createOrder(orderData);

		// clear cart
		saveCart([]);

		alert("Order placed successfully!");

		router.push("/");
	};

	return (
		<div className="max-w-3xl mx-auto p-6">
			
			<h1 className="text-3xl font-bold mb-6">
				Checkout
			</h1>

			<form
				onSubmit={handleSubmit}
				className="space-y-4 bg-white p-6 rounded-xl shadow"
			>
				<input
					name="customerName"
					placeholder="Full Name"
					onChange={handleChange}
					className="border p-2 w-full rounded"
				/>

				<input
					name="phone"
					placeholder="Phone Number *"
					onChange={handleChange}
					className="border p-2 w-full rounded"
				/>

				<input
					name="email"
					placeholder="Email (optional)"
					onChange={handleChange}
					className="border p-2 w-full rounded"
				/>

				<input
					name="city"
					placeholder="City"
					onChange={handleChange}
					className="border p-2 w-full rounded"
				/>

				<textarea
					name="address"
					placeholder="Full Address *"
					onChange={handleChange}
					className="border p-2 w-full rounded"
				/>

				<textarea
					name="notes"
					placeholder="Notes (optional)"
					onChange={handleChange}
					className="border p-2 w-full rounded"
				/>

				{/* ORDER SUMMARY */}
				<div className="border-t pt-4">
					<p className="font-semibold">
						Total Amount: Rs {totalAmount}
					</p>
				</div>

				<button
					type="submit"
					className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
				>
					Place Order
				</button>
			</form>
		</div>
	);
}