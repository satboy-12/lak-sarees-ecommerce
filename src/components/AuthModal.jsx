// LAK SAREES — Authentication & Atelier Access Modal
// Supports Patron Registration, Sign-in, and 1-Click Demo Accounts

import React, { useState } from 'react'
import { useStore } from '../context/StoreContext'
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react'

export const AuthModal = () => {
  const { authModalOpen, setAuthModalOpen, login, register, showToast } = useStore()
  const [tab, setTab] = useState('login') // 'login' | 'register' | 'forgot'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (!authModalOpen) return null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please provide your registered email and password.')
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      login(formData.email, formData.password)
    }, 600)
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in your name, email address and password.')
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      register(formData)
    }, 600)
  }

  const handleQuickDemoCustomer = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      login('priya.patron@example.com', 'demo123', false)
    }, 400)
  }

  const handleQuickDemoAdmin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      login('concierge@laksarees.com', 'adminSecretKey2026', true)
    }, 400)
  }

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-black/60 p-4 backdrop-blur-xs">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-8 w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/40">
          <div className="flex items-center gap-3">
            <img src="/assets/emblem.png" alt="" className="h-8 w-8 object-contain" />
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold">
                LAK SAREES
              </p>
              <h2 className="font-serif text-xl font-bold text-primary">
                {tab === 'login' ? 'Patron Sign In' : tab === 'register' ? 'Register Private Account' : 'Password Recovery'}
              </h2>
            </div>
          </div>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-outline-variant/30 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => { setTab('login'); setError('') }}
            className={`flex-1 py-3 text-center transition-colors ${
              tab === 'login'
                ? 'border-b-2 border-primary text-primary bg-surface-container-lowest'
                : 'text-on-surface-variant hover:text-primary bg-surface-container-low/30'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setTab('register'); setError('') }}
            className={`flex-1 py-3 text-center transition-colors ${
              tab === 'register'
                ? 'border-b-2 border-primary text-primary bg-surface-container-lowest'
                : 'text-on-surface-variant hover:text-primary bg-surface-container-low/30'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {error}
            </div>
          )}

          {tab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="patron@domain.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-primary">
                    Password *
                  </label>
                  <button
                    type="button"
                    onClick={() => setTab('forgot')}
                    className="text-[11px] text-secondary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="lak-button w-full justify-center py-3"
              >
                {isLoading ? 'Verifying Atelier Credentials...' : 'Sign In to Account'}
              </button>
            </form>
          )}

          {tab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="patron@domain.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                  Phone (WhatsApp Delivery Updates)
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                  Create Password *
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="lak-button w-full justify-center py-3"
              >
                {isLoading ? 'Creating Private Account...' : 'Register as Patron'}
              </button>
            </form>
          )}

          {tab === 'forgot' && (
            <div className="space-y-4">
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Enter your registered email address. In live mode, a secure password reset link will be dispatched via Firebase Auth.
              </p>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                  Registered Email
                </label>
                <input
                  type="email"
                  placeholder="patron@domain.com"
                  className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>
              <button
                onClick={() => {
                  showToast('Demo password reset instructions simulated for this session.')
                  setTab('login')
                }}
                className="lak-button w-full justify-center py-3"
              >
                Send Password Reset Email
              </button>
              <button
                onClick={() => setTab('login')}
                className="w-full text-center text-xs text-primary hover:underline font-semibold"
              >
                Return to Sign In
              </button>
            </div>
          )}

          {/* 1-CLICK INSTANT DEMO ROLES */}
          <div className="mt-6 pt-5 border-t border-outline-variant/30">
            <p className="text-[11px] font-bold uppercase tracking-widest text-secondary text-center mb-3">
              ✦ Fast 1-Click Demo Evaluation ✦
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={handleQuickDemoCustomer}
                className="p-2.5 bg-surface-container hover:bg-surface-container-high text-primary rounded-lg font-semibold text-center transition-colors border border-outline-variant/30"
              >
                Sign in as <span className="block font-bold text-secondary">Patron (Customer)</span>
              </button>
              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                className="p-2.5 bg-primary text-white hover:bg-primary-container rounded-lg font-semibold text-center transition-colors border border-secondary"
              >
                Sign in as <span className="block font-bold text-secondary-fixed">Master Draper (Admin)</span>
              </button>
            </div>
            <p className="text-[10px] text-center text-on-surface-variant mt-2.5">
              Instantly toggle between customer storefront and the protected staff console.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
