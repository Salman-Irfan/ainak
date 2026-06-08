// src/app/page.tsx
import React from "react";
import HomeCarousel from "@/components/views/HomeCarousel";
import About from "@/components/views/About";
import ShopByCategories from "@/components/views/ShopByCategories";
import ExploreCollections from "@/components/views/ExploreCollections";

const Home = () => {
	return (
		<>
			<HomeCarousel />
			<About />
			<ShopByCategories />
			<ExploreCollections />

		</>
	);
};

export default Home;
