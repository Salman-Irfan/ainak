import React from "react";
import { Butterfly } from "../ui/Butterfly";

const About = () => {
	return (
		<>
			<section
				id="about"
				style={{
					background: "#0d0b09",
					padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 8rem)",
					position: "relative",
					overflow: "hidden",
				}}>
				{/* Corner accents */}
				<div
					style={{
						position: "absolute",
						top: "3rem",
						left: "3rem",
						width: "60px",
						height: "60px",
						borderTop: "1px solid rgba(201,168,76,0.3)",
						borderLeft: "1px solid rgba(201,168,76,0.3)",
						pointerEvents: "none",
					}}
				/>
				<div
					style={{
						position: "absolute",
						bottom: "3rem",
						right: "3rem",
						width: "60px",
						height: "60px",
						borderBottom: "1px solid rgba(201,168,76,0.3)",
						borderRight: "1px solid rgba(201,168,76,0.3)",
						pointerEvents: "none",
					}}
				/>

				<div
					style={{
						maxWidth: "1100px",
						margin: "0 auto",
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "clamp(2rem, 6vw, 6rem)",
						alignItems: "center",
					}}
					className="elyz-about-grid">
					{/* Left: Text */}
					<div>
						<p
							style={{
								fontFamily:
									"'Cormorant Garamond', Georgia, serif",
								fontSize: "0.8rem",
								letterSpacing: "0.35em",
								color: "#C9A84C",
								textTransform: "uppercase",
								marginBottom: "1.2rem",
							}}>
							Our Story
						</p>
						<h2
							style={{
								fontFamily:
									"'Cormorant Garamond', Georgia, serif",
								fontSize: "clamp(2rem, 5vw, 3.5rem)",
								fontWeight: 300,
								color: "#f0e8d0",
								lineHeight: 1.15,
								margin: "0 0 1.8rem",
							}}>
							Born from a{" "}
							<span
								style={{
									fontStyle: "italic",
									color: "#C9A84C",
								}}>
								Simple Idea
							</span>
						</h2>

						<p
							style={{
								fontFamily:
									"'Cormorant Garamond', Georgia, serif",
								fontSize: "clamp(1rem, 2vw, 1.2rem)",
								lineHeight: 1.85,
								color: "#9a9080",
								marginBottom: "1.4rem",
							}}>
							Elyz was created by a team of designers and eyewear
							enthusiasts who believed that glasses should be as
							dynamic as the people who wear them.
						</p>

						<p
							style={{
								fontFamily:
									"'Cormorant Garamond', Georgia, serif",
								fontSize: "clamp(1rem, 2vw, 1.2rem)",
								lineHeight: 1.85,
								color: "#9a9080",
								marginBottom: "2.5rem",
							}}>
							We spent two years perfecting our magnetic charm
							technology — ensuring it's secure enough for
							everyday wear yet easy enough to swap in seconds.
							Today, we're proud to offer a new way to express
							your unique style.
						</p>

						{/* Stats row */}
						<div style={{ display: "flex", gap: "2.5rem" }}>
							{[
								{ num: "2+", label: "Years Crafting" },
								{ num: "6", label: "Charm Designs" },
								{ num: "∞", label: "Combinations" },
							].map(({ num, label }) => (
								<div key={label}>
									<p
										style={{
											fontFamily:
												"'Cormorant Garamond', Georgia, serif",
											fontSize: "2.2rem",
											fontWeight: 600,
											color: "#C9A84C",
											margin: 0,
											lineHeight: 1,
										}}>
										{num}
									</p>
									<p
										style={{
											fontFamily:
												"'Cormorant Garamond', Georgia, serif",
											fontSize: "0.78rem",
											letterSpacing: "0.2em",
											color: "#5a5040",
											textTransform: "uppercase",
											margin: "4px 0 0",
										}}>
										{label}
									</p>
								</div>
							))}
						</div>
					</div>

					{/* Right: Banner image from the upload */}
					<div style={{ position: "relative" }}>
						{/* Gold frame effect */}
						<div
							style={{
								position: "absolute",
								inset: "-12px",
								border: "1px solid rgba(201,168,76,0.2)",
								borderRadius: "4px",
								pointerEvents: "none",
							}}
						/>
						{/* Use the ELYZ Studio banner image */}
						<img
							src="/assets/images/hero4.png"
							alt="Welcome to the ELYZ Studio"
							style={{
								width: "100%",
								borderRadius: "4px",
								display: "block",
								objectFit: "cover",
							}}
						/>
						{/* Fallback placeholder */}
						<div
							style={{
								display: "none",
								background: "rgba(201,168,76,0.06)",
								border: "1px solid rgba(201,168,76,0.15)",
								borderRadius: "4px",
								height: "320px",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								gap: "12px",
							}}>
							<Butterfly style={{ width: 64, opacity: 0.5 }} />
							<p
								style={{
									fontFamily:
										"'Cormorant Garamond', Georgia, serif",
									color: "#C9A84C",
									fontSize: "1rem",
									letterSpacing: "0.15em",
								}}>
								ELYZ Studio
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default About;
