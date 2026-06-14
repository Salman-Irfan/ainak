"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";

const faqs = [
	{
		q: "What is the standard delivery time?",
		a: "Standard delivery across Pakistan takes 3-5 business days. Custom prescriptions may require an additional 2 days.",
	},
	{
		q: "What payment methods are accepted?",
		a: "We accept Cash on Delivery (COD), direct bank transfers, and major credit cards via our secure gateway.",
	},
	{
		q: "Do you make prescription glasses?",
		a: "Yes. Once you select your frame, our concierge team will reach out to collect your optical prescription details.",
	},
	{
		q: "What is your return policy?",
		a: "We offer a 7-day hassle-free return policy if the product is undamaged and in its original premium packaging.",
	},
	{
		q: "Do the magnetic charms come with a warranty?",
		a: "All ELYZ frames and magnetic charms are covered by a 6-month warranty against manufacturing defects.",
	},
];

export default function FAQ() {
	const [openIdx, setOpenIdx] = useState(null);

	return (
		<section id="faq" className="py-24 bg-[#FAFAFA]">
			<Container className="max-w-3xl">
				<SectionHeading
					title="Frequently Asked Questions"
					subtitle="Client Services"
				/>

				<div className="space-y-4">
					{faqs.map((faq, idx) => (
						<div
							key={idx}
							className="border border-gray-200 bg-white rounded-lg overflow-hidden">
							<button
								onClick={() =>
									setOpenIdx(openIdx === idx ? null : idx)
								}
								className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none">
								<span className="font-serif text-[#0F172A] text-lg">
									{faq.q}
								</span>
								<span className="text-[#D4AF37] text-2xl">
									{openIdx === idx ? "−" : "+"}
								</span>
							</button>
							<AnimatePresence>
								{openIdx === idx && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										className="px-6 pb-5 text-gray-500">
										{faq.a}
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					))}
				</div>
			</Container>
		</section>
	);
}
