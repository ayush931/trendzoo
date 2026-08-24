'use client';

import React from 'react';
import Image from 'next/image';
import { Gift, Plus, Sparkles, Check, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import { TRENDING_PRODUCTS } from '../lib/data';

export default function MysteryBundleBuilder() {
  const {
    bundleItems,
    toggleBundleItem,
    clearBundle,
    addBundleToCart,
    formatPrice,
    playAudio,
  } = useShop();

  const originalTotal = bundleItems.reduce((sum, item) => sum + item.priceINR, 0);
  const bundleDiscount = Math.round(originalTotal * 0.3);
  const bundleFinalPrice = Math.max(0, originalTotal - bundleDiscount);
  const isBundleComplete = bundleItems.length === 3;

  const handleBundleCheckout = () => {
    playAudio('win');
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF2A85', '#FFA01E', '#00D2B4', '#8B5CF6']
    });
    addBundleToCart();
  };

  return (
    <section className="py-16 bg-[#0D1322] text-white border-y-2 border-[#161B2E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF2A85] to-[#FFA01E] text-white text-xs font-black uppercase tracking-wider mb-3">
            <Gift className="w-4 h-4" />
            <span>CUSTOM VIRAL BUNDLE BUILDER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Pick Any <span className="text-[#00D2B4]">3 Viral Items</span> & Save Flat <span className="text-[#FF2A85]">30%</span>
          </h2>
          <p className="text-sm text-neutral-400 font-medium mt-2">
            Mix & match gadgets, decor, fits, or gifts. Includes free holographic stickers & free gift wrap!
          </p>
        </div>

        {/* 3 Bundle Slots Box */}
        <div className="bg-[#161B2E] border-2 border-white/20 rounded-3xl p-6 sm:p-8 neo-shadow-lg mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((slotIndex) => {
              const item = bundleItems[slotIndex];

              return (
                <div
                  key={slotIndex}
                  className={`relative rounded-2xl border-2 p-4 transition-all duration-300 flex flex-col items-center justify-center min-h-[220px] text-center ${
                    item
                      ? 'bg-white/10 border-[#00D2B4] neo-shadow-sm'
                      : 'border-dashed border-white/20 bg-white/5'
                  }`}
                >
                  {item ? (
                    <div className="w-full flex flex-col items-center">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden mb-3 border border-white/20">
                        <Image
                          src={item.images[0]}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="text-xs font-black text-white line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-xs font-bold text-[#00D2B4] mt-0.5">
                        {formatPrice(item.priceINR)}
                      </p>

                      <button
                        onClick={() => toggleBundleItem(item)}
                        className="mt-3 text-[11px] font-bold text-pink-400 hover:text-pink-300 underline cursor-pointer"
                      >
                        Remove Item
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto text-neutral-400">
                        <Plus className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-bold text-neutral-400">
                        Slot #{slotIndex + 1}: Select an item below
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bundle Summary & CTA Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div>
                <span className="text-xs text-neutral-400 font-semibold block">Total Bundle Value</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#00D2B4]">
                    {formatPrice(bundleFinalPrice)}
                  </span>
                  {bundleItems.length > 0 && (
                    <span className="text-sm text-neutral-400 line-through font-semibold">
                      {formatPrice(originalTotal)}
                    </span>
                  )}
                </div>
              </div>

              {isBundleComplete && (
                <div className="px-3 py-1 rounded-full bg-[#FF2A85]/20 border border-[#FF2A85] text-[#FF2A85] text-xs font-black">
                  🎉 Saved {formatPrice(bundleDiscount)} (30% OFF)
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {bundleItems.length > 0 && (
                <button
                  onClick={() => {
                    playAudio('click');
                    clearBundle();
                  }}
                  className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}

              <button
                onClick={handleBundleCheckout}
                disabled={!isBundleComplete}
                className={`px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  isBundleComplete
                    ? 'bg-gradient-to-r from-[#FF2A85] to-[#FFA01E] text-[#0D1322] border-2 border-white neo-shadow hover:scale-105 active:scale-95'
                    : 'bg-white/10 text-neutral-500 cursor-not-allowed border border-white/10'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>{isBundleComplete ? 'Add 3-Pack Bundle to Bag' : `Select ${3 - bundleItems.length} More Items`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Pick Carousel for Bundle */}
        <div>
          <h3 className="text-sm font-black uppercase tracking-wider text-neutral-400 mb-4">
            👇 Click To Add To Your 3-Pack Bundle:
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {TRENDING_PRODUCTS.map((prod) => {
              const isSelected = bundleItems.some((p) => p.id === prod.id);

              return (
                <div
                  key={prod.id}
                  onClick={() => toggleBundleItem(prod)}
                  className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer group flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#00D2B4]/20 border-[#00D2B4] scale-105'
                      : 'bg-[#161B2E] border-white/10 hover:border-white/40'
                  }`}
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-2 bg-neutral-900">
                    <Image
                      src={prod.images[0]}
                      alt={prod.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-[#00D2B4]/60 flex items-center justify-center">
                        <Check className="w-6 h-6 text-[#0D1322] font-black" />
                      </div>
                    )}
                  </div>

                  <div>
                    <h5 className="text-[11px] font-bold text-white line-clamp-1">
                      {prod.title}
                    </h5>
                    <p className="text-[10px] font-black text-[#00D2B4]">
                      {formatPrice(prod.priceINR)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
