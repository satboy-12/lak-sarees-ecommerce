// LAK SAREES — Global Store Context
// Manages shopping bag, wishlist, multi-currency conversion, user authentication & UI state

import React, { createContext, useContext, useState, useEffect } from 'react'
import { storeService } from '../services/storeService'

const StoreContext = createContext()

export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}

const CURRENCY_RATES = {
  INR: { rate: 1, symbol: '₹', code: 'INR' },
  USD: { rate: 0.012, symbol: '$', code: 'USD' },
  GBP: { rate: 0.0094, symbol: '£', code: 'GBP' },
  AED: { rate: 0.044, symbol: 'AED ', code: 'AED' }
}

export const StoreProvider = ({ children }) => {
  // Products & Inventory
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [settings, setSettings] = useState(storeService.getSettings())

  // Shopping Bag
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('lak_sarees_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('lak_sarees_wishlist')
      return saved ? JSON.parse(saved) : ['lak-ban-01', 'lak-kan-02', 'lak-cha-05']
    } catch {
      return ['lak-ban-01', 'lak-kan-02', 'lak-cha-05']
    }
  })

  // Active User / Auth
  const [currentUser, setCurrentUser] = useState(() => storeService.getCurrentUser())

  // Currency
  const [currency, setCurrency] = useState('INR')

  // Modals & UI Drawers
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  // Initialize data
  useEffect(() => {
    const loadedProducts = storeService.getProducts()
    setProducts(loadedProducts)
    const loadedOrders = storeService.getOrders()
    setOrders(loadedOrders)
  }, [])

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lak_sarees_cart', JSON.stringify(cart))
    } catch (e) {
      console.warn('Cart persist error:', e)
    }
  }, [cart])

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lak_sarees_wishlist', JSON.stringify(wishlist))
    } catch (e) {
      console.warn('Wishlist persist error:', e)
    }
  }, [wishlist])

  // Currency Converter & Formatter
  const formatMoney = (amountInINR) => {
    const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.INR
    const converted = amountInINR * rateInfo.rate

    if (currency === 'INR') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(converted)
    }

    return `${rateInfo.symbol}${Math.round(converted).toLocaleString()}`
  }

  // Toast Notification Trigger
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type })
    setTimeout(() => {
      setToastMessage(null)
    }, 3200)
  }

  // Shopping Bag Actions
  const addToCart = (product, quantity = 1, blouseOption = 'Unstitched Brocade Piece') => {
    // Check available stock
    const available = product.stock || 10
    const existing = cart.find(item => item.id === product.id && item.blouse === blouseOption)

    if (existing && existing.qty + quantity > available) {
      showToast(`Only ${available} drapes available in boutique vault`, 'error')
      return false
    }

    setCart(prev => {
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.blouse === blouseOption
            ? { ...item, qty: item.qty + quantity }
            : item
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          sku: product.sku,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          blouse: blouseOption,
          stock: available,
          qty: quantity
        }
      ]
    })

    showToast(`“${product.name}” added to your shopping bag`)
    return true
  }

  const updateCartQty = (id, delta, blouse) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === id && (!blouse || item.blouse === blouse)) {
            const newQty = item.qty + delta
            if (newQty > item.stock) {
              showToast(`Only ${item.stock} pieces available`, 'error')
              return item
            }
            return { ...item, qty: newQty }
          }
          return item
        })
        .filter(item => item.qty > 0)
    )
  }

  const removeFromCart = (id, blouse) => {
    setCart(prev => prev.filter(item => !(item.id === id && (!blouse || item.blouse === blouse))))
    showToast('Item removed from shopping bag')
  }

  const clearCart = () => {
    setCart([])
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const cartShipping = 0 // Complimentary express shipping
  const cartTotal = cartSubtotal + cartShipping

  // Wishlist Actions
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId)
      if (exists) {
        showToast('Removed from your private wishlist')
        return prev.filter(id => id !== productId)
      } else {
        showToast('Saved to your private wishlist')
        return [...prev, productId]
      }
    })
  }

  const isWishlisted = (productId) => wishlist.includes(productId)

  // Authentication Actions
  const login = (email, password, asAdmin = false) => {
    // If asAdmin requested or email matches staff account:
    const isAdmin = asAdmin || email.toLowerCase().includes('admin') || email.toLowerCase() === 'concierge@laksarees.com'
    const user = {
      id: `usr-${Date.now().toString(36)}`,
      name: isAdmin ? 'Master Draper & Curator' : email.split('@')[0],
      email: email.trim(),
      role: isAdmin ? 'admin' : 'customer',
      avatar: isAdmin ? 'AP' : email.slice(0, 2).toUpperCase()
    }
    storeService.setCurrentUser(user)
    setCurrentUser(user)
    setAuthModalOpen(false)
    showToast(`Signed in successfully as ${isAdmin ? 'Authorized Staff (Admin)' : 'Patron'}`)
    return user
  }

  const logout = () => {
    storeService.setCurrentUser(null)
    setCurrentUser(null)
    showToast('Signed out of LAK Sarees account')
  }

  const register = (userData) => {
    const user = {
      id: `usr-${Date.now().toString(36)}`,
      name: userData.name.trim(),
      email: userData.email.trim(),
      phone: userData.phone || '',
      role: 'customer',
      avatar: userData.name.slice(0, 2).toUpperCase()
    }
    storeService.setCurrentUser(user)
    setCurrentUser(user)
    setAuthModalOpen(false)
    showToast(`Welcome to LAK Sarees, ${user.name}!`)
    return user
  }

  const reloadData = () => {
    setProducts(storeService.getProducts())
    setOrders(storeService.getOrders())
  }

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        settings,
        cart,
        cartCount,
        cartSubtotal,
        cartShipping,
        cartTotal,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        isWishlisted,
        currency,
        setCurrency,
        formatMoney,
        currentUser,
        isAdmin: currentUser?.role === 'admin',
        login,
        logout,
        register,
        cartDrawerOpen,
        setCartDrawerOpen,
        quickViewProduct,
        setQuickViewProduct,
        authModalOpen,
        setAuthModalOpen,
        toastMessage,
        showToast,
        reloadData
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
