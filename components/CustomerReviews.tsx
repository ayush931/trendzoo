'use client';

import React from 'react';
import { Star, CheckCircle2, Heart, Sparkles } from 'lucide-react';

const REVIEWS = [
  {
    id: 'rev-1',
    name: 'Ananya S.',
    city: 'Mumbai',
    product: 'Magnetic Levitating Saturn Lamp',
    stars: 5,
    tag: 'Room Aesthetic',
    text: 'My bedroom literally feels like a luxury cyber lounge now! Everyone on my Instagram asked where I got it within 10 minutes of posting my story.',
    likes: 342,
  },
  {
    id: 'rev-2',
    name: 'Kabir V.',
    city: 'Bangalore',
    product: 'Trenzoo Smartwatch Pro Active',
    stars: 5,
    tag: 'Tech & Fitness',
    text: 'The AMOLED screen is crazy bright and the pink strap gives immaculate vibes. Battery lasts almost a whole week without charging.',
    likes: 219,
  },
  {
    id: 'rev-3',
    name: 'Meera D.',
    city: 'Delhi',
    product: 'Ultimate Mystery Loot Drop 3.0',
    stars: 5,
    tag: 'Gifting Mystery',
    text: 'Got items worth at least ₹5k inside a ₹1499 box including a mini neon speaker and stickers! Best birthday gift for my bestie.',
    likes: 489,
  },
  {
    id: 'rev-4',
    name: 'Rohan P.',
    city: 'Hyderabad',
    product: 'Cyber Future Overload Anime Hoodie',
    stars: 5,
    tag: 'Streetwear',
    text: 'The 420 GSM weight is unreal. It sits boxy and heavy just like high-end designer streetwear brands costing 5x more.',
    likes: 178,
  }
];

export default function CustomerReviews() {
  return (
    <section className="py-16 bg-[#FAF7F2] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#161B2E] text-xs font-black text-[#0D1322] neo-shadow-sm mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#FFA01E]" />
          <span>62,000+ HAPPY TREND HUNTERS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#0D1322] tracking-tight">
          What The Internet Is <span className="text-[#FF2A85]">Saying</span>
        </h2>
        <p className="text-sm text-neutral-600 font-semibold mt-1">
          Real unedited feedback from verified buyers across India & globally.
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="bg-white border-2 border-[#161B2E] rounded-3xl p-5 neo-shadow neo-shadow-hover transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Star Rating & Verified Pill */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5">
                  {[...Array(rev.stars)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                  ))}
                </div>
                <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" /> Verified
                </span>
              </div>

              {/* Review Text */}
              <p className="text-xs font-semibold text-neutral-700 leading-relaxed italic">
                &ldquo;{rev.text}&rdquo;
              </p>
            </div>

            {/* Product Tag & User Info */}
            <div className="pt-4 mt-4 border-t border-neutral-100 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF2A85] block truncate">
                Purchased: {rev.product}
              </span>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#0D1322] text-white text-xs font-black flex items-center justify-center">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-[#0D1322]">{rev.name}</h5>
                    <span className="text-[10px] font-medium text-neutral-400">{rev.city}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-neutral-400">
                  <Heart className="w-3 h-3 text-[#FF2A85] fill-[#FF2A85]" />
                  <span>{rev.likes}</span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
