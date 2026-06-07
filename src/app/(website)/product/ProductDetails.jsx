// src/components/product/ProductDetails.jsx

"use client";

import { useState } from "react";

const ProductDetails = ({ product }) => {
	const [selectedImage, setSelectedImage] = useState(
		product.images?.[0] || "",
	);

	return (
		<div className="max-w-7xl mx-auto px-6 py-10">
			<div className="grid lg:grid-cols-2 gap-12">
				{/* LEFT SIDE */}
				<div>
					{/* MAIN IMAGE */}

					<div className=" overflow-hidden rounded-2xl border bg-white shadow-md">
						<img
							src={selectedImage}
							alt={product.name}
							className=" w-full h-[600px] object-cover cursor-zoom-in transition duration-500 hover:scale-110"
						/>
					</div>

					{/* THUMBNAILS */}

					{product.images?.length > 1 && (
						<div className="flex gap-3 mt-4 flex-wrap">
							{product.images.map((img, index) => (
								<button
									key={index}
									onClick={() => setSelectedImage(img)}
									className={`border-2 rounded-lg overflow-hidden w-20 h-20 transition
										${selectedImage === img ? "border-black" : "border-gray-200"}
									`}>
									<img
										src={img}
										alt=""
										className=" w-full h-full object-cover"
									/>
								</button>
							))}
						</div>
					)}
				</div>

				{/* RIGHT SIDE */}

				<div className="flex flex-col">
					<h1 className="text-4xl font-bold">{product.name}</h1>

					<p className="mt-4 text-3xl font-semibold">
						Rs {product.price}
					</p>

					<div className="mt-6">
						<span className=" inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
							In Stock ({product.stock})
						</span>
					</div>

					<hr className="my-8" />

					<div>
						<h2 className="text-xl font-semibold mb-3">
							Description
						</h2>

						<p className="text-gray-600 leading-7">
							{product.description}
						</p>
					</div>

					{/* CTA SECTION */}

					<div className=" mt-10 p-6 bg-slate-50 rounded-xl border">
						<h3 className=" font-semibold text-lg mb-4">
							Order Now
						</h3>

						<div className="flex gap-4">
							<button className=" flex-1 bg-black text-white py-4 rounded-xl font-medium hover:bg-slate-800 transition">
								Add To Cart
							</button>

							<button className=" flex-1 border py-4 rounded-xl font-medium hover:bg-slate-100 transition">
								Buy Now
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
