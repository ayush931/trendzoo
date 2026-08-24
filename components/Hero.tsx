'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles, Truck, Zap, Star, Eye, ShieldCheck, Flame, Gift } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { HERO_HOTSPOTS, TRENDING_PRODUCTS } from '../lib/data';

export default function Hero() {
  const { playAudio, setQuickViewProduct, addToCart, setSelectedCategory } = useShop();
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const scrollToProducts = () => {
    playAudio('pop');
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSteals = () => {
    playAudio('pop');
    setSelectedCategory('steals');
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-6 pb-12 md:pt-10 md:pb-20 overflow-hidden">
      {/* Background Subtle Ambient Blurs */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Subtitle, CTAs & Social Proof */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-7 text-left z-10">
            
            {/* Live Drops Badge */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#0D1322] text-white border-2 border-[#161B2E] text-xs font-black tracking-wide neo-shadow-sm animate-pulse-subtle">
              <Sparkles className="w-3.5 h-3.5 text-[#FFA01E] animate-spin-slow" />
              <span>4,700+ TRENDING DROPS LIVE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-[#0D1322] tracking-tight leading-[1.08] font-sans">
              Everything <span className="text-[#FF2A85] inline-block hover:scale-105 transition-transform duration-200 cursor-default">trending</span>, <br />
              for absolutely <br />
              <span className="text-[#00D2B4] relative inline-block hover:scale-105 transition-transform duration-200 cursor-default">
                everyone
                <svg
                  className="absolute -bottom-2.5 left-0 w-full h-3.5 text-[#FFA01E] fill-current -z-10"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path d="M0,15 Q50,0 100,15 L100,20 Q50,5 0,20 Z" />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#475569] font-medium leading-relaxed max-w-xl">
              Gadgets blowing up your feed, décor for your cosy corner, fits that photograph well and gifts that actually get screenshotted. All in one funky little zoo.
            </p>

            {/* Interactive Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              {/* Primary Rainbow Gradient Button */}
              <button
                onClick={scrollToProducts}
                className="group flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF2A85] via-[#FFA01E] to-[#00D2B4] text-[#0D1322] text-base font-black border-2 border-[#0D1322] neo-shadow neo-shadow-hover cursor-pointer"
              >
                <span>Shop the trends</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              {/* Secondary Deal Button */}
              <button
                onClick={scrollToSteals}
                className="group flex items-center gap-1.5 text-base font-black text-[#0D1322] hover:text-[#FF2A85] transition-colors cursor-pointer py-2"
              >
                <Flame className="w-4 h-4 text-[#FFA01E] group-hover:scale-125 transition-transform" />
                <span className="wavy-underline">Today&apos;s ₹99 steals</span>
              </button>
            </div>

            {/* Live Social Proof / Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-neutral-300/80">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0D1322]">
                <Truck className="w-4 h-4 text-[#FF2A85] shrink-0" />
                <span>Free shipping ₹999+</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#0D1322]">
                <Zap className="w-4 h-4 text-[#FFA01E] shrink-0" />
                <span>48-hour delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#0D1322]">
                <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B] shrink-0" />
                <span>4.8★ from 62k buyers</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#0D1322]">
                <ShieldCheck className="w-4 h-4 text-[#00D2B4] shrink-0" />
                <span>100% Viral guarantee</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Flatlay Canvas with Interactive Hotspots & Badges */}
          <div className="lg:col-span-6 relative">
            
            {/* Live Viewers Floating Chip */}
            <div className="absolute -top-4 left-6 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border-2 border-[#161B2E] text-xs font-black text-[#0D1322] shadow-md animate-bounce-funky">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <Eye className="w-3.5 h-3.5 text-[#FF2A85]" />
              <span>438 trend lovers viewing right now</span>
            </div>

            {/* Main Interactive Hero Card */}
            <div className="relative rounded-[2.5rem] overflow-hidden border-[3px] border-[#161B2E] neo-shadow-lg bg-[#FAF7F2] aspect-[16/10] sm:aspect-[16/10] group">
              <Image
                src="/images/hero_flatlay.jpg"
                alt="Trenzoo Trending Flatlay Collage"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Floating Hotspots on the Products */}
              {HERO_HOTSPOTS.map((spot) => {
                const targetProduct = TRENDING_PRODUCTS.find(p => p.id === spot.productId);
                const isHovered = activeHotspot === spot.id;

                return (
                  <div
                    key={spot.id}
                    style={{ top: `${spot.topPercent}%`, left: `${spot.leftPercent}%` }}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                    onMouseEnter={() => {
                      playAudio('tick');
                      setActiveHotspot(spot.id);
                    }}
                    onMouseLeave={() => setActiveHotspot(null)}
                  >
                    {/* Hotspot Pulsing Pin */}
                    <button
                      onClick={() => {
                        if (targetProduct) {
                          playAudio('pop');
                          setQuickViewProduct(targetProduct);
                        }
                      }}
                      className="relative w-7 h-7 rounded-full bg-white text-[#0D1322] border-2 border-[#161B2E] neo-shadow-sm flex items-center justify-center font-black text-xs hover:scale-125 transition-transform cursor-pointer group/pin"
                      title={`View ${spot.label}`}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#FF2A85] animate-ping absolute" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF2A85]" />
                    </button>

                    {/* Popover Product Tag */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2.5 bg-white border-2 border-[#161B2E] rounded-2xl p-2.5 neo-shadow-md whitespace-nowrap transition-all duration-200 pointer-events-auto ${
                        isHovered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="text-xs font-black text-[#0D1322]">{spot.label}</div>
                      <div className="flex items-center gap-1.5 text-xs font-bold">
                        <span className="text-[#FF2A85]">{spot.price}</span>
                        <span className="text-neutral-400 line-through text-[10px]">{spot.oldPrice}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (targetProduct) addToCart(targetProduct);
                          }}
                          className="px-2 py-0.5 rounded-full bg-[#0D1322] text-white text-[10px] font-bold hover:bg-[#FF2A85] transition-colors"
                        >
                          + Quick Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Rotating Circular Stamp: NEW DROPS */}
              <div className="absolute right-4 top-4 z-20 hidden sm:block">
                <div className="relative w-20 h-20 rounded-full bg-[#0E131F] text-white border-2 border-[#161B2E] neo-shadow flex items-center justify-center animate-spin-slow">
                  <svg className="w-full h-full p-1" viewBox="0 0 100 100">
                    <path
                      id="circlePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="transparent"
                    />
                    <text className="text-[10px] font-black uppercase tracking-[2.5px] fill-white">
                      <textPath href="#circlePath" startOffset="0%">
                        • NEW DROPS • VIRAL ONLY •
                      </textPath>
                    </text>
                  </svg>
                  <Sparkles className="w-5 h-5 text-[#FFA01E] absolute" />
                </div>
              </div>

              {/* Bottom Right Floating Badge: Gift Wrap on the House */}
              <div className="absolute bottom-4 right-4 z-20">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#FFA01E] text-[#0D1322] border-2 border-[#161B2E] neo-shadow-sm font-black text-xs hover:scale-105 transition-transform cursor-default">
                  <Gift className="w-4 h-4 text-[#0D1322] animate-bounce" />
                  <div className="text-left leading-tight">
                    <span className="block text-[11px] font-extrabold">Gift wrap</span>
                    <span className="block text-[10px] font-semibold text-[#0D1322]/80">on the house 🎁</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
