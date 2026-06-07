'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const COLLECTIONS = [
  {
    tag: 'Optical',
    title: 'Eye Glasses',
    href: '/eye-glasses',
    description:
      'From minimalist titanium frames to bold acetate silhouettes — crafted for precision vision and daily elegance.',
    image: 'https://images.unsplash.com/photo-1588118453413-a5e793e61aa5?w=900&q=80',
  },
  {
    tag: 'Lifestyle',
    title: 'Sun Glasses',
    href: '/sun-glasses',
    description:
      'Premium polarised and UV-400 sun glasses. From beachside escapes to urban streets — style that moves with you.',
    image: 'https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=900&q=80',
  },
  {
    tag: 'Contact Wear',
    title: 'Contact Lenses',
    href: '/contact-lenses',
    description:
      'Breathable, colour-enhancing and vision-correcting lenses. For those who want clarity without the frame.',
    image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=900&q=80',
  },
  {
    tag: 'Prescription',
    title: 'Lenses',
    href: '/lenses',
    description:
      'High-index, anti-glare, blue light filtering and photochromic lens options — tailored to your prescription.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
  },
];

function CollectionCard({ col, delay }) {
  const ref = useScrollReveal(delay);

  return (
    <div
      ref={ref}
      className="bg-[#181818] border border-white/5 group cursor-pointer opacity-0 translate-y-8 transition-all duration-700 hover:border-white/10"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <Image
          src={col.image}
          alt={col.title}
          fill
          className="object-cover brightness-[0.65] transition-all duration-700 group-hover:scale-[1.04] group-hover:brightness-50"
        />
      </div>

      {/* Card Body */}
      <div className="p-6 border-t border-white/5">
        <span className="block text-[10px] tracking-[0.22em] uppercase text-[#b89c6e] mb-2">
          {col.tag}
        </span>
        <h3 className="font-cormorant text-[1.7rem] font-light text-[#f0ece4] mb-2 leading-snug">
          {col.title}
        </h3>
        <p className="text-[13.5px] text-white/50 font-light leading-relaxed mb-4">
          {col.description}
        </p>
        <Link
          href={col.href}
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-[#b89c6e] border-b border-[#b89c6e]/35 pb-0.5 hover:gap-4 hover:border-[#b89c6e] transition-all duration-250"
        >
          Shop Collection
          <ArrowRight size={13} strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
}

export default function ExploreCollections() {
  return (
    <section className="py-28 px-[5%] bg-[#0d0d0d]">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="block text-[10.5px] tracking-[0.28em] uppercase text-[#b89c6e] mb-3">
            Collections
          </span>
          <h2 className="font-cormorant text-[clamp(2.2rem,4vw,3.4rem)] font-light text-[#f0ece4] leading-tight">
            Explore Our <em className="italic text-[#c8a86e] not-italic font-light italic">World</em>
          </h2>
        </div>

        {/* Grid: 2 cols desktop, 1 col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COLLECTIONS.map((col, i) => (
            <CollectionCard key={col.href} col={col} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
