// src/app/page.tsx
import React from "react";
import HomeCarousel from "@/components/views/HomeCarousel";
import ShopByCategories from "@/components/views/ShopByCategories";
import ExploreCollections from "@/components/views/ExploreCollections";

const Home = () => {
	return (
		<>
			<HomeCarousel />
			<ShopByCategories />
			<ExploreCollections />
		</>
	);
};

export default Home;
