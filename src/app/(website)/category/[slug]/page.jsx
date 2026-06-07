// /src/app/(website)/category/[slug]/page.jsx

import { getCategoryBySlug } from "@/services/categories/getCategoryBySlug";
import { getProductsByCategory } from "../../../../services/products/getProductsByCategory";
import Link from "next/link";

export default async function CategoryPage({ params }) {
	// ✅ FIX: await params first
	const { slug } = await params;

	if (!slug) {
		return <div className="p-10 text-center">Invalid category URL</div>;
	}

	const category = await getCategoryBySlug(slug);

	if (!category) {
		return <div className="p-10 text-center">Category not found</div>;
	}
	const products = await getProductsByCategory(category.id);

	return (
		<div className="p-10">
			<h1 className="text-3xl font-bold">{category.name}</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
				{products.map((product) => (
					<div
						key={product.id}
						className="border rounded p-4 shadow-sm">
						{product.images?.[0] && (
							<img
								src={product.images[0]}
								className="w-full h-40 object-cover rounded"
							/>
						)}

						<h2 className="font-semibold mt-2">{product.name}</h2>

						<p className="text-gray-600">Rs {product.price}</p>
						
						<Link
							href={`/product/${product.id}`}
							className=" mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm"
                        >
							Read More
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
