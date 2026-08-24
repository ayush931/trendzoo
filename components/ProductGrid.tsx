'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import CategoryFilterBar from './CategoryFilterBar';
import { TRENDING_PRODUCTS } from '../lib/data';
import { useShop } from '../context/ShopContext';
import { Sparkles, Frown } from 'lucide-react';

export default function ProductGrid() {
  const { selectedCategory, searchQuery, setSearchQuery, setSelectedCategory, playAudio } = useShop();

  const [sortBy, setSortBy] = useState<string>('viral');
  const [maxPrice, setMaxPrice] = useState<number>(4999);

  const filteredProducts = useMemo(() => {
    return TRENDING_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'steals') {
          if (product.priceINR > 999 && product.category !== 'steals') return false;
        } else if (product.category !== selectedCategory) {
          return false;
        }
      }

      // Max price filter
      if (product.priceINR > maxPrice) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesTags = product.tags.some((t) => t.toLowerCase().includes(query));
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesTags && !matchesDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'viral') return b.viralScore - a.viralScore;
      if (sortBy === 'price-low') return a.priceINR - b.priceINR;
      if (sortBy === 'price-high') return b.priceINR - a.priceINR;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, searchQuery, maxPrice, sortBy]);

  return (
    <section id="products-section" className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-[#161B2E] text-xs font-black text-[#0D1322] neo-shadow-sm mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2A85]" />
            <span>CURATED VIRAL VAULT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0D1322] tracking-tight">
            Explore All <span className="text-[#FF2A85]">Trending Drops</span>
          </h2>
          <p className="text-sm text-neutral-500 font-semibold mt-1">
            Handpicked viral products guaranteed to blow up your feed.
          </p>
        </div>

        <div className="text-xs font-bold text-neutral-500">
          Showing <span className="text-[#0D1322] font-black">{filteredProducts.length}</span> viral items
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <CategoryFilterBar
        sortBy={sortBy}
        setSortBy={setSortBy}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      {/* Product Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white border-2 border-[#161B2E] rounded-3xl p-12 text-center neo-shadow max-w-md mx-auto my-8">
          <Frown className="w-12 h-12 text-[#FF2A85] mx-auto mb-3 animate-bounce" />
          <h3 className="text-lg font-black text-[#0D1322]">No trending drops found</h3>
          <p className="text-xs text-neutral-500 font-medium mt-1 mb-4">
            Try adjusting your search keywords or increasing the maximum price slider.
          </p>
          <button
            onClick={() => {
              playAudio('pop');
              setSearchQuery('');
              setSelectedCategory('all');
              setMaxPrice(4999);
            }}
            className="px-6 py-2.5 rounded-full bg-[#0D1322] text-white text-xs font-bold neo-shadow-sm hover:bg-[#FF2A85] transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </section>
  );
}
