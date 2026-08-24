'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Search, ShoppingBag, Heart, Sparkles, Dices, X, ArrowRight, Flame } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { TRENDING_PRODUCTS } from '../lib/data';
import { CategoryId } from '../lib/types';

export default function Navbar() {
  const {
    cart,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsRouletteOpen,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    playAudio,
    setQuickViewProduct,
    formatPrice
  } = useShop();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? TRENDING_PRODUCTS.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const handleCategoryClick = (catId: CategoryId) => {
    playAudio('click');
    setSelectedCategory(catId);
    const gridEl = document.getElementById('products-section');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b-2 border-[#161B2E] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playAudio('pop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group cursor-pointer text-left"
            >
              <div className="relative w-11 h-11 rounded-2xl bg-white border-2 border-[#161B2E] neo-shadow-sm flex items-center justify-center overflow-hidden group-hover:scale-105 group-hover:-rotate-3 transition-transform">
                <Image
                  src="/logo.png"
                  alt="Trenzoo Logo"
                  width={40}
                  height={40}
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-black tracking-tight text-[#0D1322] font-sans">
                    Tren<span className="text-[#FF2A85]">z</span><span className="text-[#FFA01E]">o</span><span className="text-[#00D2B4]">o</span>
                  </span>
                  <Sparkles className="w-4 h-4 text-[#FFA01E] group-hover:rotate-45 transition-transform" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#5A6478] -mt-1 hidden sm:block">
                  Trending for Everyone
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {[
              { id: 'electronics' as CategoryId, label: 'Electronics' },
              { id: 'decor' as CategoryId, label: 'Home Décor' },
              { id: 'clothing' as CategoryId, label: 'Clothing' },
              { id: 'gifting' as CategoryId, label: 'Gifting' },
              { id: 'steals' as CategoryId, label: 'Deals', isDeal: true },
            ].map((item) => {
              const isActive = selectedCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#0D1322] text-white neo-shadow-sm'
                      : 'text-[#161B2E] hover:bg-black/5'
                  } ${item.isDeal ? 'text-[#FF2A85]' : ''}`}
                >
                  {item.isDeal && <Flame className="w-3.5 h-3.5 text-[#FF2A85] animate-bounce" />}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Search Bar & Auto-Suggestions */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-xs md:max-w-sm hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search trending things..."
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-[#161B2E] rounded-full py-2 pl-10 pr-9 text-sm font-medium text-[#0D1322] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#FF2A85] transition-all shadow-sm"
              />
              <Search className="w-4 h-4 text-[#161B2E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Autocomplete Dropdown */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-[#161B2E] rounded-2xl neo-shadow-lg p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {searchQuery.trim() === '' ? (
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                      🔥 Popular Trending Searches
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['#Smartwatch', '#Levitating', '#Cyberpunk', '#Y2KFit', '#AestheticVase', '#MysteryBox'].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => {
                            playAudio('click');
                            setSearchQuery(tag.replace('#', ''));
                            setIsSearchFocused(false);
                            const gridEl = document.getElementById('products-section');
                            if (gridEl) gridEl.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-2.5 py-1 rounded-full bg-[#FAF7F2] hover:bg-[#FF2A85] hover:text-white border border-[#161B2E]/20 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                      Matching Drops ({searchResults.length})
                    </div>
                    <div className="space-y-2">
                      {searchResults.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            playAudio('pop');
                            setQuickViewProduct(item);
                            setIsSearchFocused(false);
                          }}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FAF7F2] transition-colors cursor-pointer group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                            <Image
                              src={item.images[0]}
                              alt={item.title}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-[#0D1322] truncate group-hover:text-[#FF2A85] transition-colors">
                              {item.title}
                            </p>
                            <p className="text-xs font-semibold text-[#00D2B4]">
                              {formatPrice(item.priceINR)}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-4 text-center text-xs font-medium text-neutral-500">
                    No trending item found for &ldquo;{searchQuery}&rdquo;. Try another search!
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons: Spin Wheel, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Gamified Roulette Spin Trigger */}
            <button
              onClick={() => {
                playAudio('chime');
                setIsRouletteOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#FFA01E] to-[#FF2A85] text-white text-xs font-extrabold border-2 border-[#161B2E] neo-shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="Spin the Trend Roulette for up to 50% OFF!"
            >
              <Dices className="w-4 h-4 animate-spin-slow" />
              <span className="hidden sm:inline">Spin Wheel</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => {
                playAudio('click');
                setIsWishlistOpen(true);
              }}
              className="relative p-2.5 rounded-full bg-white border-2 border-[#161B2E] neo-shadow-sm hover:bg-[#FFF1F2] transition-colors cursor-pointer"
              title="View Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-[#FF2A85] fill-[#FF2A85]' : 'text-[#161B2E]'}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FF2A85] text-white text-[11px] font-black flex items-center justify-center border-2 border-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => {
                playAudio('pop');
                setIsCartOpen(true);
              }}
              className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#0D1322] text-white border-2 border-[#161B2E] neo-shadow-sm hover:bg-[#161B2E] hover:scale-105 active:scale-95 transition-all cursor-pointer group"
              title="View Bag"
            >
              <ShoppingBag className="w-5 h-5 text-[#00D2B4] group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-extrabold hidden sm:inline">Bag</span>
              <span className="w-5 h-5 rounded-full bg-[#FF2A85] text-white text-xs font-black flex items-center justify-center">
                {cartItemsCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
