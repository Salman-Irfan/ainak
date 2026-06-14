"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOrderById } from "@/services/orders/getOrderById";
import { updateOrderStatus } from "@/services/orders/updateOrderStatus";
import {
	ArrowLeft,
	User,
	MapPin,
	Package,
	Calendar,
	RefreshCw,
} from "lucide-react";
import Link from "next/link";

export default function OrderDetailsPage() {
	const { id } = useParams();
	const router = useRouter();
	const [order, setOrder] = useState(null);
	const [loading, setLoading] = useState(true);
	const [updating, setUpdating] = useState(false);

	const fetchOrder = async () => {
		setLoading(true);
		const data = await getOrderById(id);
		setOrder(data);
		setLoading(false);
	};

	useEffect(() => {
		if (id) fetchOrder();
	}, [id]);

	// Robust Date Formatter to prevent .toDate() crashes
	const formatDate = (ts) => {
		if (!ts) return "N/A";
		// If it's a Firestore Timestamp object with .toDate()
		if (typeof ts.toDate === "function")
			return ts.toDate().toLocaleString();
		// If it's already a Date object
		if (ts instanceof Date) return ts.toLocaleString();
		// If it's a serialized object with seconds
		if (ts.seconds) return new Date(ts.seconds * 1000).toLocaleString();
		return "Invalid Date";
	};

	const handleStatusChange = async (newStatus) => {
		setUpdating(true);
		await updateOrderStatus(id, newStatus);
		await fetchOrder();
		setUpdating(false);
	};

	if (loading)
		return <div className="p-8 text-white">Loading order data...</div>;
	if (!order) return <div className="p-8 text-white">Order not found.</div>;

	return (
		<div className="p-8 bg-[#050A16] min-h-screen text-white">
			<Link
				href="/admin/dashboard"
				className="flex items-center text-gray-400 hover:text-[#D4AF37] mb-6 transition">
				<ArrowLeft className="mr-2" size={20} /> Back to Dashboard
			</Link>

			<div className="max-w-4xl mx-auto bg-[#0B1120] border border-gray-800 rounded-3xl p-8 shadow-2xl">
				<div className="flex justify-between items-start border-b border-gray-800 pb-6 mb-6">
					<div>
						<h1 className="text-3xl font-bold">Order #{id}</h1>
						<div className="flex items-center text-gray-400 mt-2">
							<Calendar size={16} className="mr-2" />
							{formatDate(order.timestamp)}
						</div>
					</div>
					{/* use optimistic when updating the status for better user experience */}
					<select
						className="bg-gray-900 border border-gray-700 px-4 py-2 rounded-full capitalize font-medium cursor-pointer"
						value={order.status}
						onChange={(e) => handleStatusChange(e.target.value)}
						disabled={updating}>
						{[
							"pending",
							"confirmed",
							"processing",
							"shipped",
							"delivered",
							"cancelled",
						].map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="space-y-4">
						<h3 className="flex items-center font-semibold text-[#D4AF37] mb-4">
							<User className="mr-2" size={18} /> Customer Details
						</h3>
						<p>
							<span className="text-gray-400">Name:</span>{" "}
							{order.fullName}
						</p>
						<p>
							<span className="text-gray-400">Email:</span>{" "}
							{order.email}
						</p>
						<p>
							<span className="text-gray-400">Phone:</span>{" "}
							{order.phone}
						</p>
					</div>

					<div className="space-y-4">
						<h3 className="flex items-center font-semibold text-[#D4AF37] mb-4">
							<MapPin className="mr-2" size={18} /> Shipping
							Address
						</h3>
						<p className="text-gray-300 leading-relaxed">
							{order.address}
						</p>
					</div>

					<div className="md:col-span-2 bg-gray-900/50 p-6 rounded-xl border border-gray-800">
						<h3 className="flex items-center font-semibold text-[#D4AF37] mb-4">
							<Package className="mr-2" size={18} />
							Order Specifications
						</h3>
						<div className="grid grid-cols-2 gap-4">
							{Object.entries(order).map(([key, value]) => {
								// Skip fields we handle manually or don't want to show
								if (
									[
										"fullName",
										"email",
										"phone",
										"address",
										"status",
										"timestamp",
										"id",
									].includes(key)
								)
									return null;

								return (
									<div key={key}>
										<p className="text-gray-400 text-sm capitalize">
											{key.replace(/([A-Z])/g, " $1")}
										</p>
										<p className="font-medium">
											{/* Check if the value is a date-like object/timestamp */}
											{value?.seconds ||
											typeof value?.toDate === "function"
												? formatDate(value)
												: String(value)}
										</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
