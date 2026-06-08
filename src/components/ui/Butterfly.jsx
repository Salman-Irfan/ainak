// ── SVG Butterfly ─────────────────────────────────────────────────────────
export function Butterfly({ className = "", style = {} }) {
	return (
		<svg
			viewBox="0 0 60 40"
			className={className}
			style={style}
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M30 20 C20 5, 2 2, 4 14 C6 22, 18 22, 30 20Z"
				stroke="#C9A84C"
				strokeWidth="1.2"
				fill="none"
			/>
			<path
				d="M30 20 C20 28, 5 30, 6 38 C8 44, 20 38, 30 20Z"
				stroke="#C9A84C"
				strokeWidth="1.2"
				fill="none"
			/>
			<path
				d="M30 20 C40 5, 58 2, 56 14 C54 22, 42 22, 30 20Z"
				stroke="#C9A84C"
				strokeWidth="1.2"
				fill="none"
			/>
			<path
				d="M30 20 C40 28, 55 30, 54 38 C52 44, 40 38, 30 20Z"
				stroke="#C9A84C"
				strokeWidth="1.2"
				fill="none"
			/>
			<line
				x1="30"
				y1="16"
				x2="28"
				y2="10"
				stroke="#C9A84C"
				strokeWidth="0.8"
			/>
			<line
				x1="30"
				y1="16"
				x2="32"
				y2="10"
				stroke="#C9A84C"
				strokeWidth="0.8"
			/>
		</svg>
	);
}
