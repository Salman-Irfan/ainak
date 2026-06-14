"use client";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";

const products = [
	{
		name: "The Midnight Silhouette",
		price: "Rs. 12,500",
		img: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80",
	},
	{
		name: "Liquid Gold Aviators",
		price: "Rs. 14,000",
		img: "https://images.unsplash.com/photo-1567473810954-507d59716c25",
	},
	{
		name: "Crystal Clear Rectangles",
		price: "Rs. 11,000",
		img: "https://images.unsplash.com/photo-1582142407894-ec85a1260a46?auto=format&fit=crop&q=80",
	},
];

export default function BestSellers() {
	return (
		<section id="best-sellers" className="py-24 bg-white">
			<Container>
				<SectionHeading
					title="The Best Sellers"
					subtitle="Signature Pieces"
				/>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
					{products.map((prod, idx) => (
						<motion.div
							key={prod.name}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.2 }}
							className="group cursor-pointer">
							<div className="bg-[#FAFAFA] aspect-[4/5] mb-6 overflow-hidden relative">
								<img
									src={prod.img}
									alt={prod.name}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
								/>
								<div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</div>
							<h4 className="text-xl font-serif text-[#0F172A] mb-2">
								{prod.name}
							</h4>
							<p className="text-[#D4AF37] tracking-wider">
								{prod.price}
							</p>
						</motion.div>
					))}
				</div>
			</Container>
		</section>
	);
}
