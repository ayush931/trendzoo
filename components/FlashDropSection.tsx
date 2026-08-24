'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Zap, Flame, Clock, ShoppingBag, Eye, Heart, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { TRENDING_PRODUCTS } from '../lib/data';

export default function FlashDropSection() {
  const { playAudio, addToCart, setQuickViewProduct, toggleWishlist, wishlist, formatPrice } = useShop();

  // Real-time flash countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 19,
    millis: 8,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.millis > 0) return { ...prev, millis: prev.millis - 1 };
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1, millis: 9 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59, millis: 9 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59, millis: 9 };
        return { hours: 6, minutes: 0, seconds: 0, millis: 0 };
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const flashItems = TRENDING_PRODUCTS.filter(p => p.isFlashDrop || p.viralScore >= 95).slice(0, 3);

  return (
    <section className="py-12 bg-[#0D1322] text-white border-y-2 border-[#161B2E] relative overflow-hidden">
      {/* Background Neon Grid Accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00D2B4_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Live Countdown */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF2A85] text-white text-xs font-black tracking-wider uppercase mb-3">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>LIMITED BATCH DROP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Viral <span className="text-[#00D2B4]">Flash Deals</span> • Ending Soon
            </h2>
            <p className="text-sm text-neutral-400 font-medium mt-1">
              Guaranteed lowest price before restock. Once the timer hits zero, price reverts to retail.
            </p>
          </div>

          {/* Glowing Countdown Timer Box */}
          <div className="flex items-center gap-2 sm:gap-3 bg-white/5 border-2 border-white/20 rounded-2xl p-3 sm:p-4 backdrop-blur-md self-start md:self-auto">
            <Clock className="w-5 h-5 text-[#FFA01E] animate-pulse hidden sm:block" />
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-[#161B2E] border border-white/20 flex items-center justify-center text-xl font-black text-white">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-1 block">Hours</span>
            </div>

            <span className="text-xl font-black text-pink-500">:</span>

            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-[#161B2E] border border-white/20 flex items-center justify-center text-xl font-black text-white">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-1 block">Mins</span>
            </div>

            <span className="text-xl font-black text-pink-500">:</span>

            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-[#161B2E] border border-white/20 flex items-center justify-center text-xl font-black text-[#FFA01E]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-1 block">Secs</span>
            </div>

            <span className="text-xl font-black text-pink-500">:</span>

            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-[#FF2A85] border border-white/20 flex items-center justify-center text-xl font-black text-white">
                {timeLeft.millis}
              </div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-1 block">Ms</span>
            </div>
          </div>
        </div>

        {/* Flash Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flashItems.map((product) => {
            const isSaved = wishlist.includes(product.id);
            const discountPct = Math.round(((product.originalPriceINR - product.priceINR) / product.originalPriceINR) * 100);

            return (
              <div
                key={product.id}
                className="group relative bg-[#161B2E] border-2 border-white/10 hover:border-[#FF2A85] rounded-3xl p-4 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Row: Discount Pill & Wishlist Button */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 mb-4">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-[#FF2A85] text-white text-[11px] font-black border border-white/20 shadow">
                      -{discountPct}% OFF
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#0D1322]/80 backdrop-blur-md text-[#00D2B4] text-[10px] font-bold border border-white/10">
                      ⚡ Flash Drop
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-[#FF2A85] transition-colors z-10 cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'text-[#FF2A85] fill-[#FF2A85]' : ''}`} />
                  </button>

                  {/* Quick View Button on Hover */}
                  <button
                    onClick={() => {
                      playAudio('pop');
                      setQuickViewProduct(product);
                    }}
                    className="absolute inset-x-4 bottom-4 py-2 rounded-xl bg-white/90 backdrop-blur-md text-[#0D1322] text-xs font-black opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick Preview</span>
                  </button>
                </div>

                {/* Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#00D2B4]">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#FFA01E]">
                      <Flame className="w-3.5 h-3.5 fill-current" />
                      <span>{product.viralScore}% Hot</span>
                    </div>
                  </div>

                  <h3 className="text-base font-black text-white group-hover:text-[#FFA01E] transition-colors line-clamp-1">
                    {product.title}
                  </h3>

                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-[#00D2B4]">
                      {formatPrice(product.priceINR)}
                    </span>
                    <span className="text-xs text-neutral-400 line-through font-semibold">
                      {formatPrice(product.originalPriceINR)}
                    </span>
                  </div>

                  {/* Stock Left Meter */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px] font-bold text-neutral-300">
                      <span className="text-[#FF2A85]">🔥 Only {product.stockLeft || 5} Left!</span>
                      <span className="text-neutral-400">89% Claimed</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#FF2A85] to-[#FFA01E] w-[89%]" />
                    </div>
                  </div>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#00D2B4] to-[#38BDF8] text-[#0D1322] font-black text-xs uppercase tracking-wider hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Claim Flash Deal</span>
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
