import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import HeroSection from "@/components/sections/HeroSection";
import HomeCarousel from "@/components/views/HomeCarousel";
import About from "@/components/views/About";
import FeaturedCollections from "@/components/sections/FeaturedCollections";
import WhyChooseElyz from "@/components/sections/WhyChooseElyz";
import VirtualTryOn from "@/components/sections/VirtualTryOn";
import BestSellers from "@/components/sections/BestSellers";
import OurProcess from "@/components/sections/OurProcess";
import FAQ from "@/components/sections/FAQ";
import PlaceOrder from "@/components/sections/PlaceOrder";

export const metadata = {
	title: "ELYZ Studio | Premium Eyewear",
	description:
		"Your Vision. Your Design. Discover luxury customizable magnetic eyewear from Pakistan.",
};

export default function Home() {
	return (
		<main className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-[#D4AF37] selection:text-white">
			<Navbar />
			<HomeCarousel />
			<HeroSection />
			<About/>
			<FeaturedCollections />
			<WhyChooseElyz />
			{/* <VirtualTryOn /> */}
			<BestSellers />
			<OurProcess />
			<FAQ />
			<PlaceOrder />
			<Footer />
		</main>
	);
}
