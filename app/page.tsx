import React from 'react';
import MarqueeBanner from '../components/MarqueeBanner';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FlashDropSection from '../components/FlashDropSection';
import ProductGrid from '../components/ProductGrid';
import ViralReelsSection from '../components/ViralReelsSection';
import MysteryBundleBuilder from '../components/MysteryBundleBuilder';
import CustomerReviews from '../components/CustomerReviews';
import ScratchCardPromo from '../components/ScratchCardPromo';
import LivePurchaseToast from '../components/LivePurchaseToast';
import TrendRouletteModal from '../components/TrendRouletteModal';
import QuickViewModal from '../components/QuickViewModal';
import CartDrawer from '../components/CartDrawer';
import WishlistDrawer from '../components/WishlistDrawer';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#0D1322]">
      {/* Top Ticker Marquee */}
      <MarqueeBanner />

      {/* Main Sticky Navbar */}
      <Navbar />

      {/* Hero Section (Matching Reference Style Elevated) */}
      <Hero />

      {/* Limited Batch Live Flash Drops */}
      <FlashDropSection />

      {/* Main Dynamic Product Catalog with Category Filters */}
      <ProductGrid />

      {/* Interactive TikTok / Viral Reels Feed */}
      <ViralReelsSection />

      {/* Interactive 3-Pack Bundle Builder (Flat 30% OFF) */}
      <MysteryBundleBuilder />

      {/* Social Proof & Customer Reviews */}
      <CustomerReviews />

      {/* Interactive VIP Scratch Card Promo */}
      <ScratchCardPromo />

      {/* Footer & FAQ */}
      <Footer />

      {/* Global Modals & Interactive Drawers */}
      <TrendRouletteModal />
      <QuickViewModal />
      <CartDrawer />
      <WishlistDrawer />
      <LivePurchaseToast />
    </main>
  );
}
