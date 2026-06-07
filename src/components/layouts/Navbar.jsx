// src/components/layouts/Navbar.jsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCartCount } from "@/services/cart/getCartCount";

const Navbar = ({ categories = [] }) => {
	const [cartCount, setCartCount] = useState(0);
	
	useEffect(() => {
		const updateCount = () => {
			setCartCount(getCartCount());
		};

		updateCount();

		window.addEventListener("cartUpdated", updateCount);

		return () => {
			window.removeEventListener("cartUpdated", updateCount);
		};
	}, []);

	return (
		<header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg border-b border-slate-700">
			<div className="max-w-7xl mx-auto px-6">
				<div className="h-18 flex items-center justify-between px-4">
					{/* Logo */}
					<Link
						href="/"
						className="text-2xl font-bold tracking-wide text-white hover:text-slate-300 transition">
						AINAK
					</Link>

					{/* Navigation */}
					<nav className="hidden lg:flex items-center gap-10">
						<Link
							href="/"
							className="text-white font-medium hover:text-slate-300 transition">
							Home
						</Link>

						{categories.map((category) => (
							<Link
								key={category.id}
								href={`/category/${category.slug}`}
								className="text-white font-medium hover:text-slate-300 transition px-3">
								{category.name}
							</Link>
						))}
					</nav>

					{/* Actions */}
					<div className="flex items-center gap-4">
						<button className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
							Search
						</button>

						<Link href="/cart" className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
							🛒 Cart ({cartCount})
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
