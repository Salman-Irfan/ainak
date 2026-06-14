"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Container from "../shared/Container";

const links = [
	{ name: "Collections", href: "#collections" },
	{ name: "Why ELYZ", href: "#why-elyz" },
	{ name: "Try On", href: "#try-on" },
	{ name: "Best Sellers", href: "#best-sellers" },
	{ name: "Process", href: "#process" },
	{ name: "FAQ", href: "#faq" },
];

export default function Navbar() {
	const { scrollY } = useScroll();
	const [hidden, setHidden] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = scrollY.getPrevious();
		if (latest > previous && latest > 150) setHidden(true);
		else setHidden(false);
		setScrolled(latest > 50);
	});

	return (
		<motion.nav
			variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
			animate={hidden ? "hidden" : "visible"}
			transition={{ duration: 0.35, ease: "easeInOut" }}
			className={`fixed top-0 inset-x-0 w-full z-50 transition-colors duration-300 ${
				scrolled
					? "bg-white/80 backdrop-blur-md border-b border-gray-200"
					: "bg-transparent"
			}`}>
			<Container>
				<div className="flex items-center justify-between h-20">
					<a
						href="#"
						className={`text-2xl font-serif tracking-widest ${scrolled ? "text-[#0F172A]" : "text-[#FAFAFA]"}`}>
						ELYZ
					</a>
					<div className="hidden md:flex items-center space-x-8">
						{links.map((link) => (
							<a
								key={link.name}
								href={link.href}
								className={`text-sm tracking-widest uppercase hover:text-[#D4AF37] transition-colors ${
									scrolled
										? "text-[#1E293B]"
										: "text-gray-200"
								}`}>
								{link.name}
							</a>
						))}
						<a
							href="#order"
							className={`px-5 py-2 text-sm tracking-widest uppercase border transition-colors ${
								scrolled
									? "border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white"
									: "border-white text-white hover:bg-white hover:text-[#0F172A]"
							}`}>
							Order
						</a>
					</div>
				</div>
			</Container>
		</motion.nav>
	);
}
