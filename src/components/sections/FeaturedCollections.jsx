"use client";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";

const collections = [
	{
		title: "Eye Glasses",
		image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80",
	},
	{
		title: "Sun Glasses",
		image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80",
	},
	{
		title: "Contact Lenses",
		image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80",
	},
];

export default function FeaturedCollections() {
	return (
		<section id="collections" className="py-24 bg-[#FAFAFA]">
			<Container>
				<SectionHeading
					title="The Collections"
					subtitle="Curated For Excellence"
				/>

				{/* Integrating products.jpeg as the banner for Custom Vision Studio */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-16 rounded-xl overflow-hidden shadow-2xl relative">
					<img
						src="products.jpeg"
						alt="ELYZ Custom Vision Studio - Design Your Own"
						className="w-full object-cover"
					/>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{collections.map((item, index) => (
						<motion.div
							key={item.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.2, duration: 0.6 }}
							className="group relative h-96 overflow-hidden bg-gray-200">
							<img
								src={item.image}
								alt={item.title}
								className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent transition-opacity duration-300" />
							<div className="absolute bottom-8 left-8">
								<h3 className="text-2xl font-serif text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
									{item.title}
								</h3>
								<div className="w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-500 ease-out" />
							</div>
						</motion.div>
					))}
				</div>
			</Container>
		</section>
	);
}
