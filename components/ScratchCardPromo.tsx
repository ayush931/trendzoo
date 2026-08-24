'use client';

import React, { useState } from 'react';
import { Sparkles, Gift, Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';

export default function ScratchCardPromo() {
  const { playAudio, applyCoupon, setIsCartOpen } = useShop();
  const [isScratched, setIsScratched] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleScratch = () => {
    if (isScratched) return;
    playAudio('win');
    setIsScratched(true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FF2A85', '#FFA01E', '#00D2B4']
    });

    applyCoupon({
      code: 'VIPZOO25',
      discountPercentage: 25,
      minOrderINR: 0,
      description: 'VIP Secret Scratch Card (25% OFF)'
    });
  };

  const handleCopy = () => {
    playAudio('click');
    navigator.clipboard.writeText('VIPZOO25');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-14 bg-[#FAF7F2] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl bg-gradient-to-r from-[#FF2A85] via-[#8B5CF6] to-[#00D2B4] p-[3px] neo-shadow-lg">
        <div className="bg-[#0D1322] rounded-[22px] p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-white">
          
          {/* Left Text */}
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#FFA01E] text-xs font-black uppercase tracking-wider border border-white/20">
              <Gift className="w-3.5 h-3.5" />
              <span>VIP TREND CLUB SCRATCH REWARD</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Scratch & Reveal Your Secret VIP Code!
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-medium">
              Click the holographic foil below to uncover a secret 25% OFF mystery code that can be stacked with free shipping.
            </p>
          </div>

          {/* Right: Interactive Scratch Box */}
          <div className="w-full max-w-sm">
            <div
              onClick={handleScratch}
              className={`relative h-28 rounded-2xl border-2 border-white/40 neo-shadow flex items-center justify-center cursor-pointer transition-all duration-500 overflow-hidden ${
                isScratched
                  ? 'bg-gradient-to-r from-[#FFA01E] to-[#FF2A85]'
                  : 'bg-gradient-to-br from-neutral-700 via-neutral-600 to-neutral-800 hover:scale-102'
              }`}
            >
              {!isScratched ? (
                <div className="text-center p-4">
                  <div className="text-xs font-black uppercase tracking-widest text-[#FFA01E] flex items-center justify-center gap-1.5 animate-pulse">
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span>TAP HERE TO SCRATCH FOIL</span>
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                  </div>
                  <p className="text-[11px] text-neutral-300 font-bold mt-1">
                    ✨ Guaranteed 25% OFF Mystery Pass
                  </p>
                </div>
              ) : (
                <div className="text-center p-4 animate-in zoom-in-95 duration-200">
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#0D1322]">
                    🎉 SECRET CODE REVEALED:
                  </div>
                  <div className="text-2xl font-black text-white tracking-widest my-0.5">
                    VIPZOO25
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy();
                      }}
                      className="px-2.5 py-0.5 rounded-full bg-white text-[#0D1322] text-[10px] font-black hover:bg-[#FAF7F2] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playAudio('pop');
                        setIsCartOpen(true);
                      }}
                      className="px-2.5 py-0.5 rounded-full bg-[#0D1322] text-white text-[10px] font-black hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      Open Bag
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
