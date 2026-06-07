// /src/app/admin/orders/[id]/page.jsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getOrderById } from "@/services/orders/getOrderById";
import { updateOrderStatus } from "@/services/orders/updateOrderStatus";

const statusOptions = [
	"pending",
	"confirmed",
	"processing",
	"shipped",
	"delivered",
	"cancelled",
];

export default function OrderDetailsPage() {
	const { id } = useParams();

	const [order, setOrder] = useState(null);
	const [loading, setLoading] = useState(true);

	const fetchOrder = async () => {
		setLoading(true);
		const data = await getOrderById(id);
		setOrder(data);
		setLoading(false);
	};

	useEffect(() => {
		if (id) fetchOrder();
	}, [id]);

	const handleStatusChange = async (status) => {
		await updateOrderStatus(id, status);
		fetchOrder();
	};

	if (loading) {
		return <div className="p-6">Loading...</div>;
	}

	if (!order) {
		return <div className="p-6">Order not found</div>;
	}

	return (
		<div className="max-w-5xl mx-auto p-6 space-y-6">

			<h1 className="text-3xl font-bold">
				Order Details
			</h1>

			{/* CUSTOMER INFO */}
			<div className="border rounded-xl p-4">
				<h2 className="font-bold text-lg mb-2">
					Customer Info
				</h2>

				<p><b>Name:</b> {order.customerName}</p>
				<p><b>Phone:</b> {order.phone}</p>
				<p><b>Email:</b> {order.email || "N/A"}</p>
			</div>

			{/* SHIPPING */}
			<div className="border rounded-xl p-4">
				<h2 className="font-bold text-lg mb-2">
					Shipping Address
				</h2>

				<p>{order.address}</p>
				<p>{order.city}</p>
				<p>{order.notes}</p>
			</div>

			{/* STATUS */}
			<div className="border rounded-xl p-4">
				<h2 className="font-bold text-lg mb-2">
					Order Status
				</h2>

				<select
					value={order.status}
					onChange={(e) =>
						handleStatusChange(e.target.value)
					}
					className="border p-2 rounded"
				>
					{statusOptions.map((s) => (
						<option key={s} value={s}>
							{s}
						</option>
					))}
				</select>
			</div>

			{/* PRODUCTS */}
			<div className="border rounded-xl p-4">
				<h2 className="font-bold text-lg mb-4">
					Products Ordered
				</h2>

				<div className="space-y-4">
					{order.items?.map((item) => (
						<div
							key={item.productId}
							className="flex items-center gap-4 border p-3 rounded"
						>
							<img
								src={item.image}
								className="w-16 h-16 object-cover rounded"
							/>

							<div className="flex-1">
								<p className="font-semibold">
									{item.name}
								</p>

								<p className="text-sm text-gray-600">
									Rs {item.price} × {item.quantity}
								</p>
							</div>

							<p className="font-bold">
								Rs {item.price * item.quantity}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* TOTAL */}
			<div className="border rounded-xl p-4 flex justify-between">
				<h2 className="text-xl font-bold">
					Total
				</h2>

				<h2 className="text-xl font-bold">
					Rs {order.totalAmount}
				</h2>
			</div>
		</div>
	);
}