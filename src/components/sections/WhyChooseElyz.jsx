"use client";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";

const features = [
	{
		title: "Premium Materials",
		desc: "TR-90 and Artisanal Metal frames built for enduring luxury.",
		icon: "✧",
	},
	{
		title: "Magnetic Charms",
		desc: "Interchangeable hardware to express your daily style.",
		icon: "✦",
	},
	{
		title: "UV Protection",
		desc: "Advanced optical coating for maximum visual clarity.",
		icon: "☼",
	},
	{
		title: "Nationwide Delivery",
		desc: "Securely delivered to your doorstep anywhere in Pakistan.",
		icon: "✈",
	},
];

export default function WhyChooseElyz() {
	return (
		<section id="why-elyz" className="py-24 bg-[#1E293B] text-white">
			<Container>
				<SectionHeading
					title="The ELYZ Standard"
					subtitle="Uncompromising Quality"
					light
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{features.map((feature, idx) => (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.15 }}
							className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
							<div className="text-4xl text-[#D4AF37] mb-6">
								{feature.icon}
							</div>
							<h4 className="text-xl font-serif mb-3">
								{feature.title}
							</h4>
							<p className="text-gray-400 text-sm leading-relaxed">
								{feature.desc}
							</p>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					className="mt-20 text-center border-t border-white/10 pt-16">
					<h3 className="text-6xl font-serif text-[#D4AF37] mb-4">
						10,000+
					</h3>
					<p className="tracking-widest uppercase text-sm text-gray-300">
						Happy Customers Nationwide
					</p>
				</motion.div>
			</Container>
		</section>
	);
}
