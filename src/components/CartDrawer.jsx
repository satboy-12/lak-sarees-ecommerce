// LAK SAREES — Shopping Bag Slide-out Drawer
// Conforming to Stitch Royal Heritage Couture Design System

import React from 'react'
import { useStore } from '../context/StoreContext'
import { ShoppingBag, X, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, Trash2 } from 'lucide-react'

export const CartDrawer = ({ navigate }) => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartDrawerOpen,
    setCartDrawerOpen,
    updateCartQty,
    removeFromCart,
    formatMoney
  } = useStore()

  if (!cartDrawerOpen) return null

  const handleCheckoutClick = () => {
    setCartDrawerOpen(false)
    navigate('checkout')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBrowseClick = () => {
    setCartDrawerOpen(false)
    navigate('shop')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setCartDrawerOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        aria-label="Close bag overlay"
      />

      {/* Drawer */}
      <aside className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-surface-container-lowest shadow-2xl flex flex-col justify-between border-l border-outline-variant/30 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/40">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold">
              Artisanal Selection
            </span>
            <h2 className="font-serif text-2xl font-semibold text-primary mt-0.5">
              Shopping Bag ({cartCount})
            </h2>
          </div>

          <button
            onClick={() => setCartDrawerOpen(false)}
            className="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Close shopping bag"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body / Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-secondary mb-4">
                <ShoppingBag size={28} />
              </div>
              <h3 className="font-serif text-2xl text-primary font-semibold">Your bag is waiting</h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface-variant mt-2 max-w-xs leading-relaxed">
                Add an heirloom saree that speaks to your celebratory moments and rituals.
              </p>
              <button
                onClick={handleBrowseClick}
                className="lak-button mt-6"
              >
                Explore Saree Collection <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={`${item.id}-${item.blouse}-${index}`}
                className="flex gap-4 pb-5 border-b border-outline-variant/25 last:border-b-0"
              >
                {/* Thumbnail */}
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => { e.currentTarget.src = '/images/fallback-saree.jpg' }}
                  className="w-20 h-24 sm:w-22 sm:h-28 object-cover rounded-lg border border-outline-variant/30 shrink-0 bg-surface-container-low"
                />

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-secondary font-bold">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-primary leading-tight mt-0.5 line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-on-surface-variant mt-1">
                      Blouse: <span className="font-medium text-primary">{item.blouse}</span>
                    </p>
                    <p className="font-serif text-sm font-bold text-primary mt-1">
                      {formatMoney(item.price)}
                    </p>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-outline-variant/50 rounded bg-surface-container-low">
                      <button
                        onClick={() => updateCartQty(item.id, -1, item.blouse)}
                        className="w-7 h-7 flex items-center justify-center text-primary hover:bg-surface-container"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-on-surface">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateCartQty(item.id, 1, item.blouse)}
                        className="w-7 h-7 flex items-center justify-center text-primary hover:bg-surface-container"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id, item.blouse)}
                      className="text-xs text-on-surface-variant hover:text-error flex items-center gap-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={13} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Calculations */}
        {cart.length > 0 && (
          <div className="p-6 bg-surface-container-low/60 border-t border-outline-variant/30 space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal ({cartCount} drapes)</span>
                <span className="font-semibold text-primary">{formatMoney(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-secondary" /> Insured Pan-India Express Delivery
                </span>
                <span className="text-secondary font-bold uppercase tracking-wider">Complimentary</span>
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant/30 flex justify-between items-baseline">
              <span className="font-serif text-base font-semibold text-primary">Estimated Total</span>
              <span className="font-serif text-2xl font-bold text-primary">
                {formatMoney(cartSubtotal)}
              </span>
            </div>

            <button
              onClick={handleCheckoutClick}
              className="lak-button w-full justify-center py-3.5"
            >
              Proceed to Boutique Checkout <ArrowRight size={16} />
            </button>

            <p className="text-[10px] text-center text-on-surface-variant uppercase tracking-wider">
              ✦ DEMO CHECKOUT · No real payment collected · White-glove Packaging Included
            </p>
          </div>
        )}
      </aside>
    </div>
  )
}
