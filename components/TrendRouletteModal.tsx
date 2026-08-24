'use client';

import React, { useState, useRef } from 'react';
import { X, Sparkles, Trophy, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import { DiscountCoupon } from '../lib/types';

interface WheelSegment {
  label: string;
  code: string;
  discountPercentage: number;
  color: string;
  textColor: string;
}

const SEGMENTS: WheelSegment[] = [
  { label: '30% OFF DROP', code: 'ZOO30', discountPercentage: 30, color: '#FF2A85', textColor: '#FFFFFF' },
  { label: 'FREE EXPRESS SHIP', code: 'FREESHIP', discountPercentage: 15, color: '#00D2B4', textColor: '#0D1322' },
  { label: '50% MEGA STEAL', code: 'MEGA50', discountPercentage: 50, color: '#8B5CF6', textColor: '#FFFFFF' },
  { label: '₹500 MYSTERY VOUCHER', code: 'MYSTERY500', discountPercentage: 25, color: '#FFA01E', textColor: '#0D1322' },
  { label: '20% OFF CARTS', code: 'TRENDY20', discountPercentage: 20, color: '#38BDF8', textColor: '#0D1322' },
  { label: 'FREE MYSTERY GIFT', code: 'FREEGIFT', discountPercentage: 20, color: '#FDE047', textColor: '#0D1322' },
];

export default function TrendRouletteModal() {
  const { isRouletteOpen, setIsRouletteOpen, playAudio, applyCoupon, setIsCartOpen } = useShop();
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonSegment, setWonSegment] = useState<WheelSegment | null>(null);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  if (!isRouletteOpen) return null;

  const handleSpin = () => {
    if (isSpinning) return;
    playAudio('swoosh');
    setIsSpinning(true);
    setWonSegment(null);

    // Pick winning segment (bias towards fun discounts like 30% or 50%)
    const selectedIndex = Math.floor(Math.random() * SEGMENTS.length);
    const segmentAngle = 360 / SEGMENTS.length;
    
    // Calculate total degrees to spin (multiple full revolutions + target segment offset)
    const extraRounds = 5 * 360;
    const targetDegree = extraRounds + (SEGMENTS.length - selectedIndex) * segmentAngle - segmentAngle / 2;
    const finalDegree = rotationDegrees + targetDegree;

    setRotationDegrees(finalDegree);

    // Audio tick simulation while spinning
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      tickCount++;
      playAudio('tick');
      if (tickCount >= 18) clearInterval(tickInterval);
    }, 180);

    setTimeout(() => {
      setIsSpinning(false);
      const winner = SEGMENTS[selectedIndex];
      setWonSegment(winner);
      playAudio('win');

      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FF2A85', '#FFA01E', '#00D2B4', '#8B5CF6', '#FDE047']
      });

      // Auto apply coupon
      const coupon: DiscountCoupon = {
        code: winner.code,
        discountPercentage: winner.discountPercentage,
        minOrderINR: 0,
        description: `Won from Trend Roulette: ${winner.label}`
      };
      applyCoupon(coupon);
    }, 3800);
  };

  const handleClaimAndShop = () => {
    playAudio('pop');
    setIsRouletteOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] border-[3px] border-[#161B2E] rounded-3xl neo-shadow-lg p-6 sm:p-8 text-center overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => {
            playAudio('click');
            setIsRouletteOpen(false);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white border-2 border-[#161B2E] neo-shadow-sm hover:bg-[#FF2A85] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1322] text-white text-xs font-black mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#FFA01E]" />
          <span>TREND ROULETTE • 100% WIN RATE</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-[#0D1322] tracking-tight">
          Spin & Unlock Your <span className="text-[#FF2A85]">Secret Drop</span>
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 font-semibold mt-1 mb-6">
          Every single spin is guaranteed to win a viral discount coupon code!
        </p>

        {/* Wheel Container */}
        <div className="relative w-64 h-64 mx-auto my-4 flex items-center justify-center">
          {/* Wheel Pointer Arrow */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[22px] border-t-[#0D1322] drop-shadow-md" />

          {/* Rotating Wheel Disc */}
          <div
            ref={wheelRef}
            style={{
              transform: `rotate(${rotationDegrees}deg)`,
              transition: isSpinning ? 'transform 3.8s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none'
            }}
            className="w-full h-full rounded-full border-4 border-[#161B2E] neo-shadow relative overflow-hidden flex items-center justify-center bg-white"
          >
            {/* 6 Conic Segments */}
            {SEGMENTS.map((seg, i) => {
              const rotateDeg = i * (360 / SEGMENTS.length);
              return (
                <div
                  key={i}
                  style={{
                    transform: `rotate(${rotateDeg}deg)`,
                    backgroundColor: seg.color,
                    clipPath: 'polygon(50% 50%, 0% 0%, 100% 0%)'
                  }}
                  className="absolute inset-0 origin-center flex justify-center pt-2"
                >
                  <span
                    style={{ color: seg.textColor }}
                    className="text-[10px] sm:text-[11px] font-black uppercase tracking-tight -rotate-90 mt-6"
                  >
                    {seg.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center Spin Hub Button */}
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className="absolute z-20 w-16 h-16 rounded-full bg-[#0D1322] text-white border-2 border-white neo-shadow-sm flex flex-col items-center justify-center hover:scale-110 active:scale-95 transition-transform disabled:opacity-80 cursor-pointer"
          >
            <span className="text-[11px] font-black tracking-wider text-[#00D2B4]">
              {isSpinning ? '...' : 'SPIN!'}
            </span>
          </button>
        </div>

        {/* Winner Announcement Banner */}
        {wonSegment ? (
          <div className="mt-4 p-4 rounded-2xl bg-white border-2 border-[#161B2E] neo-shadow-sm animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-center gap-2 text-sm font-black text-[#0D1322]">
              <Trophy className="w-5 h-5 text-[#FFA01E]" />
              <span>YOU UNLOCKED: <span className="text-[#FF2A85]">{wonSegment.label}</span></span>
            </div>
            <p className="text-xs text-neutral-500 font-semibold mt-0.5">
              Code <span className="font-mono font-black text-[#0D1322] bg-[#FAF7F2] px-2 py-0.5 rounded border border-neutral-300">{wonSegment.code}</span> has been auto-applied to your bag!
            </p>
            <button
              onClick={handleClaimAndShop}
              className="mt-3 w-full py-2.5 rounded-full bg-gradient-to-r from-[#FF2A85] to-[#FFA01E] text-[#0D1322] font-black text-sm border-2 border-[#161B2E] neo-shadow-sm hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Use Discount In Bag</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className="mt-4 w-full py-3.5 rounded-full bg-[#0D1322] text-white font-black text-sm border-2 border-[#161B2E] neo-shadow hover:bg-[#FF2A85] hover:text-white transition-all cursor-pointer disabled:opacity-50"
          >
            {isSpinning ? '⚡ Finding Your Lucky Drop...' : 'Tap To Spin Wheel 🎡'}
          </button>
        )}

      </div>
    </div>
  );
}
