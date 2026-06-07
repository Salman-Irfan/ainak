// /src/app/admin/orders/page.jsx

"use client";

import { useEffect, useState } from "react";

import { getOrders } from "@/services/orders/getOrders";
import { updateOrderStatus } from "@/services/orders/updateOrderStatus";
import Link from "next/link";

const statusColors = {
	pending: "bg-yellow-100 text-yellow-800",
	confirmed: "bg-blue-100 text-blue-800",
	processing: "bg-purple-100 text-purple-800",
	shipped: "bg-indigo-100 text-indigo-800",
	delivered: "bg-green-100 text-green-800",
	cancelled: "bg-red-100 text-red-800",
};

const AdminOrdersPage = () => {
	const [orders, setOrders] = useState([]);

	const fetchOrders = async () => {
		const data = await getOrders();
		setOrders(data);
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	const handleStatusChange = async (orderId, status) => {
		await updateOrderStatus(orderId, status);
		fetchOrders();
	};

	return (
		<div className="p-6 max-w-6xl mx-auto">
			<h1 className="text-3xl font-bold mb-6">Orders</h1>

			<div className="space-y-4">
				{orders.map((order, index) => (
					<Link
						href={`/admin/orders/${order.id}`}
						key={order.id}
						className="border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition">
                            
						{/* LEFT */}
						<div>
							<h2 className="font-bold text-lg bg-yellow-200">
								Order ID # {order.id}
							</h2>

							<p className="font-semibold">
								{order.customerName}
							</p>

							<p className="text-sm text-gray-600">
								{order.phone}
							</p>

							<p className="font-bold mt-1">
								Rs {order.totalAmount}
							</p>
						</div>

						{/* STATUS BADGE */}
						<span
							className={`px-3 py-1 rounded-full text-sm font-medium ${
								statusColors[order.status]
							}`}>
							{order.status}
						</span>

						{/* DATE */}
						<p className="text-sm text-gray-500">
							{order.createdAt?.seconds
								? new Date(
										order.createdAt.seconds * 1000,
									).toLocaleString()
								: "N/A"}
						</p>

						{/* STATUS CONTROL */}
						<select
							value={order.status}
							onChange={(e) =>
								handleStatusChange(order.id, e.target.value)
							}
							className="border p-2 rounded">
							<option value="pending">Pending</option>
							<option value="confirmed">Confirmed</option>
							<option value="processing">Processing</option>
							<option value="shipped">Shipped</option>
							<option value="delivered">Delivered</option>
							<option value="cancelled">Cancelled</option>
						</select>
					</Link>
				))}
			</div>
		</div>
	);
};

export default AdminOrdersPage;
