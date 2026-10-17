// LAK SAREES — Product Details & Haute Couture Dossier
// Faithful reproduction of Stitch Product Details Screen

import React, { useState } from 'react'
import { useStore } from '../context/StoreContext'
import { ProductCard } from '../components/ProductCard'
import {
  ShieldCheck, Sparkles, MessageCircle, ShoppingBag, Plus, Minus,
  ChevronRight, ArrowRight, Check, Package, RotateCcw, Heart
} from 'lucide-react'

export const ProductDetailPage = ({ product, navigate, onSelectProduct }) => {
  const { products, addToCart, isWishlisted, toggleWishlist, formatMoney } = useStore()
  const WHATSAPP_NUMBER = '919876543210'

  const galleryImages = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image, '/images/products/saree-folded-jasmine.jpg', '/images/branding/packaging-box.jpg']

  const [activeImage, setActiveImage] = useState(galleryImages[0])
  const [selectedBlouse, setSelectedBlouse] = useState('Unstitched Brocade Piece')
  const [quantity, setQuantity] = useState(1)
  const wish = isWishlisted(product.id)

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedBlouse)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedBlouse)
    navigate('checkout')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.occasion === product.occasion))
    .slice(0, 3)

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* 1. SUBTLE BREADCRUMB BAR */}
      <div className="w-full bg-surface-container-low/70 py-3 px-4 sm:px-6 lg:px-16 border-b border-outline-variant/30">
        <div className="max-w-[1360px] mx-auto flex items-center gap-2 text-xs uppercase tracking-widest text-on-surface-variant overflow-x-auto whitespace-nowrap">
          <button onClick={() => navigate('home')} className="hover:text-primary transition-colors">
            Home
          </button>
          <span className="text-outline-variant">/</span>
          <button onClick={() => navigate('shop')} className="hover:text-primary transition-colors">
            {product.category}
          </button>
          <span className="text-outline-variant">/</span>
          <span className="text-primary font-bold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* 2. MAIN PRODUCT STAGE (2-COLUMN HIGH JEWELRY LAYOUT) */}
      <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: MULTI-VIEW HIGH FASHION GALLERY (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Main Stage Image */}
            <div className="relative w-full aspect-[4/5] bg-surface-container-low rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30 group">
              <img
                src={activeImage}
                alt={product.name}
                onError={(e) => { e.currentTarget.src = '/images/fallback-saree.jpg' }}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Silk Mark Seal Badge */}
              {product.silkMarkCertified && (
                <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md rounded-full px-3.5 py-1.5 shadow-sm flex items-center gap-1.5 border border-secondary/30">
                  <ShieldCheck size={16} className="text-secondary" />
                  <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
                    100% Pure Silk Mark Certified
                  </span>
                </div>
              )}

              {/* Artisan Days Tag */}
              {product.weaveDuration && (
                <div className="absolute bottom-4 left-4 bg-primary/95 text-white backdrop-blur-sm rounded-lg px-3.5 py-1.5 shadow-sm flex items-center gap-1.5 border border-secondary/40">
                  <Sparkles size={14} className="text-secondary-fixed" />
                  <span className="text-[10px] uppercase tracking-wider text-secondary-fixed font-bold">
                    {product.weaveDuration}
                  </span>
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label={wish ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`absolute top-4 right-4 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow-sm ${
                  wish
                    ? 'bg-primary text-white'
                    : 'bg-surface-container-lowest/90 text-primary hover:bg-primary hover:text-white'
                }`}
              >
                <Heart size={16} fill={wish ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Thumbnail Gallery Strip */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`relative aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-low shadow-xs border transition-all ${
                    activeImage === imgUrl
                      ? 'border-2 border-primary ring-2 ring-secondary/40 opacity-100 scale-[1.02]'
                      : 'border-outline-variant/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} angle 0${idx + 1}`}
                    onError={(e) => { e.currentTarget.src = '/images/fallback-saree.jpg' }}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 bg-surface-container-lowest/90 text-primary text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                    View 0{idx + 1}
                  </span>
                </button>
              ))}
            </div>

            {/* Master Weaver Heritage Vignette */}
            <div className="mt-4 p-5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs flex flex-col sm:flex-row items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-surface-container shrink-0 border border-secondary/40 shadow-xs">
                <img
                  src="/images/branding/master-weaver.jpg"
                  alt="Master Handloom Weaver"
                  onError={(e) => { e.currentTarget.src = '/assets/emblem.png' }}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-secondary mb-0.5">
                  <ShieldCheck size={14} />
                  <span className="text-[10px] uppercase tracking-widest font-bold">
                    Handcrafted in {product.origin || 'Varanasi, India'}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Woven on ancestral handlooms by {product.weaver || 'Master Guild Artisans'}, using high-twist pure mulberry silk warp and genuine tested zari yarn.
                </p>
              </div>
              <button
                onClick={() => navigate('about')}
                className="text-primary text-xs uppercase tracking-wider font-bold underline underline-offset-4 hover:text-secondary shrink-0"
              >
                Read Heritage Story
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: PURCHASING SUITE & SPECIFICATIONS (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Header Info */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-secondary">
                <span>{product.category}</span>
                <span className="text-on-surface-variant font-medium">SKU: {product.sku}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-primary font-bold leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mt-1">
                <span className="font-serif text-3xl font-bold text-primary">
                  {formatMoney(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-on-surface-variant line-through">
                    {formatMoney(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-secondary font-semibold uppercase tracking-wider">
                  (Includes all taxes &amp; insured delivery)
                </span>
              </div>
            </div>

            {/* Short Editorial Description */}
            <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs">
              <p className="text-xs sm:text-sm text-on-surface leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Blouse Customization Option Selector */}
            <div className="flex flex-col gap-2 p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Blouse Customization
                </span>
                <span className="text-[10px] text-secondary uppercase font-semibold">
                  Included with saree
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                <label
                  onClick={() => setSelectedBlouse('Unstitched Brocade Piece')}
                  className={`flex items-start gap-2.5 p-3 rounded-lg cursor-pointer transition-all ${
                    selectedBlouse === 'Unstitched Brocade Piece'
                      ? 'bg-surface-container-lowest border-2 border-secondary shadow-xs'
                      : 'bg-surface-container-lowest/60 border border-outline-variant/40 hover:bg-surface-container-lowest'
                  }`}
                >
                  <input
                    type="radio"
                    name="blouse"
                    checked={selectedBlouse === 'Unstitched Brocade Piece'}
                    onChange={() => setSelectedBlouse('Unstitched Brocade Piece')}
                    className="mt-1 accent-primary"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-primary">Unstitched Piece</span>
                    <span className="text-[10px] text-on-surface-variant">0.8m running pure silk piece</span>
                    <span className="text-[10px] text-secondary font-bold mt-0.5">Complimentary</span>
                  </div>
                </label>

                <label
                  onClick={() => setSelectedBlouse('Made-to-Measure')}
                  className={`flex items-start gap-2.5 p-3 rounded-lg cursor-pointer transition-all ${
                    selectedBlouse === 'Made-to-Measure'
                      ? 'bg-surface-container-lowest border-2 border-secondary shadow-xs'
                      : 'bg-surface-container-lowest/60 border border-outline-variant/40 hover:bg-surface-container-lowest'
                  }`}
                >
                  <input
                    type="radio"
                    name="blouse"
                    checked={selectedBlouse === 'Made-to-Measure'}
                    onChange={() => setSelectedBlouse('Made-to-Measure')}
                    className="mt-1 accent-primary"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-primary">Made-to-Measure</span>
                    <span className="text-[10px] text-on-surface-variant">Custom bespoke tailoring</span>
                    <span className="text-[10px] text-secondary font-bold mt-0.5">Concierge Call</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Quantity Selector & Stock State */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Quantity:</span>
                <div className="flex items-center border border-outline-variant/50 rounded-lg bg-surface-container-lowest">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-container"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-primary">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock || 5, quantity + 1))}
                    className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-container"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              <span className="text-xs font-semibold text-secondary">
                {product.stock <= 3 ? `⚡ Only ${product.stock} pieces remaining` : '✓ In Boutique Stock'}
              </span>
            </div>

            {/* Action Buttons: Add to Bag & Buy Now */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="lak-button-outline flex-1 py-3.5 justify-center"
              >
                <ShoppingBag size={16} /> Add to Shopping Bag
              </button>
              <button
                onClick={handleBuyNow}
                className="lak-button flex-1 py-3.5 justify-center"
              >
                Buy Now (Demo Checkout) <ArrowRight size={16} />
              </button>
            </div>

            {/* Direct WhatsApp Consultation Button */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `Namaste LAK Sarees! I am interested in inquiring about ${product.name} (SKU: ${product.sku}). Could you please share video clips of the drape?`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#25D366]/15 text-[#128C7E] hover:bg-[#25D366]/25 font-bold text-xs uppercase tracking-wider transition-colors border border-[#25D366]/40"
            >
              <MessageCircle size={16} /> Inquire about this drape on WhatsApp
            </a>

            {/* Weave Specifications Details Card */}
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 space-y-3">
              <h3 className="font-serif text-base font-bold text-primary border-b border-outline-variant/30 pb-2">
                Haute Handloom Specifications
              </h3>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
                <div>
                  <span className="text-on-surface-variant block text-[10px] uppercase tracking-wider">Fabric</span>
                  <span className="font-semibold text-primary">{product.fabric}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[10px] uppercase tracking-wider">Zari Purity</span>
                  <span className="font-semibold text-primary">{product.zari || 'Tested Pure Zari'}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[10px] uppercase tracking-wider">Weave Origin</span>
                  <span className="font-semibold text-primary">{product.origin || 'Varanasi, UP'}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[10px] uppercase tracking-wider">Craft Technique</span>
                  <span className="font-semibold text-primary">{product.weaveDuration || 'Ancestral Pit Loom'}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-outline-variant/20">
                  <span className="text-on-surface-variant block text-[10px] uppercase tracking-wider">Care &amp; Storage</span>
                  <span className="text-[11px] text-on-surface leading-relaxed">
                    Dry clean only by luxury silk specialists. Store wrapped in the provided breathable cotton muslin cloth. Refold every 6 months to preserve zari filaments.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RELATED HEIRLOOM CURATIONS */}
      {relatedProducts.length > 0 && (
        <section className="w-full py-16 bg-surface-container-low/40 border-t border-outline-variant/30">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-secondary font-bold">
                  Curated Pairings
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-primary font-semibold mt-1">
                  You May Also Admire
                </h2>
              </div>
              <button
                onClick={() => navigate('shop')}
                className="text-xs font-bold uppercase tracking-wider text-primary hover:text-secondary flex items-center gap-1"
              >
                View Catalog <ArrowRight size={13} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
