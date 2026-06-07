// /src/app/(website)/product/[id]/page.jsx

import { getProductById } from "@/services/products/getProductById";
import ProductDetails from "../ProductDetails";

export default async function ProductPage({ params }) {
	const { id } = await params;

	const product = await getProductById(id);

	if (!product) {
		return <div className="p-10 text-center">Product not found</div>;
	}

	return (
		<>
			<ProductDetails product={product} />
		</>
	);
}
