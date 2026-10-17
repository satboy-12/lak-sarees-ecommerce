// LAK SAREES — Order Confirmation & Heirloom Certificate View
// Clearly distinguishes simulated demo orders from production orders

import React from 'react'
import { useStore } from '../context/StoreContext'
import {
  CheckCircle, ShieldCheck, Package, Printer,
  ArrowRight, Sparkles, AlertCircle, LayoutDashboard
} from 'lucide-react'

export const OrderConfirmationPage = ({ order, navigate }) => {
  const { formatMoney } = useStore()

  if (!order) {
    return (
      <div className="max-w-[1360px] mx-auto px-6 py-24 text-center">
        <h2 className="font-serif text-2xl font-bold text-primary">No Active Order Selected</h2>
        <button onClick={() => navigate('shop')} className="lak-button mt-4">
          Return to Boutique
        </button>
      </div>
    )
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="flex flex-col w-full bg-surface py-12 lg:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full">
        
        {/* Success Header Card */}
        <div className="bg-surface-container-lowest p-8 sm:p-10 rounded-2xl border border-secondary/40 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-green-50 text-green-700 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle size={36} />
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-secondary">
              Atelier Order Confirmed
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary mt-1">
              Thank You, {order.customer.name}!
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-2 max-w-md mx-auto leading-relaxed">
              Your handloom order has been received at our Varanasi atelier. We are preparing your heirloom drape in signature packaging.
            </p>
          </div>

          {/* Prominent Demo Mode Banner */}
          <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 text-left flex items-start gap-3">
            <AlertCircle size={20} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold uppercase tracking-wider">
                Demonstration Order Receipt
              </p>
              <p className="mt-0.5 leading-relaxed">
                This order was generated in <strong>DEMO MODE</strong>. No payment card was charged and no real monetary transaction occurred. In a live deployment, this order record is synchronized with Cloud Firestore and payment verified through Razorpay/Stripe webhooks.
              </p>
            </div>
          </div>

          {/* Reference Bar */}
          <div className="p-4 bg-surface-container-low rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-on-surface-variant block text-[10px] uppercase tracking-wider">
                Order Reference Code
              </span>
              <span className="font-serif text-lg font-bold text-primary tracking-wider">
                {order.orderRef}
              </span>
            </div>
            <div className="text-right">
              <span className="text-on-surface-variant block text-[10px] uppercase tracking-wider">
                Payment Mode &amp; Status
              </span>
              <span className="font-semibold text-secondary">
                {order.paymentMode} · {order.paymentStatus}
              </span>
            </div>
          </div>

          {/* Items Summary Table */}
          <div className="pt-4 text-left border-t border-outline-variant/30 space-y-4">
            <h3 className="font-serif text-base font-bold text-primary">Ordered Sarees</h3>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-3 bg-surface-container-low/40 rounded-xl border border-outline-variant/20">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => { e.currentTarget.src = '/images/fallback-saree.jpg' }}
                    className="w-16 h-20 object-cover rounded-lg bg-surface-container shrink-0 border"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-bold text-primary truncate leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-on-surface-variant mt-1">
                      Blouse: {item.blouse} · Qty: {item.qty}
                    </p>
                    <p className="font-serif text-sm font-bold text-primary mt-1">
                      {formatMoney(item.price * item.qty)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-4 border-t border-outline-variant/30 space-y-1.5 text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span className="font-semibold text-primary">{formatMoney(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Insured Pan-India Express Delivery</span>
                <span className="text-secondary font-bold uppercase">Complimentary</span>
              </div>
              <div className="pt-2 border-t border-outline-variant/30 flex justify-between items-baseline text-sm">
                <span className="font-serif font-bold text-primary">Final Order Total</span>
                <span className="font-serif text-xl font-bold text-primary">
                  {formatMoney(order.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="pt-4 text-left border-t border-outline-variant/30 text-xs text-on-surface-variant space-y-1">
            <h3 className="font-serif text-base font-bold text-primary mb-2">Delivery Address</h3>
            <p className="font-semibold text-primary">{order.customer.name}</p>
            <p>{order.customer.address}</p>
            <p>{order.customer.city}, {order.customer.state} – {order.customer.pinCode}</p>
            <p>Phone: +91 {order.customer.phone} · Email: {order.customer.email}</p>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-outline-variant/30 flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => navigate('shop')}
              className="lak-button py-3 px-6"
            >
              Continue Exploring Boutique <ArrowRight size={14} />
            </button>

            <button
              onClick={handlePrint}
              className="lak-button-outline py-3 px-5"
            >
              <Printer size={15} /> Print Receipt
            </button>

            <button
              onClick={() => navigate('admin')}
              className="py-3 px-5 rounded-lg border border-secondary text-primary font-bold text-xs uppercase tracking-wider hover:bg-surface-container transition-colors flex items-center gap-1.5"
            >
              <LayoutDashboard size={14} className="text-secondary" />
              Inspect in Admin Console
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
