// LAK SAREES — Checkout & Simulated Demo Payment Suite
// Conforming to Stitch Shopping Bag & Checkout Page with secure validation and clear DEMO labels

import React, { useState } from 'react'
import { useStore } from '../context/StoreContext'
import { storeService } from '../services/storeService'
import {
  ShieldCheck, Lock, ArrowLeft, ArrowRight, CheckCircle,
  Truck, AlertCircle, ShoppingBag, CreditCard
} from 'lucide-react'

export const CheckoutPage = ({ navigate, onOrderPlaced }) => {
  const { cart, cartCount, cartSubtotal, clearCart, formatMoney, currentUser } = useStore()

  // Form State
  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Radhika Singhania',
    email: currentUser?.email || 'radhika.singhania@heritage.in',
    phone: currentUser?.phone || '9823044192',
    address: 'Plot 42, Jubilee Hills Road No. 10',
    city: 'Hyderabad',
    state: 'Telangana',
    pinCode: '500033'
  })

  const [paymentMode, setPaymentMode] = useState('DEMO_SIMULATED_UPI')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null })
    }
  }

  const validateForm = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Please provide full recipient name'
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please provide a valid email for order tracking'
    }
    const cleanPhone = formData.phone.replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      errs.phone = 'Please provide a valid 10-digit Indian mobile number'
    }
    if (!formData.address.trim()) errs.address = 'Street and building address required'
    if (!formData.city.trim()) errs.city = 'City required'
    if (!formData.state.trim()) errs.state = 'State required'
    const cleanPin = formData.pinCode.replace(/\D/g, '')
    if (cleanPin.length !== 6) {
      errs.pinCode = 'Valid 6-digit Indian postal PIN code required'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    if (cart.length === 0) return

    setIsSubmitting(true)

    setTimeout(() => {
      try {
        const newOrder = storeService.createOrder({
          customer: formData,
          cartItems: cart,
          paymentMode
        })
        clearCart()
        setIsSubmitting(false)
        onOrderPlaced(newOrder)
      } catch (err) {
        setIsSubmitting(false)
        alert(err.message || 'Unable to create order. Please check availability.')
      }
    }, 700)
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-[1360px] mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-secondary mx-auto mb-4">
          <ShoppingBag size={28} />
        </div>
        <h2 className="font-serif text-3xl font-bold text-primary">Your Shopping Bag is Empty</h2>
        <p className="text-sm text-on-surface-variant mt-2 max-w-sm mx-auto leading-relaxed">
          Please add a handloom saree to your selection before proceeding to checkout.
        </p>
        <button
          onClick={() => navigate('shop')}
          className="lak-button mt-6"
        >
          Explore Sarees
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* 1. PROGRESS STEPPER HEADER */}
      <section className="w-full bg-surface-container-low py-4 border-b border-outline-variant/30">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('shop')}
              className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors font-semibold"
            >
              <ArrowLeft size={14} /> <span>Return to Boutique</span>
            </button>

            {/* Stepper */}
            <div className="flex items-center gap-2 sm:gap-4 text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-1.5 text-secondary">
                <CheckCircle size={16} />
                <span className="hidden sm:inline">1. Bag Review</span>
              </div>
              <div className="w-6 sm:w-10 h-[1.5px] bg-secondary"></div>
              <div className="flex items-center gap-1.5 text-primary">
                <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                  2
                </span>
                <span>Delivery &amp; Details</span>
              </div>
              <div className="w-6 sm:w-10 h-[1.5px] bg-outline-variant"></div>
              <div className="flex items-center gap-1.5 text-on-surface-variant opacity-60">
                <span className="w-5 h-5 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center text-[10px]">
                  3
                </span>
                <span className="hidden sm:inline">Demo Payment</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1.5 text-xs text-secondary font-bold uppercase tracking-wider">
              <Lock size={13} />
              <span>Simulated Demo Flow</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CHECKOUT WORKSPACE */}
      <section className="w-full py-10 lg:py-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: CUSTOMER DETAILS & DEMO PAYMENT (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Contact Panel */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-surface-container text-primary flex items-center justify-center text-xs font-bold font-serif">
                      1
                    </span>
                    <div>
                      <h2 className="font-serif text-lg font-bold text-primary">Patron Contact Details</h2>
                      <p className="text-xs text-on-surface-variant">Order confirmation &amp; tracking updates sent here.</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-secondary bg-secondary-fixed/40 px-2 py-1 rounded">
                    Encrypted
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      Recipient Full Name *
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Radhika Singhania"
                      className={`w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary ${
                        errors.name ? 'border border-red-500' : ''
                      }`}
                    />
                    {errors.name && <p className="text-[10px] text-red-600 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      Email Address *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="radhika@example.com"
                      className={`w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary ${
                        errors.email ? 'border border-red-500' : ''
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      Phone Number (+91) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant font-medium">
                        +91
                      </span>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="98765 43210"
                        className={`w-full pl-11 pr-4 py-2.5 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary ${
                          errors.phone ? 'border border-red-500' : ''
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-[10px] text-red-600 mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Destination Panel */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-surface-container text-primary flex items-center justify-center text-xs font-bold font-serif">
                      2
                    </span>
                    <div>
                      <h2 className="font-serif text-lg font-bold text-primary">Shipping Destination</h2>
                      <p className="text-xs text-on-surface-variant">White-glove insured delivery direct from our atelier.</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-secondary">
                    <Truck size={13} /> Pan-India Express
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      Street Address &amp; House/Villa # *
                    </label>
                    <textarea
                      name="address"
                      rows={2}
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. Plot 42, Jubilee Hills Road No. 10"
                      className={`w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary resize-none ${
                        errors.address ? 'border border-red-500' : ''
                      }`}
                    />
                    {errors.address && <p className="text-[10px] text-red-600 mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      City *
                    </label>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Hyderabad"
                      className={`w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary ${
                        errors.city ? 'border border-red-500' : ''
                      }`}
                    />
                    {errors.city && <p className="text-[10px] text-red-600 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      State *
                    </label>
                    <input
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="e.g. Telangana"
                      className={`w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary ${
                        errors.state ? 'border border-red-500' : ''
                      }`}
                    />
                    {errors.state && <p className="text-[10px] text-red-600 mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      Postal PIN Code (6 digits) *
                    </label>
                    <input
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      placeholder="500033"
                      maxLength={6}
                      className={`w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary ${
                        errors.pinCode ? 'border border-red-500' : ''
                      }`}
                    />
                    {errors.pinCode && <p className="text-[10px] text-red-600 mt-1">{errors.pinCode}</p>}
                  </div>
                </div>
              </div>

              {/* Strict DEMO Payment Selector */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-secondary/40 shadow-xs space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-outline-variant/20">
                  <span className="w-7 h-7 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold font-serif">
                    3
                  </span>
                  <div>
                    <h2 className="font-serif text-lg font-bold text-primary">
                      Simulated Payment Mode (DEMO)
                    </h2>
                    <p className="text-xs text-on-surface-variant">
                      Testing mode active: no real money or card numbers are collected.
                    </p>
                  </div>
                </div>

                {/* Explicit Safety Notice */}
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed flex items-start gap-3">
                  <AlertCircle size={18} className="text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block uppercase tracking-wider">
                      Demo Store Mode Notice
                    </span>
                    This is a demonstrative evaluation checkout. Do not enter actual credit card numbers, CVVs, or UPI PINs. Real payment processing connects to Razorpay / Stripe backend upon production deployment.
                  </div>
                </div>

                {/* Payment Options */}
                <div className="space-y-2.5 pt-2">
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMode === 'DEMO_SIMULATED_UPI'
                        ? 'border-secondary bg-surface-container-low font-bold shadow-xs'
                        : 'border-outline-variant/40 hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMode"
                        checked={paymentMode === 'DEMO_SIMULATED_UPI'}
                        onChange={() => setPaymentMode('DEMO_SIMULATED_UPI')}
                        className="accent-primary"
                      />
                      <div>
                        <span className="text-xs font-bold text-primary block">
                          Simulated Instant UPI (Demo)
                        </span>
                        <span className="text-[10px] text-on-surface-variant">
                          Simulates immediate verified order confirmation
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded">
                      Instant Approval
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMode === 'DEMO_NET_BANKING'
                        ? 'border-secondary bg-surface-container-low font-bold shadow-xs'
                        : 'border-outline-variant/40 hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMode"
                        checked={paymentMode === 'DEMO_NET_BANKING'}
                        onChange={() => setPaymentMode('DEMO_NET_BANKING')}
                        className="accent-primary"
                      />
                      <div>
                        <span className="text-xs font-bold text-primary block">
                          Simulated Net Banking (Demo)
                        </span>
                        <span className="text-[10px] text-on-surface-variant">
                          Simulates HDFC / ICICI / SBI direct gateway
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                      Demo Gateway
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMode === 'DEMO_COD'
                        ? 'border-secondary bg-surface-container-low font-bold shadow-xs'
                        : 'border-outline-variant/40 hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMode"
                        checked={paymentMode === 'DEMO_COD'}
                        onChange={() => setPaymentMode('DEMO_COD')}
                        className="accent-primary"
                      />
                      <div>
                        <span className="text-xs font-bold text-primary block">
                          Cash on Delivery / Card on Delivery (Demo)
                        </span>
                        <span className="text-[10px] text-on-surface-variant">
                          Payment collected upon white-glove delivery
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                      Pay on Delivery
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: ORDER SUMMARY SUITE (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28">
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                  <h3 className="font-serif text-lg font-bold text-primary">
                    Boutique Order Summary
                  </h3>
                  <span className="text-xs font-semibold text-secondary">
                    {cartCount} {cartCount === 1 ? 'Drape' : 'Drapes'}
                  </span>
                </div>

                {/* Items Mini-List */}
                <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
                  {cart.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={(e) => { e.currentTarget.src = '/images/fallback-saree.jpg' }}
                        className="w-14 h-18 object-cover rounded-md bg-surface-container-low border border-outline-variant/30 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-primary truncate leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-on-surface-variant mt-0.5">
                          Qty: {item.qty} · {item.blouse}
                        </p>
                        <p className="text-xs font-bold text-primary mt-1">
                          {formatMoney(item.price * item.qty)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculations */}
                <div className="pt-4 border-t border-outline-variant/30 space-y-2 text-xs">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Subtotal</span>
                    <span className="font-semibold text-primary">{formatMoney(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Insured Pan-India Express Delivery</span>
                    <span className="text-secondary font-bold uppercase">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Applicable GST &amp; Taxes</span>
                    <span className="font-medium">Included in Price</span>
                  </div>

                  <div className="pt-3 border-t border-outline-variant/30 flex justify-between items-baseline">
                    <span className="font-serif text-base font-bold text-primary">Total Amount</span>
                    <span className="font-serif text-2xl font-bold text-primary">
                      {formatMoney(cartSubtotal)}
                    </span>
                  </div>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="lak-button w-full justify-center py-4"
                >
                  {isSubmitting ? (
                    'Creating Verified Demo Order...'
                  ) : (
                    <>Complete Demo Order <ArrowRight size={16} /></>
                  )}
                </button>

                <p className="text-[10px] text-center text-on-surface-variant leading-relaxed">
                  ✦ By placing this order, you simulate the checkout ceremony. No real funds are moved.
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
