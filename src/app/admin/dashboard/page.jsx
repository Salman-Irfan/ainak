"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
	collection,
	onSnapshot,
	query,
	orderBy,
	doc,
	updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	Cell,
} from "recharts";
import {
	CheckCircle,
	Clock,
	Truck,
	Package,
	XCircle,
	RefreshCw,
} from "lucide-react";

const AdminDashboard = () => {
	const [orders, setOrders] = useState([]);
	const [filter, setFilter] = useState("today"); // today, week, month

	useEffect(() => {
		const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
		return onSnapshot(q, (snapshot) => {
			setOrders(
				snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
			);
		});
	}, []);

	// Status Update Handler
	const updateStatus = async (orderId, newStatus) => {
		await updateDoc(doc(db, "orders", orderId), { status: newStatus });
	};

	const statuses = [
		"pending",
		"processing",
		"confirmed",
		"shipped",
		"delivered",
		"cancelled",
	];
	const getStatusColor = (status) => {
		switch (status) {
			case "pending":
				return "bg-amber-500/10 text-amber-500 border-amber-500/20";
			case "processing":
				return "bg-blue-500/10 text-blue-500 border-blue-500/20";
			case "confirmed":
				return "bg-zinc-100/10 text-zinc-100 border-zinc-100/20"; // Fixed
			case "shipped":
				return "bg-purple-500/10 text-purple-500 border-purple-500/20";
			case "delivered":
				return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
			case "cancelled":
				return "bg-rose-500/10 text-rose-500 border-rose-500/20";
			default:
				return "bg-gray-500/10 text-gray-500 border-gray-500/20";
		}
	};
	const statusColors = {
		Pending: "#F59E0B", // Amber
		Processing: "#3B82F6", // Blue
		Confirmed: "#FFFFFF", // Zinc/White
		Shipped: "#A855F7", // Purple
		Delivered: "#10B981", // Emerald
		Cancelled: "#F43F5E", // Rose
	};
	// charts data
	const chartData = useMemo(() => {
		const now = new Date();
		const filteredOrders = orders.filter((order) => {
			// Ensure timestamp exists (Firestore timestamp to Date)
			const orderDate = order.timestamp?.toDate
				? order.timestamp.toDate()
				: new Date(order.timestamp);

			if (filter === "today") {
				return orderDate.toDateString() === now.toDateString();
			} else if (filter === "week") {
				const lastWeek = new Date(now.setDate(now.getDate() - 7));
				return orderDate >= lastWeek;
			} else {
				// month
				return (
					orderDate.getMonth() === now.getMonth() &&
					orderDate.getFullYear() === now.getFullYear()
				);
			}
		});

		// Count occurrences of each status
		return statuses.map((status) => ({
			name: status.charAt(0).toUpperCase() + status.slice(1),
			count: filteredOrders.filter(
				(o) => (o.status || "pending") === status,
			).length,
		}));
	}, [orders, filter]);
	return (
		<div className="p-8 bg-[#050A16] min-h-screen text-white">
			<h1 className="text-3xl font-bold mb-8 italic text-[#D4AF37]">
				Admin Command Center
			</h1>

			{/* Analytics Section */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
				<div className="lg:col-span-2 bg-[#0B1120] border border-gray-800 p-6 rounded-2xl">
					<div className="flex justify-between items-center mb-6">
						<h2 className="font-semibold">Order Volume</h2>
						<select
							onChange={(e) => setFilter(e.target.value)}
							className="bg-gray-900 border border-gray-700 p-2 rounded-lg">
							<option value="today">Today</option>
							<option value="week">This Week</option>
							<option value="month">This Month</option>
						</select>
					</div>
					<div className="h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={chartData}>
								<XAxis
									dataKey="name"
									stroke="#666"
									fontSize={12}
								/>
								<YAxis stroke="#666" fontSize={12} />
								<Tooltip
									cursor={{ fill: "transparent" }}
									contentStyle={{
										backgroundColor: "#0B1120",
										border: "1px solid #333",
										borderRadius: "8px",
									}}
								/>
								<Bar dataKey="count" radius={[4, 4, 0, 0]}>
									{chartData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={
												statusColors[entry.name] ||
												"#D4AF37"
											}
										/>
									))}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>

			{/* Orders Table */}
			<div className="bg-[#0B1120] border border-gray-800 rounded-2xl p-8 overflow-x-auto">
				<h2 className="text-xl font-bold mb-6">Live Order Feed</h2>
				<table className="w-full text-left">
					<thead>
						<tr className="text-gray-400 border-b border-gray-800">
							<th className="pb-4">Customer</th>
							<th className="pb-4">Product</th>
							<th className="pb-4">Status</th>
							<th className="pb-4">Action</th>
							<th className="pb-4">Details</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr
								key={order.id}
								className="border-b border-gray-800 hover:bg-white/5 transition-colors">
								<td className="py-4 font-medium">
									{order.fullName}
								</td>
								<td className="py-4 text-gray-300">
									{order.silhouette}
								</td>
								<td className="py-4">
									<span
										className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(order.status || "pending")}`}>
										{order.status || "pending"}
									</span>
								</td>
								<td className="py-4">
									<select
										className="bg-slate-700 border border-gray-700 rounded p-1 text-xs"
										onChange={(e) =>
											updateStatus(
												order.id,
												e.target.value,
											)
										}
										value={order.status || "pending"}>
										{statuses.map((s) => (
											<option key={s} value={s}>
												{s.toUpperCase()}
											</option>
										))}
									</select>
								</td>
								<td className="py-4">
									<Link
										href={`/admin/orders/${order.id}`}
										key={order.id}
										className="border rounded-xl p-2 hover:bg-gray-700 transition">
										View Details
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AdminDashboard;
