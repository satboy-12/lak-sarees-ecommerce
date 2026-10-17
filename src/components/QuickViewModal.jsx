// LAK SAREES — Quick Look Modal Component
// Allows fast inspection of blouse options, silk mark, and direct purchase

import React, { useState } from 'react'
import { useStore } from '../context/StoreContext'
import { X, ShieldCheck, Plus, Minus, ShoppingBag, ArrowRight, Check } from 'lucide-react'

export const QuickViewModal = ({ onSelectFull }) => {
  const { quickViewProduct, setQuickViewProduct, addToCart, formatMoney } = useStore()
  const [selectedBlouse, setSelectedBlouse] = useState('Unstitched Brocade Piece')
  const [quantity, setQuantity] = useState(1)

  if (!quickViewProduct) return null

  const handleAdd = () => {
    addToCart(quickViewProduct, quantity, selectedBlouse)
    setQuickViewProduct(null)
  }

  const handleFullDetail = () => {
    const prod = quickViewProduct
    setQuickViewProduct(null)
    onSelectFull(prod)
  }

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-black/60 p-4 sm:p-6 backdrop-blur-xs">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-8 w-full max-w-4xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors shadow-sm"
          aria-label="Close product preview"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Product Image Stage */}
          <div className="relative aspect-[4/5] md:aspect-auto h-full min-h-[380px] bg-surface-container-low overflow-hidden">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              onError={(e) => { e.currentTarget.src = '/images/fallback-saree.jpg' }}
              className="w-full h-full object-cover object-top"
            />
            {quickViewProduct.silkMarkCertified && (
              <div className="absolute top-4 left-4 bg-surface-container-lowest/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm text-secondary text-xs font-bold uppercase tracking-wider">
                <ShieldCheck size={16} />
                <span>100% Pure Silk Mark</span>
              </div>
            )}
          </div>

          {/* Right Product Suite */}
          <div className="p-6 sm:p-8 flex flex-col justify-between gap-5">
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-secondary">
                <span>{quickViewProduct.category}</span>
                <span>{quickViewProduct.sku}</span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-primary mt-1 leading-tight">
                {quickViewProduct.name}
              </h2>

              <div className="flex items-baseline gap-2 mt-3">
                <span className="font-serif text-2xl font-bold text-primary">
                  {formatMoney(quickViewProduct.price)}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-on-surface-variant line-through">
                    {formatMoney(quickViewProduct.originalPrice)}
                  </span>
                )}
              </div>

              <p className="font-sans text-xs text-on-surface-variant leading-relaxed mt-4">
                {quickViewProduct.description}
              </p>

              {/* Blouse Option Selector */}
              <div className="mt-5 pt-4 border-t border-outline-variant/30">
                <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  Blouse Customization
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setSelectedBlouse('Unstitched Brocade Piece')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      selectedBlouse === 'Unstitched Brocade Piece'
                        ? 'border-secondary bg-surface-container text-primary font-bold shadow-xs'
                        : 'border-outline-variant/50 text-on-surface-variant hover:bg-surface-container-low'
                    }`}
                  >
                    <p className="font-semibold">Unstitched Piece</p>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">0.8m brocade included</p>
                  </button>

                  <button
                    onClick={() => setSelectedBlouse('Made-to-Measure')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      selectedBlouse === 'Made-to-Measure'
                        ? 'border-secondary bg-surface-container text-primary font-bold shadow-xs'
                        : 'border-outline-variant/50 text-on-surface-variant hover:bg-surface-container-low'
                    }`}
                  >
                    <p className="font-semibold">Made-to-Measure</p>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">Pure silk lining stitch</p>
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Quantity:</span>
                <div className="flex items-center border border-outline-variant/50 rounded bg-surface-container-low">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-container"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-8 text-center text-xs font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(quickViewProduct.stock || 5, quantity + 1))}
                    className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-container"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-4 border-t border-outline-variant/30">
              <button
                onClick={handleAdd}
                className="lak-button w-full justify-center py-3.5"
              >
                <ShoppingBag size={16} /> Add to Shopping Bag
              </button>

              <button
                onClick={handleFullDetail}
                className="w-full text-center text-xs text-primary font-bold uppercase tracking-widest py-2 hover:underline flex items-center justify-center gap-1.5"
              >
                Explore Full Artisanal Weave Dossier <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
