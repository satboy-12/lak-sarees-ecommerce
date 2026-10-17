// LAK SAREES — Luxury Flagship Header & Announcement Ribbon
// Conforming strictly to Stitch Royal Heritage Couture Design System

import React, { useState } from 'react'
import { useStore } from '../context/StoreContext'
import {
  ShoppingBag, Heart, Search, User, ShieldCheck, Phone,
  Menu, X, Sparkles, LogOut, LayoutDashboard, Globe
} from 'lucide-react'

export const Header = ({ currentRoute, navigate }) => {
  const {
    cartCount,
    wishlist,
    setCartDrawerOpen,
    currentUser,
    isAdmin,
    logout,
    setAuthModalOpen,
    currency,
    setCurrency
  } = useStore()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)

  const navLinks = [
    { label: 'Home', path: 'home' },
    { label: 'Shop All', path: 'shop' },
    { label: 'Silk Sarees', path: 'silk-sarees' },
    { label: 'Bridal Couture', path: 'bridal-couture' },
    { label: 'Festive Wear', path: 'festive' },
    { label: 'Our Story', path: 'about' },
    { label: 'Contact', path: 'contact' }
  ]

  const handleNavClick = (path) => {
    navigate(path)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      {/* 1. TOP ANNOUNCEMENT CONCIERGE BAR */}
      <div className="bg-primary text-secondary-fixed py-2 px-4 sm:px-8 lg:px-16 text-center flex items-center justify-between text-xs tracking-wider border-b border-secondary/20 shadow-sm">
        <div className="hidden md:flex items-center gap-2 font-medium text-secondary-fixed-dim">
          <Phone size={13} className="text-secondary-container" />
          <span>Concierge: +91 98765 43210</span>
        </div>

        <div className="flex-1 text-center font-medium text-[11px] sm:text-xs uppercase tracking-widest text-secondary-fixed flex items-center justify-center gap-2">
          <span>Complimentary Pan-India Express Shipping &amp; Worldwide Insured Courier</span>
          <span className="opacity-40 hidden sm:inline">|</span>
          <button
            onClick={() => handleNavClick('contact')}
            className="hidden sm:inline text-secondary-container hover:text-white underline underline-offset-4 decoration-secondary-fixed-dim transition-colors"
          >
            Book Virtual Video Appointment
          </button>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-secondary-fixed-dim font-medium text-[11px] uppercase tracking-wider">
          <ShieldCheck size={14} className="text-secondary-container" />
          <span>100% Pure Silk Mark Certified</span>
        </div>
      </div>

      {/* 2. MAIN BRAND NAVIGATION BAR */}
      <div className="h-20 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(34,25,27,0.04)]">
        <div className="max-w-[1360px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo & Emblem (Proportions strictly preserved) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group text-left focus:outline-none"
              aria-label="LAK Sarees Home"
            >
              <img
                src="/assets/emblem.png"
                alt="LAK Sarees Emblem"
                className="h-10 w-10 sm:h-11 sm:w-11 object-contain transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl tracking-wider text-primary font-bold leading-none">
                  LAK SAREES
                </span>
                <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-secondary font-semibold mt-1">
                  Haute Handlooms
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-7">
            {navLinks.map((item) => {
              const active = currentRoute === item.path
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`relative py-1 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-200 ${
                    active
                      ? 'text-primary font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-secondary'
                      : 'text-on-surface-variant hover:text-primary after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-secondary hover:after:w-full after:transition-all'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* Right Action Icons & Tools */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Currency Selector */}
            <div className="hidden sm:flex items-center border border-outline-variant/40 rounded px-1.5 py-0.5 bg-surface-container-low/50">
              <Globe size={13} className="text-secondary mr-1" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent text-[11px] font-semibold text-on-surface-variant focus:outline-none cursor-pointer uppercase"
                aria-label="Select Currency"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
                <option value="AED">AED</option>
              </select>
            </div>

            {/* Quick Search */}
            <button
              onClick={() => handleNavClick('shop')}
              className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container"
              aria-label="Search Collection"
            >
              <Search size={18} />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleNavClick('wishlist')}
              className="relative p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container"
              aria-label="View Wishlist"
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Drawer Toggle */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="relative p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-secondary text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account / Profile / Admin Link */}
            <div className="relative">
              {currentUser ? (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 pl-1.5 text-on-surface-variant hover:text-primary focus:outline-none"
                  aria-label="Account Menu"
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold border border-secondary shadow-sm">
                    {currentUser.avatar || 'PA'}
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container"
                  aria-label="Sign In"
                >
                  <User size={18} />
                </button>
              )}

              {/* User Dropdown */}
              {userDropdownOpen && currentUser && (
                <div className="absolute right-0 mt-3 w-56 bg-surface-container-lowest border border-outline-variant/40 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-outline-variant/30">
                    <p className="text-xs font-bold text-primary truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-on-surface-variant truncate">{currentUser.email}</p>
                    {isAdmin && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded bg-secondary-container/40 text-on-secondary-container text-[9px] uppercase font-bold tracking-wider">
                        Master Draper (Admin)
                      </span>
                    )}
                  </div>

                  {isAdmin && (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false)
                        handleNavClick('admin')
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-primary hover:bg-surface-container flex items-center gap-2 font-semibold"
                    >
                      <LayoutDashboard size={14} className="text-secondary" />
                      Staff Admin Console
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false)
                      handleNavClick('orders')
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-on-surface-variant hover:bg-surface-container flex items-center gap-2"
                  >
                    <ShoppingBag size={14} />
                    My Saree Orders
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false)
                      logout()
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-error hover:bg-error-container/20 flex items-center gap-2 border-t border-outline-variant/30 mt-1"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Direct Admin Link for convenience */}
            <button
              onClick={() => handleNavClick('admin')}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-secondary/40 text-primary hover:bg-surface-container text-[11px] font-bold uppercase tracking-wider transition-colors"
              title="Open Staff Admin Console"
            >
              <LayoutDashboard size={13} className="text-secondary" />
              <span>Admin Console</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-on-surface-variant hover:text-primary xl:hidden focus:outline-none"
              aria-label="Toggle Mobile Navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MOBILE SLIDE-OUT NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-lowest border-b border-outline-variant/40 shadow-2xl px-6 py-6 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`text-left text-sm font-semibold uppercase tracking-widest py-2 border-b border-outline-variant/20 transition-colors ${
                  currentRoute === item.path ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  handleNavClick('admin')
                }}
                className="lak-button-outline w-full justify-center"
              >
                <LayoutDashboard size={15} />
                Staff Admin Console
              </button>

              {!currentUser ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setAuthModalOpen(true)
                  }}
                  className="lak-button w-full justify-center"
                >
                  <User size={15} />
                  Patron Sign In
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    logout()
                  }}
                  className="text-center text-xs text-error py-2 font-semibold"
                >
                  Sign Out ({currentUser.name})
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
