"use client";
import { motion } from "framer-motion";

export default function SectionHeading({
	title,
	subtitle,
	align = "center",
	light = false,
}) {
	return (
		<div
			className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className={`text-3xl md:text-5xl font-serif mb-4 ${light ? "text-[#FAFAFA]" : "text-[#0F172A]"}`}>
				{title}
			</motion.h2>
			{subtitle && (
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className={`text-sm md:text-base tracking-wider uppercase ${light ? "text-gray-300" : "text-gray-500"}`}>
					{subtitle}
				</motion.p>
			)}
		</div>
	);
}
