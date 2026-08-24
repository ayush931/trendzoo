'use client';

import React from 'react';
import { CATEGORIES } from '../lib/data';
import { CategoryId } from '../lib/types';
import { useShop } from '../context/ShopContext';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

interface CategoryFilterBarProps {
  sortBy: string;
  setSortBy: (val: string) => void;
  maxPrice: number;
  setMaxPrice: (val: number) => void;
}

export default function CategoryFilterBar({
  sortBy,
  setSortBy,
  maxPrice,
  setMaxPrice,
}: CategoryFilterBarProps) {
  const { selectedCategory, setSelectedCategory, playAudio, formatPrice } = useShop();

  return (
    <div className="mb-10 space-y-6">
      {/* Category Pills Row */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => {
                playAudio('click');
                setSelectedCategory(cat.id as CategoryId);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black border-2 border-[#161B2E] whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-[#0D1322] text-white neo-shadow-sm scale-105'
                  : 'bg-white text-[#0D1322] hover:bg-[#FAF7F2] hover:scale-102'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isSelected ? 'bg-[#FF2A85] text-white' : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary Filter & Sort Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border-2 border-[#161B2E] neo-shadow-sm">
        
        {/* Price Slider */}
        <div className="flex items-center gap-3 flex-1 min-w-[240px]">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#0D1322]">
            <SlidersHorizontal className="w-4 h-4 text-[#FF2A85]" />
            <span>Max Price:</span>
            <span className="text-[#FF2A85] font-black">{formatPrice(maxPrice)}</span>
          </div>
          <input
            type="range"
            min="499"
            max="4999"
            step="200"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="flex-1 accent-[#FF2A85] cursor-pointer h-2 bg-neutral-200 rounded-lg"
          />
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-neutral-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => {
              playAudio('click');
              setSortBy(e.target.value);
            }}
            className="bg-[#FAF7F2] border-2 border-[#161B2E] rounded-xl px-3 py-1.5 text-xs font-black text-[#0D1322] outline-none cursor-pointer hover:bg-neutral-100 transition-colors"
          >
            <option value="viral">🔥 Highest Viral Heat</option>
            <option value="price-low">⚡ Price: Low to High</option>
            <option value="price-high">💎 Price: High to Low</option>
            <option value="rating">⭐️ Top Customer Rating</option>
          </select>
        </div>

      </div>
    </div>
  );
}
