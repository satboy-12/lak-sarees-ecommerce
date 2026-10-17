// LAK SAREES — Product Card Component
// Conforming to Stitch Royal Heritage Couture Design System

import React, { useState } from 'react'
import { useStore } from '../context/StoreContext'
import { Heart, Plus, Eye, Check, ShieldCheck, Sparkles } from 'lucide-react'

export const ProductCard = ({ product, onSelect }) => {
  const { addToCart, isWishlisted, toggleWishlist, formatMoney, setQuickViewProduct } = useStore()
  const wish = isWishlisted(product.id)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    addToCart(product, 1)
  }

  const handleQuickView = (e) => {
    e.stopPropagation()
    setQuickViewProduct(product)
  }

  const handleWishlist = (e) => {
    e.stopPropagation()
    toggleWishlist(product.id)
  }

  return (
    <article
      onClick={() => onSelect(product)}
      className="product-card group relative flex flex-col bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-300 cursor-pointer"
    >
      {/* 1. IMAGE CONTAINER WITH TAGS & BADGES */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-container-low">
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            setImageLoaded(true)
            e.currentTarget.src = '/images/fallback-saree.jpg'
          }}
          className={`product-image h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {!imageLoaded && (
          <div className="absolute inset-0 bg-surface-container-high/40 animate-pulse flex items-center justify-center text-xs text-on-surface-variant font-medium">
            Loading Weave...
          </div>
        )}

        {/* Tag Pill (Top Left) */}
        {product.tag && (
          <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-primary shadow-xs">
            {product.tag}
          </div>
        )}

        {/* 100% Silk Mark Micro-Seal (Top Right, next to wishlist) */}
        {product.silkMarkCertified && (
          <div
            className="absolute top-3 right-12 w-7 h-7 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-secondary shadow-xs"
            title="100% Pure Silk Mark Certified"
          >
            <ShieldCheck size={14} />
          </div>
        )}

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={handleWishlist}
          aria-label={wish ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
            wish
              ? 'bg-primary text-white shadow-md'
              : 'bg-surface-container-lowest/90 text-primary hover:bg-primary hover:text-white'
          }`}
        >
          <Heart size={15} fill={wish ? 'currentColor' : 'none'} />
        </button>

        {/* Quick View & Add to Bag Floating Action Ribbon */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleQuickView}
            className="flex-1 py-2.5 px-3 bg-surface-container-lowest/95 backdrop-blur-md text-primary font-bold text-[11px] uppercase tracking-wider rounded shadow hover:bg-white flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye size={13} /> Quick Look
          </button>
          <button
            onClick={handleAdd}
            className="py-2.5 px-3.5 bg-primary text-white font-bold text-[11px] uppercase tracking-wider rounded shadow hover:bg-primary-container flex items-center justify-center gap-1 transition-colors"
            title="Add to shopping bag"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* 2. PRODUCT DETAILS VIGNETTE */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Cluster */}
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-secondary font-bold">
            <span>{product.category}</span>
            {product.origin && (
              <span className="text-on-surface-variant font-medium lowercase italic">
                {product.origin.split(',')[0]}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-base sm:text-lg font-semibold text-primary leading-snug mt-1 group-hover:text-secondary transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Subtitle / Weave Note */}
          <p className="font-sans text-xs text-on-surface-variant line-clamp-1 mt-1">
            {product.fabric} · {product.color}
          </p>
        </div>

        {/* Price & Stock Indicator */}
        <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-base sm:text-lg font-bold text-primary">
              {formatMoney(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-on-surface-variant/70 line-through">
                {formatMoney(product.originalPrice)}
              </span>
            )}
          </div>

          <span
            className={`text-[10px] font-semibold uppercase tracking-wider ${
              product.stock > 3 ? 'text-secondary font-bold' : 'text-amber-700 font-bold'
            }`}
          >
            {product.stock <= 3 ? `Only ${product.stock} Left` : 'Handloom Vault'}
          </span>
        </div>
      </div>
    </article>
  )
}
