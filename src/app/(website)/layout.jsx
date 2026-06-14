// /src/app/(website)/layout.jsx

import { getCategories } from "@/services/categories/getCategories";

export default async function WebsiteLayout({ children }) {
	// SERVER-SIDE FETCH (NO useEffect, NO loading state)
	const categories = await getCategories();

	return (
		<>
			
			{children}
			
		</>
	);
}
