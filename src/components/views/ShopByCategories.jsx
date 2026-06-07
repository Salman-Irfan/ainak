'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const CATEGORIES = [
  {
    name: 'Eye Glasses',
    href: '/eye-glasses',
    image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&q=80',
    badge: '150+ Styles',
  },
  {
    name: 'Sun Glasses',
    href: '/sun-glasses',
    image: 'https://images.unsplash.com/photo-1625122905031-487271b2f6c7?w=600&q=80',
    badge: 'UV-400',
  },
  {
    name: 'Contact Lenses',
    href: '/contact-lenses',
    image: 'https://images.unsplash.com/photo-1608478584728-b2e17fc73ce0?w=600&q=80',
    badge: 'Daily & Monthly',
  },
  {
    name: 'Lenses',
    href: '/lenses',
    image: 'https://images.unsplash.com/photo-1587840000563-6eb21ba34d39?w=600&q=80',
    badge: 'Prescription',
  },
];

function CategoryCard({ cat, delay }) {
  const ref = useScrollReveal(delay);

  return (
    <Link
      href={cat.href}
      ref={ref}
      className="relative overflow-hidden aspect-[3/4] block bg-[#1a1a1a] group opacity-0 translate-y-8 transition-all duration-700"
    >
      {/* Image */}
      <Image
        src={cat.image}
        alt={cat.name}
        fill
        className="object-cover brightness-75 transition-all duration-700 group-hover:scale-105 group-hover:brightness-[0.55]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

      {/* Badge */}
      <span className="absolute top-4 right-4 bg-[#b89c6e] text-black text-[9px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1.5">
        {cat.badge}
      </span>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="block font-cormorant text-[1.45rem] font-light text-[#f0ece4] tracking-wide mb-2">
          {cat.name}
        </span>
        <span className="flex items-center gap-1.5 text-[10.5px] tracking-[0.18em] uppercase text-[#b89c6e] font-normal transition-all duration-300 group-hover:gap-3">
          Browse
          <ArrowRight size={12} strokeWidth={2} />
        </span>
      </div>
    </Link>
  );
}

export default function ShopByCategories() {
  return (
    <section className="py-28 px-[5%] bg-[#111] border-t border-white/5">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="block text-[10.5px] tracking-[0.28em] uppercase text-[#b89c6e] mb-3">
            Curated for you
          </span>
          <h2 className="font-cormorant text-[clamp(2.2rem,4vw,3.4rem)] font-light text-[#f0ece4] leading-tight">
            Shop by <em className="italic text-[#c8a86e] not-italic font-light italic">Categories</em>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.href} cat={cat} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
