'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Sparkles, CheckCircle } from 'lucide-react';
import { TRENDING_PRODUCTS } from '../lib/data';
import { useShop } from '../context/ShopContext';

const RECENT_BUYERS = [
  { name: 'Sarah T.', location: 'Brooklyn, NY', time: '42s ago' },
  { name: 'Aryan M.', location: 'Mumbai, India', time: '1m ago' },
  { name: 'Chloe L.', location: 'London, UK', time: '2m ago' },
  { name: 'Kabir D.', location: 'Bangalore, India', time: '3m ago' },
  { name: 'Emma R.', location: 'Sydney, Australia', time: '5m ago' },
];

export default function LivePurchaseToast() {
  const { setQuickViewProduct, playAudio } = useShop();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show first toast after 3 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Rotate toasts every 12 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % RECENT_BUYERS.length);
        setIsVisible(true);
      }, 1000);
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  const buyer = RECENT_BUYERS[currentIdx];
  const product = TRENDING_PRODUCTS[currentIdx % TRENDING_PRODUCTS.length];

  return (
    <div className="fixed bottom-5 left-5 z-40 animate-in slide-in-from-bottom-5 duration-300">
      <div
        onClick={() => {
          playAudio('pop');
          setQuickViewProduct(product);
        }}
        className="bg-white border-2 border-[#161B2E] rounded-2xl p-3 neo-shadow-md flex items-center gap-3 max-w-xs sm:max-w-sm hover:scale-102 transition-transform cursor-pointer"
      >
        <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-[11px] font-extrabold text-[#0D1322]">
            <span>{buyer.name}</span>
            <span className="text-neutral-400 font-normal">from {buyer.location}</span>
          </div>
          <p className="text-xs font-bold text-[#FF2A85] truncate">
            Bought {product.title}
          </p>
          <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-semibold">
            <CheckCircle className="w-3 h-3 text-emerald-500" />
            <span>Verified Purchase • {buyer.time}</span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDismissed(true);
          }}
          className="text-neutral-400 hover:text-neutral-700 p-1 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
