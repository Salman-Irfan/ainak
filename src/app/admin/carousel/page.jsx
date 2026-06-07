// /src/app/admin/carousel/page.jsx

"use client";

import { useEffect, useState } from "react";

import { addCarousel } from "@/services/carousel/addCarousel";
import { getCarousel } from "@/services/carousel/getCarousel";
import { deleteCarousel } from "@/services/carousel/deleteCarousel";
import { uploadImage } from "@/utils/uploadImage";

export default function CarouselAdmin() {
	const [items, setItems] = useState([]);
	const [file, setFile] = useState(null);
	const [title, setTitle] = useState("");

	const fetchData = async () => {
		const data = await getCarousel();
		setItems(data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleUpload = async () => {
		if (!file) return;

		const url = await uploadImage(file);

		await addCarousel({
			imageUrl: url,
			title,
		});

		setFile(null);
		setTitle("");
		fetchData();
	};

	const handleDelete = async (id) => {
		await deleteCarousel(id);
		fetchData();
	};

	return (
		<div className="p-6 max-w-4xl mx-auto">

			<h1 className="text-2xl font-bold mb-4">
				Carousel Manager
			</h1>

			{/* UPLOAD */}
			<div className="border p-4 rounded space-y-2">
				<input
					type="text"
					placeholder="Title (optional)"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="border p-2 w-full"
				/>

				<input
					type="file"
					onChange={(e) => setFile(e.target.files[0])}
				/>

				<button
					onClick={handleUpload}
					className="bg-black text-white px-4 py-2 rounded"
				>
					Add Banner
				</button>
			</div>

			{/* LIST */}
			<div className="mt-6 space-y-4">
				{items.map((item) => (
					<div
						key={item.id}
						className="border p-3 flex items-center gap-4"
					>
						<img
							src={item.imageUrl}
							className="w-24 h-16 object-cover rounded"
						/>

						<div className="flex-1">
							<p className="font-semibold">
								{item.title || "No title"}
							</p>
						</div>

						<button
							onClick={() => handleDelete(item.id)}
							className="text-red-500"
						>
							Delete
						</button>
					</div>
				))}
			</div>

		</div>
	);
}