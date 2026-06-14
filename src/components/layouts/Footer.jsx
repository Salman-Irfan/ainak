export default function Footer() {
	return (
		<footer className="bg-[#0F172A] text-white pt-20 pb-10">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
				<div className="md:col-span-2">
					<h3 className="text-3xl font-serif mb-6 text-[#D4AF37]">
						ELYZ
					</h3>
					<p className="text-gray-400 max-w-sm leading-relaxed">
						Your Vision. Your Design. Premium eyewear from Pakistan,
						meticulously crafted and elevated with custom magnetic
						charms.
					</p>
				</div>
				<div>
					<h4 className="text-sm font-semibold tracking-widest uppercase mb-6">
						Quick Links
					</h4>
					<ul className="space-y-4 text-gray-400">
						<li>
							<a
								href="#collections"
								className="hover:text-[#D4AF37] transition-colors">
								Collections
							</a>
						</li>
						<li>
							<a
								href="#process"
								className="hover:text-[#D4AF37] transition-colors">
								Our Process
							</a>
						</li>
						<li>
							<a
								href="#try-on"
								className="hover:text-[#D4AF37] transition-colors">
								Virtual Try-On
							</a>
						</li>
						<li>
							<a
								href="#faq"
								className="hover:text-[#D4AF37] transition-colors">
								FAQ
							</a>
						</li>
					</ul>
				</div>
				<div>
					<h4 className="text-sm font-semibold tracking-widest uppercase mb-6">
						Contact
					</h4>
					<ul className="space-y-4 text-gray-400">
						<li>info@elyz.pk</li>
						<li>+92 300 0000000</li>
						<li>Lahore, Pakistan</li>
					</ul>
				</div>
			</div>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
				<p>
					&copy; {new Date().getFullYear()} ELYZ Studio. All rights
					reserved.
				</p>
			</div>
		</footer>
	);
}
