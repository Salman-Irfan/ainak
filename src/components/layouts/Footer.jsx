'use client';

import Link from 'next/link';
import { useState } from 'react';
import {  ArrowRight } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Categories', href: '/categories' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'About AINAK', href: '/about' },
];

const SUPPORT_LINKS = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Shipping Info', href: '/shipping' },
  { label: 'Return Policy', href: '/returns' },
  { label: 'Track Order', href: '/track' },
  { label: 'Prescription Guide', href: '/prescription' },
];


export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    // TODO: wire up to newsletter API
    alert(`Subscribed: ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-[#060606] border-t border-white/[0.06]">
      <div className="max-w-screen-xl mx-auto px-[5%] pt-20 pb-10">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div>
            <p className="font-cormorant text-[1.9rem] font-light tracking-[0.18em] text-[#e8dcc8] mb-3">
              AINAK<span className="text-[#b89c6e]">.</span>PK
            </p>
            <p className="text-[13.5px] text-white/45 font-light leading-[1.8] max-w-[260px]">
              Pakistan's premium destination for eyewear. We bring together global craftsmanship,
              precise optometry, and effortless style — delivered to your door.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[10.5px] tracking-[0.24em] uppercase text-[#b89c6e] font-medium mb-5">
              Quick Links
            </p>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13.5px] text-white/45 font-light hover:text-[#e8dcc8] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-[10.5px] tracking-[0.24em] uppercase text-[#b89c6e] font-medium mb-5">
              Customer Support
            </p>
            <ul className="flex flex-col gap-3">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13.5px] text-white/45 font-light hover:text-[#e8dcc8] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Newsletter */}
          <div>
            <p className="text-[10.5px] tracking-[0.24em] uppercase text-[#b89c6e] font-medium mb-5">
              Follow Us
            </p>
            <div className="flex gap-2.5 mb-7">
              
            </div>

            {/* Newsletter */}
            <p className="text-[10.5px] tracking-[0.18em] uppercase text-[#b89c6e] font-medium mb-3">
              Newsletter
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 min-w-0 bg-white/5 border border-white/10 text-[#f0ece4] text-[12.5px] px-3 py-2.5 outline-none font-sans placeholder:text-white/25 focus:border-white/25 transition-colors"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="px-3.5 bg-[#b89c6e] hover:bg-[#cdb38a] transition-colors duration-200 flex items-center justify-center shrink-0"
              >
                <ArrowRight size={15} strokeWidth={2} className="text-black" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[12px] text-white/28 tracking-[0.08em]">
            © 2025 AINAK.PK — All rights reserved
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[12px] text-white/28 hover:text-white/55 transition-colors tracking-[0.06em]"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
