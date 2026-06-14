"use client";
import { motion } from "framer-motion";

export default function Button({
	children,
	variant = "primary",
	className = "",
	...props
}) {
	const baseStyle =
		"px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300 font-medium";
	const variants = {
		primary:
			"bg-[#D4AF37] text-white hover:bg-[#b5952f] shadow-[0_4px_14px_0_rgba(212,175,55,0.39)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.23)]",
		outline:
			"border border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-[#FAFAFA]",
		glass: "backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20",
	};

	return (
		<motion.button
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			className={`${baseStyle} ${variants[variant]} ${className}`}
			{...props}>
			{children}
		</motion.button>
	);
}
