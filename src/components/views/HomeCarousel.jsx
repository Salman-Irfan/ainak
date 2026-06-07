"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronUp, ChevronDown } from "lucide-react";

const SLIDES = [
	{
		id: 0,
		image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1800&q=85",
		label: "New Collection 2025",
		title: ["Vision", "Redefined"],
		titleItalic: "Beautifully",
		sub: "Premium eyewear crafted for the discerning eye. Where precision meets elegance.",
		cta: { label: "Shop Now", href: "/shop" },
		ctaSecondary: { label: "Explore", href: "/collections" },
	},
	{
		id: 1,
		image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=1800&q=85",
		label: "Signature Sunwear",
		title: ["Shade The", "World In"],
		titleItalic: "Style",
		sub: "Iconic silhouettes. UV-400 protection. Sun glasses that define your persona.",
		cta: { label: "Shop Sunglasses", href: "/sun-glasses" },
	},
	{
		id: 2,
		image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1800&q=85",
		label: "Contact Lenses",
		title: ["See The", "World"],
		titleItalic: "Clearly",
		sub: "Daily, monthly & coloured contact lenses. Delivered to your door across Pakistan.",
		cta: { label: "Explore Lenses", href: "/contact-lenses" },
	},
];

export default function HeroCarousel() {
	const [current, setCurrent] = useState(0);
	const [animating, setAnimating] = useState(false);

	const goTo = useCallback(
		(index) => {
			if (animating) return;
			setAnimating(true);
			setCurrent((index + SLIDES.length) % SLIDES.length);
			setTimeout(() => setAnimating(false), 1000);
		},
		[animating],
	);

	useEffect(() => {
		const timer = setInterval(() => goTo(current + 1), 5000);
		return () => clearInterval(timer);
	}, [current, goTo]);

	return (
		<section className="relative h-screen min-h-[640px] overflow-hidden bg-black">
			{/* Slides */}
			{SLIDES.map((slide, i) => (
				<div
					key={slide.id}
					className={`absolute inset-0 transition-opacity duration-1000 ${
						i === current ? "opacity-100" : "opacity-0"
					}`}>
					{/* Background Image */}
					<Image
						src={slide.image}
						alt={slide.titleItalic}
						fill
						priority={i === 0}
						className="object-cover brightness-[0.42]"
					/>
					{/* Gradient overlay */}
					<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

					{/* Content */}
					<div
						className={`absolute inset-0 flex items-center px-[6%] transition-all duration-700 ${
							i === current
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-6"
						}`}>
						<div className="max-w-2xl">
							<p className="text-[11px] tracking-[0.28em] uppercase text-[#b89c6e] mb-5 font-light">
								{slide.label}
							</p>
							<h1 className="font-cormorant text-[clamp(3rem,6vw,5.2rem)] font-light leading-[1.07] text-[#f0ece4] mb-4">
								{slide.title.map((line, li) => (
									<span key={li} className="block">
										{line}
									</span>
								))}
								<em className="not-italic text-[#c8a86e] italic font-light">
									{slide.titleItalic}
								</em>
							</h1>
							<p className="text-[15px] text-white/60 font-light leading-relaxed mb-8 max-w-md">
								{slide.sub}
							</p>
							<div className="flex flex-wrap items-center gap-3">
								<Link
									href={slide.cta.href}
									className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#b89c6e] text-black text-[12px] font-medium tracking-[0.14em] uppercase hover:bg-[#cdb38a] transition-all duration-300 hover:-translate-y-0.5 group">
									{slide.cta.label}
									<ArrowRight
										size={15}
										className="transition-transform duration-200 group-hover:translate-x-1"
									/>
								</Link>
								{slide.ctaSecondary && (
									<Link
										href={slide.ctaSecondary.href}
										className="inline-flex items-center gap-2.5 px-7 py-3 border border-white/30 text-[#f0ece4] text-[12px] tracking-[0.14em] uppercase hover:border-white/60 hover:bg-white/5 transition-all duration-300">
										{slide.ctaSecondary.label}
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
			))}

			{/* Dot Navigation */}
			<div className="absolute bottom-10 left-[6%] z-10 flex items-center gap-3">
				{SLIDES.map((_, i) => (
					<button
						key={i}
						onClick={() => goTo(i)}
						aria-label={`Go to slide ${i + 1}`}
						className={`h-px transition-all duration-300 ${
							i === current
								? "w-14 bg-[#b89c6e]"
								: "w-7 bg-white/30"
						}`}
					/>
				))}
			</div>

			{/* Arrow Navigation */}
			<div className="absolute right-[5%] top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
				<button
					onClick={() => goTo(current - 1)}
					aria-label="Previous slide"
					className="w-11 h-11 border border-white/20 bg-black/30 text-white/80 hover:border-[#b89c6e] hover:bg-[#b89c6e]/15 transition-all duration-200 flex items-center justify-center">
					<ChevronUp size={16} strokeWidth={1.7} />
				</button>
				<button
					onClick={() => goTo(current + 1)}
					aria-label="Next slide"
					className="w-11 h-11 border border-white/20 bg-black/30 text-white/80 hover:border-[#b89c6e] hover:bg-[#b89c6e]/15 transition-all duration-200 flex items-center justify-center">
					<ChevronDown size={16} strokeWidth={1.7} />
				</button>
			</div>

			{/* Slide counter */}
			<div className="absolute bottom-10 right-[5%] z-10 text-white/30 text-[11px] tracking-widest font-light">
				0{current + 1} / 0{SLIDES.length}
			</div>
		</section>
	);
}
