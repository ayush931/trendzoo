'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Pause, Heart, Eye, ArrowRight, Sparkles, Volume2 } from 'lucide-react';
import { VIRAL_REELS, TRENDING_PRODUCTS } from '../lib/data';
import { useShop } from '../context/ShopContext';

export default function ViralReelsSection() {
  const { playAudio, setQuickViewProduct, addToCart } = useShop();
  const [playingReelId, setPlayingReelId] = useState<string | null>(VIRAL_REELS[0].id);
  const [likedReels, setLikedReels] = useState<string[]>([]);

  const toggleLike = (reelId: string) => {
    playAudio('pop');
    setLikedReels((prev) =>
      prev.includes(reelId) ? prev.filter((id) => id !== reelId) : [...prev, reelId]
    );
  };

  return (
    <section className="py-14 bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF2A85] text-white text-xs font-black tracking-wider uppercase mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>AS SEEN ON YOUR FOR YOU PAGE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D1322] tracking-tight">
              Viral <span className="text-[#FF2A85]">Reels & TikToks</span>
            </h2>
            <p className="text-sm text-neutral-600 font-semibold mt-1">
              Watch real creator unboxings & aesthetic tests before you buy.
            </p>
          </div>

          <div className="text-xs font-bold text-[#0D1322] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span>Over 28.5M+ total views this month</span>
          </div>
        </div>

        {/* Reels Cards Carousel / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VIRAL_REELS.map((reel) => {
            const isPlaying = playingReelId === reel.id;
            const isLiked = likedReels.includes(reel.id);
            const targetProduct = TRENDING_PRODUCTS.find(
              (p) => p.title.toLowerCase().includes(reel.productName.toLowerCase()) || reel.productName.toLowerCase().includes(p.title.toLowerCase())
            ) || TRENDING_PRODUCTS[0];

            return (
              <div
                key={reel.id}
                className="group relative bg-[#0D1322] border-[3px] border-[#161B2E] rounded-3xl overflow-hidden neo-shadow neo-shadow-hover transition-all duration-300 aspect-[9/16] flex flex-col justify-between"
              >
                {/* Background Reel Poster Image */}
                <Image
                  src={reel.image}
                  alt={reel.title}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    isPlaying ? 'scale-110' : 'scale-100 group-hover:scale-105'
                  }`}
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none" />

                {/* Top Bar: Creator Info & Live Views Badge */}
                <div className="relative z-10 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#FF2A85] text-white font-black text-xs flex items-center justify-center border border-white">
                      {reel.creator.charAt(1).toUpperCase()}
                    </div>
                    <span className="text-xs font-bold text-white shadow-sm">
                      {reel.creator}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                    <Eye className="w-3.5 h-3.5 text-[#00D2B4]" />
                    <span>{reel.views}</span>
                  </div>
                </div>

                {/* Center Interactive Play / Pause Button */}
                <div className="relative z-10 flex items-center justify-center">
                  <button
                    onClick={() => {
                      playAudio('pop');
                      setPlayingReelId(isPlaying ? null : reel.id);
                    }}
                    className={`w-14 h-14 rounded-full border-2 border-white flex items-center justify-center text-white backdrop-blur-md transition-all cursor-pointer ${
                      isPlaying
                        ? 'bg-[#FF2A85]/80 scale-100'
                        : 'bg-black/50 hover:bg-[#FF2A85] hover:scale-110'
                    }`}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 fill-current" />
                    ) : (
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    )}
                  </button>
                </div>

                {/* Bottom Content: Title, Tags & Direct Shop Bar */}
                <div className="relative z-10 p-4 space-y-3">
                  
                  {/* Playing Sound Wave Indicator */}
                  {isPlaying && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00D2B4]/20 border border-[#00D2B4] text-[#00D2B4] text-[10px] font-bold w-fit animate-pulse">
                      <Volume2 className="w-3 h-3 animate-bounce" />
                      <span>Original Audio • Viral Bop</span>
                    </div>
                  )}

                  <p className="text-xs font-bold text-white leading-snug line-clamp-2">
                    {reel.title}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {reel.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold text-neutral-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Product Mini Bar & Shop Button */}
                  <div className="pt-2 border-t border-white/20 flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-black text-white truncate">
                        {reel.productName}
                      </p>
                      <p className="text-[11px] font-extrabold text-[#00D2B4]">
                        {reel.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Reel Heart Like Button */}
                      <button
                        onClick={() => toggleLike(reel.id)}
                        className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:text-[#FF2A85] transition-colors cursor-pointer"
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'text-[#FF2A85] fill-[#FF2A85]' : ''}`} />
                      </button>

                      {/* Quick Buy CTA */}
                      <button
                        onClick={() => {
                          playAudio('pop');
                          setQuickViewProduct(targetProduct);
                        }}
                        className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FF2A85] to-[#FFA01E] text-[#0D1322] text-xs font-black hover:scale-105 transition-transform flex items-center gap-1 cursor-pointer shadow-sm"
                      >
                        <span>Shop</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
