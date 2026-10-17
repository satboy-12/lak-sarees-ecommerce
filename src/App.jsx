// LAK SAREES — Master Application Controller
// Unified Routing, Global State Provider & Haute Couture Presentation

import React, { useState, useEffect } from 'react'
import { StoreProvider, useStore } from './context/StoreContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { CartDrawer } from './components/CartDrawer'
import { QuickViewModal } from './components/QuickViewModal'
import { AuthModal } from './components/AuthModal'

import { HomePage } from './pages/HomePage'
import { ShopPage } from './pages/ShopPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrderConfirmationPage } from './pages/OrderConfirmationPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { AdminDashboard } from './pages/AdminDashboard'
import { Check, AlertCircle } from 'lucide-react'

function MainContent() {
  const {
    products,
    toastMessage,
    reloadData
  } = useStore()

  // Routing State
  const [route, setRoute] = useState(() => {
    const path = window.location.pathname.replace(/\/+$/, '') || '/'
    if (path === '/store' || path === '/shop') return 'shop'
    if (path === '/admin') return 'admin'
    if (path === '/about') return 'about'
    if (path === '/contact') return 'contact'
    if (path === '/checkout') return 'checkout'
    return 'home'
  })

  // Selected Product for Details
  const [selectedProduct, setSelectedProduct] = useState(() => {
    return products[0] || null
  })

  // Filter params passed to Shop
  const [shopFilters, setShopFilters] = useState({})

  // Last placed order for Confirmation Page
  const [lastOrder, setLastOrder] = useState(null)

  // Listen to browser Back / Forward events
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/+$/, '') || '/'
      if (path === '/store' || path === '/shop') setRoute('shop')
      else if (path === '/admin') setRoute('admin')
      else if (path === '/about') setRoute('about')
      else if (path === '/contact') setRoute('contact')
      else if (path === '/checkout') setRoute('checkout')
      else setRoute('home')
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Navigation Helper
  const navigate = (toRoute, params = {}) => {
    if (toRoute === 'silk-sarees') {
      setShopFilters({ category: 'Pure Kanchipuram' })
      setRoute('shop')
      window.history.pushState({}, '', '/store')
    } else if (toRoute === 'bridal-couture') {
      setShopFilters({ occasion: 'Bridal Couture' })
      setRoute('shop')
      window.history.pushState({}, '', '/store')
    } else if (toRoute === 'festive') {
      setShopFilters({ occasion: 'Festive Wear' })
      setRoute('shop')
      window.history.pushState({}, '', '/store')
    } else {
      if (params.category || params.occasion) {
        setShopFilters(params)
      } else {
        setShopFilters({})
      }
      setRoute(toRoute)
      const urlPath = toRoute === 'home' ? '/' : toRoute === 'shop' ? '/store' : `/${toRoute}`
      window.history.pushState({}, '', urlPath)
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // When clicking on a product card
  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    setRoute('product')
    window.history.pushState({}, '', `/product?id=${product.id}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // When an order is placed in Checkout
  const handleOrderPlaced = (order) => {
    setLastOrder(order)
    setRoute('order-confirmation')
    window.history.pushState({}, '', `/order-confirmation?ref=${order.orderRef}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface font-sans text-on-surface antialiased">
      {/* Flagship Header (Hidden only on Admin dashboard for full atelier experience) */}
      {route !== 'admin' && (
        <Header currentRoute={route} navigate={navigate} />
      )}

      {/* Main Page Render */}
      <main className={`flex-1 w-full ${route !== 'admin' ? 'pt-28' : ''}`}>
        {route === 'home' && (
          <HomePage
            navigate={navigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {route === 'shop' && (
          <ShopPage
            navigate={navigate}
            onSelectProduct={handleSelectProduct}
            initialFilters={shopFilters}
          />
        )}

        {route === 'product' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            navigate={navigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {route === 'checkout' && (
          <CheckoutPage
            navigate={navigate}
            onOrderPlaced={handleOrderPlaced}
          />
        )}

        {route === 'order-confirmation' && (
          <OrderConfirmationPage
            order={lastOrder}
            navigate={navigate}
          />
        )}

        {route === 'about' && (
          <AboutPage navigate={navigate} />
        )}

        {route === 'contact' && (
          <ContactPage />
        )}

        {route === 'admin' && (
          <AdminDashboard navigate={navigate} />
        )}
      </main>

      {/* Luxury Editorial Footer (Hidden on Admin dashboard) */}
      {route !== 'admin' && (
        <Footer navigate={navigate} />
      )}

      {/* Global Interactive Drawers & Modals */}
      <CartDrawer navigate={navigate} />
      <QuickViewModal onSelectFull={handleSelectProduct} />
      <AuthModal />

      {/* Toast Notification System */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-white shadow-2xl border border-secondary text-xs sm:text-sm font-semibold animate-in slide-in-from-bottom duration-300">
          {toastMessage.type === 'error' ? (
            <AlertCircle size={16} className="text-red-400" />
          ) : (
            <Check size={16} className="text-secondary-fixed" />
          )}
          <span>{toastMessage.message}</span>
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  )
}