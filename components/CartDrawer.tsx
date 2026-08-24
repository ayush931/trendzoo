'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ShoppingBag, Trash2, ArrowRight, Sparkles, Gift, Tag, Check, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import { DiscountCoupon } from '../lib/types';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    formatPrice,
    cartSubtotalINR,
    discountAmountINR,
    cartTotalINR,
    freeShippingProgress,
    amountNeededForFreeShipping,
    appliedCoupon,
    applyCoupon,
    playAudio,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [includeGiftWrap, setIncludeGiftWrap] = useState(true);
  const [giftNote, setGiftNote] = useState('');
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponInput.trim().toUpperCase();

    if (code === 'VIRAL20' || code === 'ZOO20' || code === 'TRENDY20') {
      playAudio('win');
      applyCoupon({ code, discountPercentage: 20, minOrderINR: 0, description: '20% Viral Code Discount' });
      setCouponInput('');
    } else if (code === 'VIPZOO25' || code === 'ZOO25') {
      playAudio('win');
      applyCoupon({ code, discountPercentage: 25, minOrderINR: 0, description: '25% VIP Club Discount' });
      setCouponInput('');
    } else if (code === 'ZOO30' || code === 'BUNDLE30') {
      playAudio('win');
      applyCoupon({ code, discountPercentage: 30, minOrderINR: 0, description: '30% Mega Bundle Discount' });
      setCouponInput('');
    } else if (code === 'MEGA50') {
      playAudio('win');
      applyCoupon({ code, discountPercentage: 50, minOrderINR: 0, description: '50% Mega Roulette Steal' });
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try "VIRAL20" or spin the wheel!');
    }
  };

  const handleSimulateCheckout = () => {
    playAudio('win');
    setShowCheckoutSuccess(true);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#FF2A85', '#FFA01E', '#00D2B4', '#8B5CF6']
    });
  };

  const handleFinishOrder = () => {
    playAudio('pop');
    setShowCheckoutSuccess(false);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => {
          playAudio('click');
          setIsCartOpen(false);
        }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l-[3px] border-[#161B2E] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 bg-white border-b-2 border-[#161B2E] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#FF2A85]" />
              <h2 className="text-lg font-black text-[#0D1322]">
                Your Viral Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>

            <button
              onClick={() => {
                playAudio('click');
                setIsCartOpen(false);
              }}
              className="p-2 rounded-full bg-[#FAF7F2] border-2 border-[#161B2E] neo-shadow-sm hover:bg-[#FF2A85] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-5 py-3 bg-[#0D1322] text-white text-xs">
            <div className="flex items-center justify-between font-bold mb-1.5">
              {amountNeededForFreeShipping > 0 ? (
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <Truck className="w-3.5 h-3.5 text-[#FFA01E]" />
                  Add <span className="text-[#00D2B4] font-black">{formatPrice(amountNeededForFreeShipping)}</span> more for <span className="text-[#FF2A85]">FREE Express Delivery!</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-[#00D2B4] font-black">
                  🎉 UNLOCKED FREE EXPRESS SHIPPING & SURPRISE STICKERS!
                </span>
              )}
            </div>

            <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                style={{ width: `${freeShippingProgress}%` }}
                className="h-full rounded-full bg-gradient-to-r from-[#FF2A85] via-[#FFA01E] to-[#00D2B4] transition-all duration-300"
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedVariant?.name || 'def'}`}
                  className="bg-white border-2 border-[#161B2E] rounded-2xl p-3 neo-shadow-sm flex items-center gap-3"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-black text-[#0D1322] truncate">
                      {item.product.title}
                    </h4>
                    {item.selectedVariant && (
                      <p className="text-[10px] text-neutral-500 font-bold">
                        Color: {item.selectedVariant.name}
                      </p>
                    )}
                    <p className="text-xs font-black text-[#00D2B4] mt-0.5">
                      {formatPrice(item.product.priceINR)}
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-[#FAF7F2] border border-[#161B2E] rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center font-black text-xs hover:bg-neutral-200 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-7 text-center font-bold text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center font-black text-xs hover:bg-neutral-200 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
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
                <ShoppingBag className="w-12 h-12 text-neutral-300 mx-auto" />
                <h3 className="text-base font-black text-[#0D1322]">Your bag is empty</h3>
                <p className="text-xs text-neutral-500">
                  Catch the latest viral gadgets & decor before they sell out!
                </p>
                <button
                  onClick={() => {
                    playAudio('pop');
                    setIsCartOpen(false);
                  }}
                  className="px-6 py-2 rounded-full bg-[#0D1322] text-white text-xs font-bold neo-shadow-sm hover:bg-[#FF2A85] transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            )}

            {/* Gift Wrap & Note Toggle */}
            {cart.length > 0 && (
              <div className="p-3 bg-white border-2 border-[#161B2E] rounded-2xl neo-shadow-sm space-y-2">
                <label className="flex items-center gap-2 text-xs font-black text-[#0D1322] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeGiftWrap}
                    onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                    className="accent-[#FF2A85] w-4 h-4"
                  />
                  <Gift className="w-4 h-4 text-[#FFA01E]" />
                  <span>Free Gift Wrap on the House 🎁</span>
                </label>

                {includeGiftWrap && (
                  <input
                    type="text"
                    placeholder="Add a handwritten gift message (optional)..."
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    className="w-full text-xs bg-[#FAF7F2] border border-neutral-300 rounded-xl p-2 focus:outline-none focus:border-[#FF2A85]"
                  />
                )}
              </div>
            )}

            {/* Coupon Code Input */}
            {cart.length > 0 && (
              <div className="bg-white border-2 border-[#161B2E] rounded-2xl p-3 neo-shadow-sm">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. VIRAL20)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-neutral-300 rounded-xl py-2 pl-8 pr-3 text-xs font-bold uppercase placeholder:normal-case focus:outline-none focus:border-[#FF2A85]"
                    />
                    <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0D1322] text-white text-xs font-black rounded-xl hover:bg-[#FF2A85] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {appliedCoupon && (
                  <div className="mt-2 flex items-center justify-between text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <span>🎉 Applied {appliedCoupon.code} (-{appliedCoupon.discountPercentage}%)</span>
                    <button
                      onClick={() => applyCoupon(null)}
                      className="text-neutral-400 hover:text-red-500 text-[11px] underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {couponError && (
                  <p className="text-[11px] text-red-500 font-bold mt-1.5">{couponError}</p>
                )}
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t-2 border-[#161B2E] space-y-3">
              <div className="space-y-1.5 text-xs font-bold">
                <div className="flex justify-between text-neutral-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartSubtotalINR)}</span>
                </div>

                {discountAmountINR > 0 && (
                  <div className="flex justify-between text-[#FF2A85]">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-{formatPrice(discountAmountINR)}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-500">
                  <span>Express Shipping</span>
                  <span>{amountNeededForFreeShipping === 0 ? 'FREE' : formatPrice(99)}</span>
                </div>

                <div className="flex justify-between text-base font-black text-[#0D1322] pt-2 border-t border-neutral-100">
                  <span>Total Amount</span>
                  <span className="text-[#00D2B4]">{formatPrice(cartTotalINR + (amountNeededForFreeShipping === 0 ? 0 : 99))}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleSimulateCheckout}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF2A85] via-[#FFA01E] to-[#00D2B4] text-[#0D1322] font-black text-sm uppercase tracking-wider border-2 border-[#161B2E] neo-shadow neo-shadow-hover transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Instant 1-Click Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Checkout Success Modal Simulation */}
      {showCheckoutSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] border-[3px] border-[#161B2E] rounded-3xl p-6 sm:p-8 max-w-md w-full text-center neo-shadow-lg space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border-2 border-[#161B2E] neo-shadow-sm flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <h3 className="text-2xl font-black text-[#0D1322]">
              Order Placed Successfully! 🎉
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 font-medium">
              Thank you for ordering with Trenzoo! Your tracking link will be sent to your WhatsApp in 2 minutes. Express packaging is initiated!
            </p>

            <div className="p-3 bg-white border-2 border-[#161B2E] rounded-2xl text-xs font-bold text-left space-y-1">
              <div className="flex justify-between">
                <span className="text-neutral-500">Order ID:</span>
                <span className="font-mono text-[#0D1322]">#TZ-849204</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Free Gift Wrap:</span>
                <span className="text-emerald-600 font-black">Included ✅</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Estimated Dispatch:</span>
                <span className="text-[#FF2A85] font-black">Within 24 Hours ⚡</span>
              </div>
            </div>

            <button
              onClick={handleFinishOrder}
              className="w-full py-3 rounded-full bg-[#0D1322] text-white font-black text-xs uppercase tracking-wider neo-shadow hover:bg-[#FF2A85] transition-colors cursor-pointer"
            >
              Continue Exploring Drops
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
