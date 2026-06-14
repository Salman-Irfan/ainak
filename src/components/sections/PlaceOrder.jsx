"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";
import Button from "../shared/Button";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase";
import axios from "axios";
import toast from "react-hot-toast";

export default function PlaceOrder() {
	// 1. Add loading state
	const [isSubmitting, setIsSubmitting] = useState(false);
	// State management for user selections
	const [material, setMaterial] = useState("");
	const [silhouette, setSilhouette] = useState("");
	const [palette, setPalette] = useState("");
	const [charms, setCharms] = useState([]);
	// Add these to your existing state declarations
	const [deliveryDetails, setDeliveryDetails] = useState({
		fullName: "",
		phone: "",
		city: "",
		address: "",
		notes: "",
	});

	// Options data
	const materials = ["Premium TR-90", "Artisanal Metal"];
	const silhouettes = ["Oval", "Rectangle", "Round", "Square", "Cat Eye"];
	const palettes = [
		{ name: "Obsidian Black", color: "bg-gray-950 border border-gray-700" },
		{ name: "Tortoise Shell", color: "bg-amber-900" },
		{ name: "Rose Gold", color: "bg-rose-300" },
		{
			name: "Crystal Clear",
			color: "bg-transparent border border-gray-500",
		},
	];
	const availableCharms = [
		"Star & Chain Pair",
		"Stellar Point Pair",
		"Ribbon Bow Pair",
		"Lumina Butterfly Pair",
		"Amour Feather Pair",
		"Golden Butterfly Pair",
	];

	// Handler for charm selection (Max 2 pairs)
	const toggleCharm = (charm) => {
		if (charms.includes(charm)) {
			setCharms(charms.filter((c) => c !== charm));
		} else if (charms.length < 2) {
			setCharms([...charms, charm]);
		}
	};
	// 2. Helper function to reset form
	const resetForm = () => {
		setMaterial("");
		setSilhouette("");
		setPalette("");
		setCharms([]);
		setDeliveryDetails({
			fullName: "",
			phone: "",
			city: "",
			address: "",
			notes: "",
		});
	};
	// Form submission handler
	const handleSubmit = async (e) => {
		e.preventDefault();
		// Optional: Add a loading state to your button
		setIsSubmitting(true);
		// Define a loading toast
		const loadingToast = toast.loading("Processing your order...");
		try {
			const orderData = {
				material,
				silhouette,
				palette,
				charms,
				...deliveryDetails,
			};
			console.log("Order Submitted:", orderData);
			// firebase firestore
			// Adding document to the 'orders' collection
			// 1. Send to Firebase
			const docRef = await addDoc(collection(db, "orders"), {
				...orderData,
				timestamp: serverTimestamp(),
			});

			console.log("Order stored with ID: ", docRef.id);
			// 2. Send to Formspree via Axios
			await axios.post(process.env.NEXT_PUBLIC_FORMSPREE_API, orderData, {
				headers: {
					Accept: "application/json",
				},
			});
			// Success Feedback
			toast.dismiss(loadingToast);
			toast.success("Order placed successfully! Redirecting to WhatsApp...");
			// 3. Construct WhatsApp Message
			const message =
				`*New ELYZ Order*\n\n` +
				`*Customer:* ${deliveryDetails.fullName}\n` +
				`*Phone:* ${deliveryDetails.phone}\n` +
				`*Material:* ${material}\n` +
				`*Silhouette:* ${silhouette}\n` +
				`*Palette:* ${palette}\n` +
				`*Charms:* ${charms.join(", ")}\n` +
				`*City:* ${deliveryDetails.city}\n` +
				`*Address:* ${deliveryDetails.address}\n` +
				`*Notes:* ${deliveryDetails.notes}`;

			const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUM; // No '+' sign here
			const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

			// Open WhatsApp in a new tab
			window.open(whatsappUrl, "_blank");
			resetForm(); // Clear form on success
		} catch (error) {
			console.error("Error submitting order:", error);
			toast.dismiss(loadingToast);
			toast.error("Failed to place order. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section
			id="order"
			className="py-24 bg-[#0B1120] relative overflow-hidden">
			{/* Richer background gradients for depth */}
			<div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-[#0a0f1c] via-[#0F172A] to-transparent pointer-events-none" />
			{/* Ambient premium gold glow behind the container */}
			<div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#D4AF37] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
			<Container className="relative z-10">
				<div className="bg-[#000]/80 backdrop-blur-xl border border-gray-800 shadow-2xl p-8 md:p-16 rounded-2xl max-w-4xl mx-auto">
					{/* make this div in center of the container */}
					<div className="text-white text-center mb-12">
						{/* choose some bold, enlarge and italic typography */}
						<h2 className="text-4xl font-bold italic text-yellow-300 animate-pulse">
							Acquire Yours
						</h2>
						<p className="text-lg text-gray-300">
							Secure Your ELYZ Frame
						</p>
					</div>
					{/* now on form submit, console log the form values in a handle submit callback function */}
					<form className="space-y-12" onSubmit={handleSubmit}>
						{/* 1. Material Selection */}
						<div className="space-y-4">
							<h3 className="text-lg font-medium text-gray-100 border-b border-gray-800 pb-2">
								1. Select Your Material
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{materials.map((m) => (
									<motion.div
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										key={m}
										onClick={() => setMaterial(m)}
										className={`p-6 border rounded-xl cursor-pointer transition-all bg-gray-900/30
                                        ${material === m ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-[0_0_15px_rgba(212,175,55,0.1)]" : "border-gray-700 hover:border-gray-500"}`}>
										<p className="font-semibold text-center text-gray-200">
											{m}
										</p>
									</motion.div>
								))}
							</div>
						</div>

						{/* 2. Silhouette Selection */}
						<div className="space-y-4">
							<h3 className="text-lg font-medium text-gray-100 border-b border-gray-800 pb-2">
								2. Define Your Silhouette
							</h3>
							<div className="grid grid-cols-2 md:grid-cols-5 gap-3">
								{silhouettes.map((s) => (
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										key={s}
										onClick={() => setSilhouette(s)}
										className={`p-4 border rounded-xl cursor-pointer transition-all text-center flex items-center justify-center min-h-[80px] bg-gray-900/30
                                        ${silhouette === s ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-[0_0_15px_rgba(212,175,55,0.1)]" : "border-gray-700 hover:border-gray-500"}`}>
										<p className="font-medium text-sm text-gray-200">
											{s}
										</p>
									</motion.div>
								))}
							</div>
						</div>

						{/* 3. Palette Selection */}
						<div className="space-y-4">
							<h3 className="text-lg font-medium text-gray-100 border-b border-gray-800 pb-2">
								3. Choose Your Palette
							</h3>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								{palettes.map((p) => (
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										key={p.name}
										onClick={() => setPalette(p.name)}
										className={`p-4 border rounded-xl cursor-pointer transition-all flex flex-col items-center gap-3 bg-gray-900/30
                                        ${palette === p.name ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-[0_0_15px_rgba(212,175,55,0.1)]" : "border-gray-700 hover:border-gray-500"}`}>
										<div
											className={`w-8 h-8 rounded-full shadow-inner ${p.color}`}></div>
										<p className="font-medium text-sm text-gray-200 text-center">
											{p.name}
										</p>
									</motion.div>
								))}
							</div>
						</div>

						{/* 4. Charms Selection */}
						<div className="space-y-4">
							<div>
								<h3 className="text-lg font-medium text-gray-100 border-b border-gray-800 pb-2">
									4. Choose Your Charms (Any 2 pairs)
								</h3>
								<p className="text-sm text-gray-400 mt-2">
									Elevate your look with magnetic accent
									charms. Select any two unique pairs for your
									temple arms.
								</p>
							</div>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
								{availableCharms.map((c) => {
									const isSelected = charms.includes(c);
									const isDisabled =
										!isSelected && charms.length >= 2;

									return (
										<motion.div
											whileHover={
												!isDisabled
													? { scale: 1.02 }
													: {}
											}
											whileTap={
												!isDisabled
													? { scale: 0.98 }
													: {}
											}
											key={c}
											onClick={() =>
												!isDisabled && toggleCharm(c)
											}
											className={`p-4 border rounded-xl transition-all text-center flex flex-col items-center justify-center min-h-[100px] relative bg-gray-900/30
                                            ${isSelected ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-[0_0_15px_rgba(212,175,55,0.1)] cursor-pointer" : "border-gray-700"}
                                            ${!isDisabled && !isSelected ? "hover:border-gray-500 cursor-pointer" : ""}
                                            ${isDisabled ? "opacity-40 cursor-not-allowed bg-gray-950 border-gray-800" : ""}
                                            `}>
											<p className="font-medium text-gray-200 text-sm">
												{c}
											</p>
											{isSelected && (
												<span className="absolute bottom-2 text-[#D4AF37] text-xs font-semibold">
													✓ Selected
												</span>
											)}
										</motion.div>
									);
								})}
							</div>
						</div>

						{/* Divider between customization and personal info */}
						<div className="my-10 border-t border-gray-800"></div>

						{/* Personal & Delivery Details */}
						<div className="space-y-8">
							<h3 className="text-lg font-medium text-gray-100 mb-6">
								Delivery Details
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Full Name
									</label>
									<input
										type="text"
										className="w-full border-b border-gray-700 py-3 bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
										placeholder="e.g. Ali Khan"
										value={deliveryDetails.fullName}
										onChange={(e) =>
											setDeliveryDetails({
												...deliveryDetails,
												fullName: e.target.value,
											})
										}
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Phone Number *
									</label>
									<input
										type="tel"
										required
										className="w-full border-b border-gray-700 py-3 bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
										placeholder="+92 300 0000000"
										value={deliveryDetails.phone}
										onChange={(e) =>
											setDeliveryDetails({
												...deliveryDetails,
												phone: e.target.value,
											})
										}
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										City
									</label>
									<input
										type="text"
										className="w-full border-b border-gray-700 py-3 bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
										placeholder="Lahore"
										value={deliveryDetails.city}
										onChange={(e) =>
											setDeliveryDetails({
												...deliveryDetails,
												city: e.target.value,
											})
										}
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Delivery Address
									</label>
									<input
										type="text"
										className="w-full border-b border-gray-700 py-3 bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
										placeholder="Street, Phase, Area"
										value={deliveryDetails.address}
										onChange={(e) =>
											setDeliveryDetails({
												...deliveryDetails,
												address: e.target.value,
											})
										}
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-300 mb-2">
									Prescription / Custom Notes
								</label>
								<textarea
									rows="3"
									className="w-full border-b border-gray-700 py-3 bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
									placeholder="Any specific lens requirements or preferences..."
									value={deliveryDetails.notes}
									onChange={(e) =>
										setDeliveryDetails({
											...deliveryDetails,
											notes: e.target.value,
										})
									}></textarea>
							</div>
						</div>

						<div className="text-center pt-6">
							<Button
								type="submit"
								className="w-full md:w-auto px-16 hover:scale-105 hover:cursor-pointer transition-transform"
								disabled={isSubmitting}>
								{isSubmitting
									? "Processing..."
									: "Place My Order"}
							</Button>
						</div>
					</form>
				</div>
			</Container>
		</section>
	);
}
