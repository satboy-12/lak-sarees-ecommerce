// LAK SAREES — Trusted Store Service & Data Layer
// Implements safe price verification, inventory management, and demo order generation

import { initialProducts, categoriesList } from '../data/products'

const STORAGE_KEYS = {
  PRODUCTS: 'lak_sarees_products_v2',
  ORDERS: 'lak_sarees_orders_v2',
  USERS: 'lak_sarees_users_v2',
  CURRENT_USER: 'lak_sarees_current_user_v2',
  SETTINGS: 'lak_sarees_settings_v2'
}

const initialOrders = [
  {
    orderRef: 'LAK-ORD-2026-9041',
    customer: {
      name: 'Radhika Singhania',
      email: 'radhika.singhania@heritage.in',
      phone: '98230 44192',
      address: 'Plot 42, Jubilee Hills Road No. 10',
      city: 'Hyderabad',
      state: 'Telangana',
      pinCode: '500033'
    },
    items: [
      {
        id: 'lak-ban-01',
        name: 'Devi Crimson Brocade Pure Banarasi Katan Silk Saree',
        price: 48500,
        qty: 1,
        image: '/assets/hero-bride.png',
        blouse: 'Unstitched Brocade Piece'
      }
    ],
    subtotal: 48500,
    shippingFee: 0,
    total: 48500,
    paymentMode: 'DEMO_SIMULATED_UPI',
    paymentStatus: 'PAID (DEMO)',
    orderStatus: 'Processing',
    isDemo: true,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    orderRef: 'LAK-ORD-2026-9038',
    customer: {
      name: 'Ananya Raghavan',
      email: 'ananya.r@gmail.com',
      phone: '98401 22891',
      address: '14/2 Harrington Road, Chetpet',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pinCode: '600031'
    },
    items: [
      {
        id: 'lak-kan-02',
        name: 'Imperial Vaansingaram Pure Kanchipuram Silk Saree',
        price: 52900,
        qty: 1,
        image: '/assets/folded-silk.png',
        blouse: 'Made-to-Measure Hand Stitch'
      }
    ],
    subtotal: 52900,
    shippingFee: 0,
    total: 52900,
    paymentMode: 'DEMO_NET_BANKING',
    paymentStatus: 'PAID (DEMO)',
    orderStatus: 'Dispatched',
    isDemo: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    orderRef: 'LAK-ORD-2026-9029',
    customer: {
      name: 'Meera Sengupta',
      email: 'meera.sengupta@outlook.com',
      phone: '99031 84729',
      address: '88 Ballygunge Place',
      city: 'Kolkata',
      state: 'West Bengal',
      pinCode: '700019'
    },
    items: [
      {
        id: 'lak-sof-06',
        name: 'Sandhya Soft Silk Twilight Plum Saree',
        price: 18900,
        qty: 1,
        image: 'https://images.unsplash.com/photo-1610189012906-4c4d7f4d8b9f?auto=format&fit=crop&w=1200&q=85',
        blouse: 'Unstitched Brocade Piece'
      }
    ],
    subtotal: 18900,
    shippingFee: 0,
    total: 18900,
    paymentMode: 'DEMO_COD',
    paymentStatus: 'PENDING_ON_DELIVERY (DEMO)',
    orderStatus: 'Delivered',
    isDemo: true,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  }
]

const initialSettings = {
  brandName: 'LAK SAREES',
  tagline: 'Timeless Elegance. Woven in Tradition.',
  conciergePhone: '+91 98765 43210',
  whatsAppNumber: '919876543210',
  atelierEmail: 'concierge@laksarees.com',
  address: 'LAK SAREES Flagship Atelier, 24 Palace Heritage Enclave, Varanasi 221001, India',
  currency: 'INR',
  freeShippingThreshold: 0, // Complimentary across India
  isDemoMode: true
}

export const storeService = {
  // --- PRODUCTS & INVENTORY ---
  getProducts: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS)
      if (stored) return JSON.parse(stored)
    } catch (e) {
      console.warn('LocalStorage read error:', e)
    }
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts))
    return initialProducts
  },

  getProductById: (id) => {
    const products = storeService.getProducts()
    return products.find(p => p.id === id || p.sku === id) || null
  },

  saveProducts: (products) => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products))
    return products
  },

  createProduct: (productData) => {
    const products = storeService.getProducts()
    const newProduct = {
      ...productData,
      id: productData.id || `lak-${Date.now().toString(36)}`,
      sku: productData.sku || `LAK-${productData.category.slice(0,3).toUpperCase()}-${Date.now().toString().slice(-4)}`,
      price: Number(productData.price) || 0,
      stock: Number(productData.stock) || 1,
      image: productData.image || '/assets/folded-silk.png',
      gallery: productData.gallery || [productData.image || '/assets/folded-silk.png'],
      silkMarkCertified: Boolean(productData.silkMarkCertified),
      featured: Boolean(productData.featured),
      createdAt: new Date().toISOString()
    }
    const updated = [newProduct, ...products]
    storeService.saveProducts(updated)
    return newProduct
  },

  updateProduct: (id, updates) => {
    const products = storeService.getProducts()
    const updated = products.map(p => {
      if (p.id === id) {
        return {
          ...p,
          ...updates,
          price: updates.price !== undefined ? Number(updates.price) : p.price,
          stock: updates.stock !== undefined ? Number(updates.stock) : p.stock
        }
      }
      return p
    })
    storeService.saveProducts(updated)
    return updated.find(p => p.id === id)
  },

  deleteProduct: (id) => {
    const products = storeService.getProducts()
    const updated = products.filter(p => p.id !== id)
    storeService.saveProducts(updated)
    return true
  },

  // --- ORDERS & SAFE PRICE COMPUTATION ---
  // Server-side calculation pattern: calculate safe subtotal from database prices, never trust client totals!
  calculateOrderBreakdown: (cartItems) => {
    const allProducts = storeService.getProducts()
    let subtotal = 0
    const verifiedItems = []

    for (const item of cartItems) {
      const realProduct = allProducts.find(p => p.id === item.id)
      if (!realProduct) {
        throw new Error(`Product ${item.name || item.id} is no longer available in the boutique inventory.`)
      }
      if (realProduct.stock < item.qty) {
        throw new Error(`We only have ${realProduct.stock} pieces remaining of ${realProduct.name}.`)
      }
      const itemTotal = realProduct.price * item.qty
      subtotal += itemTotal
      verifiedItems.push({
        id: realProduct.id,
        sku: realProduct.sku,
        name: realProduct.name,
        price: realProduct.price,
        qty: item.qty,
        image: realProduct.image,
        blouse: item.blouse || 'Unstitched Brocade Piece',
        itemTotal
      })
    }

    const shippingFee = 0 // Complimentary insured shipping
    const total = subtotal + shippingFee

    return {
      verifiedItems,
      subtotal,
      shippingFee,
      total
    }
  },

  getOrders: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS)
      if (stored) return JSON.parse(stored)
    } catch (e) {
      console.warn('LocalStorage orders error:', e)
    }
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(initialOrders))
    return initialOrders
  },

  createOrder: ({ customer, cartItems, paymentMode = 'DEMO_SIMULATED_UPI' }) => {
    // 1. Verify calculation safely from database
    const { verifiedItems, subtotal, shippingFee, total } = storeService.calculateOrderBreakdown(cartItems)

    // 2. Decrement inventory
    const products = storeService.getProducts()
    for (const item of verifiedItems) {
      const product = products.find(p => p.id === item.id)
      if (product) {
        product.stock = Math.max(0, product.stock - item.qty)
      }
    }
    storeService.saveProducts(products)

    // 3. Generate unique order reference
    const timestamp = Date.now()
    const orderRef = `LAK-ORD-${new Date().getFullYear()}-${timestamp.toString().slice(-5)}`

    // 4. Construct safe immutable order record
    const newOrder = {
      orderRef,
      customer: {
        name: customer.name.trim(),
        email: customer.email.trim(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        city: customer.city ? customer.city.trim() : 'Varanasi',
        state: customer.state ? customer.state.trim() : 'Uttar Pradesh',
        pinCode: customer.pinCode ? customer.pinCode.trim() : '221001'
      },
      items: verifiedItems,
      subtotal,
      shippingFee,
      total,
      paymentMode,
      paymentStatus: paymentMode.includes('COD') ? 'PENDING_ON_DELIVERY (DEMO)' : 'PAID (DEMO)',
      orderStatus: 'Processing',
      isDemo: true,
      demoNotice: 'SIMULATED DEMO ORDER — No real funds were deducted or payment gateway charged.',
      createdAt: new Date().toISOString()
    }

    const existingOrders = storeService.getOrders()
    const updatedOrders = [newOrder, ...existingOrders]
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updatedOrders))

    return newOrder
  },

  updateOrderStatus: (orderRef, status) => {
    const orders = storeService.getOrders()
    const updated = orders.map(o => o.orderRef === orderRef ? { ...o, orderStatus: status, updatedAt: new Date().toISOString() } : o)
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated))
    return updated.find(o => o.orderRef === orderRef)
  },

  // --- SITE SETTINGS ---
  getSettings: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS)
      if (stored) return JSON.parse(stored)
    } catch (e) {
      console.warn('LocalStorage settings error:', e)
    }
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(initialSettings))
    return initialSettings
  },

  updateSettings: (newSettings) => {
    const current = storeService.getSettings()
    const updated = { ...current, ...newSettings }
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated))
    return updated
  },

  // --- USERS & AUTH STATE ---
  getCurrentUser: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
      if (stored) return JSON.parse(stored)
    } catch (e) {
      console.warn('LocalStorage user error:', e)
    }
    return null // Guest by default
  },

  setCurrentUser: (user) => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
    }
    return user
  }
}
