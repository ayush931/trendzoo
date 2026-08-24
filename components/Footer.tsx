'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, Sparkles, Send, ShieldCheck, Truck, RefreshCw, Heart, Gift, ArrowUp } from 'lucide-react';
import { FAQ_DATA } from '../lib/data';
import { useShop } from '../context/ShopContext';

export default function Footer() {
  const { playAudio, setSelectedCategory, applyCoupon } = useShop();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const toggleFaq = (idx: number) => {
    playAudio('tick');
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    playAudio('win');
    setSubscribed(true);
    applyCoupon({
      code: 'WELCOME10',
      discountPercentage: 10,
      minOrderINR: 0,
      description: '10% Welcome Club Discount'
    });
  };

  const scrollToTop = () => {
    playAudio('pop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0E131F] text-white border-t-4 border-[#161B2E] pt-16 pb-12 relative overflow-hidden">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FFA01E]" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Got Questions? We&apos;ve Got <span className="text-[#00D2B4]">Answers</span>
            </h3>
          </div>

          <div className="space-y-3">
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div
                  key={idx}
                  className="bg-[#161B2E] border-2 border-white/10 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex items-center justify-between font-black text-sm text-white hover:text-[#FFA01E] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#FFA01E]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs font-medium text-neutral-300 leading-relaxed animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Newsletter VIP Banner */}
        <div className="bg-gradient-to-r from-[#FF2A85] via-[#FFA01E] to-[#00D2B4] rounded-3xl p-[2px] neo-shadow-lg mb-16">
          <div className="bg-[#0D1322] rounded-[22px] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-black uppercase tracking-widest text-[#FFA01E]">
                JOIN THE 140K+ TREND HUNTERS
              </span>
              <h4 className="text-2xl font-black text-white">
                Get ₹100 Off Your First Viral Order!
              </h4>
              <p className="text-xs text-neutral-400">
                Weekly early access to sold-out gadget drops & secret discount codes.
              </p>
            </div>

            <div className="w-full md:w-auto">
              {!subscribed ? (
                <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="bg-white/10 border-2 border-white/20 rounded-full px-5 py-3 text-xs text-white font-medium placeholder:text-neutral-500 focus:outline-none focus:border-[#FF2A85]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF2A85] to-[#FFA01E] text-[#0D1322] text-xs font-black uppercase tracking-wider hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500 rounded-2xl text-xs font-black text-emerald-400 flex items-center gap-2">
                  <span>🎉 Welcome to the Club! Code &apos;WELCOME10&apos; unlocked!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Links & Branding */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          
          {/* Logo & Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white border-2 border-white/20 flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Trenzoo Logo"
                  width={36}
                  height={36}
                  className="object-contain p-1"
                />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Tren<span className="text-[#FF2A85]">z</span><span className="text-[#FFA01E]">o</span><span className="text-[#00D2B4]">o</span>
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              The internet&apos;s wildest destination for viral tech gadgets, aesthetic room decor, Y2K fits, and gifts that blow up feeds worldwide.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {['📸 Instagram', '🎵 TikTok', '💬 WhatsApp', '🐦 Twitter/X'].map((social) => (
                <span
                  key={social}
                  className="text-xs font-bold text-neutral-300 hover:text-[#00D2B4] transition-colors cursor-pointer"
                >
                  {social}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Categories */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-black uppercase tracking-widest text-[#FFA01E]">
              Trending Drops
            </h5>
            <ul className="space-y-2 text-xs font-bold text-neutral-400">
              <li
                onClick={() => setSelectedCategory('electronics')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Cyber & Smart Gadgets
              </li>
              <li
                onClick={() => setSelectedCategory('decor')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Levitating Lamps & Mood Décor
              </li>
              <li
                onClick={() => setSelectedCategory('clothing')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Y2K & Streetwear Hoodies
              </li>
              <li
                onClick={() => setSelectedCategory('gifting')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Viral Mystery Loot Boxes
              </li>
              <li
                onClick={() => setSelectedCategory('steals')}
                className="hover:text-[#FF2A85] transition-colors cursor-pointer"
              >
                Today&apos;s ₹99 Flash Steals
              </li>
            </ul>
          </div>

          {/* Trust & Guarantees */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-xs font-black uppercase tracking-widest text-[#00D2B4]">
              Trenzoo Promise
            </h5>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#FF2A85]" />
                <span>Free Express Shipping over ₹999 / $49</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00D2B4]" />
                <span>100% Viral Quality Check Guarantee</span>
              </li>
              <li className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#FFA01E]" />
                <span>7-Day No Questions Asked Returns</span>
              </li>
              <li className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#8B5CF6]" />
                <span>Complimentary Premium Gift Wrap</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-neutral-500">
          <p>© 2026 Trenzoo Inc. Everything trending, for absolutely everyone. Built with ❤️</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-black text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
