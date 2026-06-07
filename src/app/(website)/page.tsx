// src/app/page.tsx
import React from "react";
import HomeCarousel from "@/components/views/HomeCarousel";
import ShopByCategories from "@/components/views/ShopByCategories";

const Home = () => {
	return (
		<>
			<HomeCarousel />
			<ShopByCategories />
		</>
	);
};

export default Home;
