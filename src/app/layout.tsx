// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
	title: "ELYZ Studio | Premium Eyewear",
	description:
		"Your Vision. Your Design. Discover luxury customizable magnetic eyewear from Pakistan.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				{children}
				<Toaster position="bottom-right" />
			</body>
		</html>
	);
}
