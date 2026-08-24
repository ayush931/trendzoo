'use client';

import React from 'react';
import Image from 'next/image';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { TRENDING_PRODUCTS } from '../lib/data';

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    formatPrice,
    playAudio,
  } = useShop();

  if (!isWishlistOpen) return null;

  const favoritedProducts = TRENDING_PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => {
          playAudio('click');
          setIsWishlistOpen(false);
        }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l-[3px] border-[#161B2E] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 bg-white border-b-2 border-[#161B2E] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#FF2A85] fill-[#FF2A85]" />
              <h2 className="text-lg font-black text-[#0D1322]">
                Your Wishlist ({wishlist.length})
              </h2>
            </div>

            <button
              onClick={() => {
                playAudio('click');
                setIsWishlistOpen(false);
              }}
              className="p-2 rounded-full bg-[#FAF7F2] border-2 border-[#161B2E] neo-shadow-sm hover:bg-[#FF2A85] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {favoritedProducts.length > 0 ? (
              favoritedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border-2 border-[#161B2E] rounded-2xl p-3 neo-shadow-sm flex items-center gap-3"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-black text-[#0D1322] truncate">
                      {product.title}
                    </h4>
                    <p className="text-xs font-black text-[#00D2B4] mt-0.5">
                      {formatPrice(product.priceINR)}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          addToCart(product);
                          toggleWishlist(product.id);
                        }}
                        className="px-3 py-1 bg-[#0D1322] hover:bg-[#FF2A85] text-white text-[11px] font-black rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>

                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-neutral-400 hover:text-red-500 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center space-y-3">
                <Heart className="w-12 h-12 text-neutral-300 mx-auto" />
                <h3 className="text-base font-black text-[#0D1322]">No saved items yet</h3>
                <p className="text-xs text-neutral-500">
                  Tap the heart icon on any trending drop to save it for later!
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
