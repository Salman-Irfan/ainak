"use client";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";

const steps = [
	{
		num: "01",
		title: "Choose Style",
		desc: "Select from our premium TR-90 or artisanal metal silhouettes.",
	},
	{
		num: "02",
		title: "Select Charms",
		desc: "Personalize with our exclusive magnetic accent pairs.",
	},
	{
		num: "03",
		title: "Confirmation Call",
		desc: "Our concierges verify your prescription and details.",
	},
	{
		num: "04",
		title: "Home Delivery",
		desc: "Dispatched securely within an elegant presentation box.",
	},
];

export default function OurProcess() {
	return (
		<section
			id="process"
			className="py-24 bg-[#0F172A] text-white overflow-hidden">
			<Container>
				<SectionHeading
					title="The Art of Customization"
					subtitle="Your Vision, Brought to Life"
					light
				/>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					<div className="space-y-12">
						{steps.map((step, idx) => (
							<motion.div
								key={step.num}
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: idx * 0.15 }}
								className="flex items-start space-x-6">
								<span className="text-4xl font-serif text-[#D4AF37]">
									{step.num}
								</span>
								<div>
									<h4 className="text-xl font-serif mb-2">
										{step.title}
									</h4>
									<p className="text-gray-400 text-sm">
										{step.desc}
									</p>
								</div>
							</motion.div>
						))}
					</div>

					<motion.div
						initial={{ opacity: 0, scale: 0.75 }}
						whileInView={{ opacity: 1, scale: 0.75 }}
						viewport={{ once: true }}
						className="relative">
						{/* The Custom Charms image placed here perfectly aligns with the process narrative */}
						<div className="p-2 bg-gradient-to-br from-[#D4AF37] to-transparent rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.15)]">
							<img
								src="assets/images/charm.jpeg"
								alt="Select your magnetic charms"
								className="w-full rounded-xl object-cover"
							/>
						</div>
					</motion.div>
				</div>
			</Container>
		</section>
	);
}
