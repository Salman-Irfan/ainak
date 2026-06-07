// /src/app/(website)/layout.jsx

import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { getCategories } from "@/services/categories/getCategories";

export default async function WebsiteLayout({ children }) {
	// SERVER-SIDE FETCH (NO useEffect, NO loading state)
	const categories = await getCategories();

	return (
		<>
			<Navbar categories={categories} />
			{children}
			<Footer />
		</>
	);
}
