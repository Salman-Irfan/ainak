"use client";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import Button from "../shared/Button";

// An abstract, high-end 3D representation of a golden lens/charm
function AbstractLens() {
	return (
		<Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
			<mesh>
				<torusGeometry args={[2, 0.1, 16, 100]} />
				<meshPhysicalMaterial
					color="#D4AF37"
					metalness={1}
					roughness={0.1}
					clearcoat={1}
				/>
			</mesh>
			<mesh rotation={[Math.PI / 2, 0, 0]}>
				<torusGeometry args={[1.5, 0.05, 16, 100]} />
				<meshPhysicalMaterial
					color="#ffffff"
					metalness={0.8}
					roughness={0.2}
					transmission={0.9}
					thickness={0.5}
				/>
			</mesh>
		</Float>
	);
}

export default function HeroSection() {
	return (
		<section
			id="hero"
			className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black">
			{/* Absolute positioning for the Hero Image behind text/3D or as a split */}
			<div className="absolute inset-0 opacity-30 pointer-events-none">
				<img
					src="hero.jpeg"
					alt="Welcome to ELYZ Studio"
					className="w-full h-full object-cover"
				/>
			</div>

			<Container className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pt-20">
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 1, ease: "easeOut" }}
					className="text-left">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
						className="w-12 h-1 bg-[#D4AF37] mb-8"
					/>
					<h1 className="text-5xl md:text-7xl font-serif text-[#FAFAFA] mb-6 leading-tight">
						Vision Refined.
						<br />
						<span className="text-[#D4AF37]">
							Luxury Redefined.
						</span>
					</h1>
					<p className="text-lg text-gray-300 mb-10 max-w-lg font-light leading-relaxed">
						Welcome to the ELYZ Studio. Pakistan's exclusive luxury
						eyewear experience. Customizable, magnetic, and
						unmistakably yours.
					</p>
					<div className="flex space-x-6">
						<Button
							onClick={() =>
								document
									.getElementById("order")
									.scrollIntoView()
							}>
							Explore Collection
						</Button>
						<Button
							variant="glass"
							onClick={() =>
								document
									.getElementById("try-on")
									.scrollIntoView()
							}>
							View in 3D
						</Button>
					</div>
				</motion.div>

				<div className="h-[60vh] lg:h-full relative cursor-grab active:cursor-grabbing">
					<Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
						<ambientLight intensity={0.5} />
						<spotLight
							position={[10, 10, 10]}
							angle={0.15}
							penumbra={1}
							intensity={1}
						/>
						<AbstractLens />
						<Environment preset="city" />
					</Canvas>
				</div>
			</Container>
		</section>
	);
}
