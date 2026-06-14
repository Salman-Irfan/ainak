"use client";
import { Canvas } from "@react-three/fiber";
import {
	PresentationControls,
	Environment,
	ContactShadows,
} from "@react-three/drei";
import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";

function GlassesModel() {
	// A sleek geometric representation of luxury frames for the generic environment
	return (
		<group position={[0, -0.5, 0]}>
			{/* Left Lens Frame */}
			<mesh position={[-1.2, 1, 0]}>
				<boxGeometry args={[2, 1.5, 0.1]} />
				<meshStandardMaterial
					color="#0F172A"
					metalness={0.8}
					roughness={0.2}
				/>
			</mesh>
			{/* Right Lens Frame */}
			<mesh position={[1.2, 1, 0]}>
				<boxGeometry args={[2, 1.5, 0.1]} />
				<meshStandardMaterial
					color="#0F172A"
					metalness={0.8}
					roughness={0.2}
				/>
			</mesh>
			{/* Bridge */}
			<mesh position={[0, 1.2, 0]}>
				<boxGeometry args={[0.6, 0.1, 0.1]} />
				<meshStandardMaterial
					color="#D4AF37"
					metalness={1}
					roughness={0.1}
				/>
			</mesh>
			{/* Arms */}
			<mesh position={[-2.2, 1.2, -1.5]} rotation={[0, Math.PI / 2, 0]}>
				<boxGeometry args={[3, 0.1, 0.1]} />
				<meshStandardMaterial
					color="#D4AF37"
					metalness={1}
					roughness={0.1}
				/>
			</mesh>
			<mesh position={[2.2, 1.2, -1.5]} rotation={[0, Math.PI / 2, 0]}>
				<boxGeometry args={[3, 0.1, 0.1]} />
				<meshStandardMaterial
					color="#D4AF37"
					metalness={1}
					roughness={0.1}
				/>
			</mesh>
		</group>
	);
}

export default function VirtualTryOn() {
	return (
		<section id="try-on" className="py-24 bg-[#FAFAFA]">
			<Container>
				<SectionHeading
					title="3D Showcase"
					subtitle="Experience Eyewear In 3D"
				/>

				<div className="h-[600px] w-full bg-[#E2E8F0] rounded-2xl overflow-hidden relative shadow-inner cursor-grab active:cursor-grabbing">
					<Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
						<ambientLight intensity={0.5} />
						<spotLight
							position={[10, 10, 10]}
							angle={0.15}
							penumbra={1}
							castShadow
						/>
						<PresentationControls
							global
							config={{ mass: 2, tension: 500 }}
							snap={{ mass: 4, tension: 1500 }}
							rotation={[0, 0.3, 0]}
							polar={[-Math.PI / 3, Math.PI / 3]}
							azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
							<GlassesModel />
						</PresentationControls>
						<ContactShadows
							position={[0, -1, 0]}
							opacity={0.4}
							scale={10}
							blur={2}
							far={4}
						/>
						<Environment preset="city" />
					</Canvas>
					<div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-6 py-2 rounded-full text-sm font-medium shadow-sm pointer-events-none">
						Drag to Rotate
					</div>
				</div>
			</Container>
		</section>
	);
}
