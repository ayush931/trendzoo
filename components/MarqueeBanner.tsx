'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Flame, Zap, Gift, Copy, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CurrencyCode } from '../lib/types';

export default function MarqueeBanner() {
  const { soundEnabled, setSoundEnabled, playAudio, currency, setCurrency, applyCoupon } = useShop();
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = () => {
    playAudio('win');
    navigator.clipboard.writeText('VIRAL20');
    setCopiedCode(true);
    applyCoupon({
      code: 'VIRAL20',
      discountPercentage: 20,
      minOrderINR: 799,
      description: '20% Flash Viral Drop Discount'
    });
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const tickerItems = [
    { icon: <Flame className="w-4 h-4 text-orange-400 inline" />, text: "OVER 24,819 VIRAL FINDS SHIPPED THIS WEEK!" },
    { icon: <Zap className="w-4 h-4 text-yellow-300 inline" />, text: "FLASH DROP: USE CODE 'VIRAL20' FOR EXTRA 20% OFF" },
    { icon: <Gift className="w-4 h-4 text-pink-400 inline" />, text: "FREE GIFT WRAP & SURPRISE STICKERS ON ALL ORDERS 🎁" },
    { icon: <Sparkles className="w-4 h-4 text-teal-300 inline" />, text: "FREE EXPRESS SHIPPING OVER ₹999 / $49" },
    { icon: <Flame className="w-4 h-4 text-orange-400 inline" />, text: "100% VIRAL GUARANTEE • 7 DAYS HASSLE-FREE RETURNS" }
  ];

  return (
    <div className="bg-[#0E131F] text-white border-b-2 border-[#161B2E] text-xs font-semibold py-2 px-3 relative overflow-hidden z-40 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Side: Sound Effects Toggle */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => {
              const newState = !soundEnabled;
              setSoundEnabled(newState);
              if (newState) playAudio('pop');
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-all text-neutral-300 hover:text-white text-[11px] cursor-pointer"
            title={soundEnabled ? "Mute funky sound effects" : "Enable funky sound effects"}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#00D2B4] animate-pulse" />
                <span>Audio FX <span className="text-[#00D2B4] font-bold">ON</span></span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                <span>Audio FX <span className="text-neutral-400">OFF</span></span>
              </>
            )}
          </button>
        </div>

        {/* Center: Infinite Marquee Ticker */}
        <div className="flex-1 overflow-hidden relative mx-2">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-[12px] tracking-wide font-medium">
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-neutral-200">
                {item.icon}
                <span>{item.text}</span>
                <span className="text-pink-500 font-bold">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Quick Code Copy & Currency Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleCopyCode}
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#FF2A85] to-[#FFA01E] text-white text-[11px] font-bold shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            {copiedCode ? (
              <>
                <Check className="w-3 h-3 text-white" />
                <span>APPLIED 20% OFF!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>CODE: <span className="underline decoration-dotted">VIRAL20</span></span>
              </>
            )}
          </button>

          {/* Currency Dropdown */}
          <div className="flex items-center bg-white/10 rounded-full px-2 py-0.5 text-[11px]">
            <select
              value={currency}
              onChange={(e) => {
                playAudio('click');
                setCurrency(e.target.value as CurrencyCode);
              }}
              className="bg-transparent text-white font-bold outline-none cursor-pointer pr-1"
            >
              <option value="INR" className="bg-[#0E131F] text-white">₹ INR</option>
              <option value="USD" className="bg-[#0E131F] text-white">$ USD</option>
              <option value="EUR" className="bg-[#0E131F] text-white">€ EUR</option>
              <option value="GBP" className="bg-[#0E131F] text-white">£ GBP</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
