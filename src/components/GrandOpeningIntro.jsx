// LAK SAREES — Grand Opening Experience Component
// Short, dignified luxury brand reveal matching the Royal Heritage Couture aesthetic
// Shown once per browser session with immediate skip option

import React, { useState, useEffect } from 'react'
import { Sparkles, ArrowRight, X } from 'lucide-react'

export const GrandOpeningIntro = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)

  const handleDismiss = () => {
    setIsFadingOut(true)
    setTimeout(() => {
      setIsVisible(false)
      try {
        sessionStorage.setItem('lak_intro_seen', 'true')
      } catch (e) {
        // Fallback if sessionStorage is disabled
      }
      if (onComplete) onComplete()
    }, 600) // Smooth fade out duration
  }

  // Auto-dismiss smoothly after 7 seconds if the user doesn't interact
  useEffect(() => {
    const timer = setTimeout(() => {
      handleDismiss()
    }, 7000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="LAK Sarees Grand Opening"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#fff8f8] text-[#22191b] transition-opacity duration-700 ease-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle Background Pattern & Ambient Radiance */}
      <div className="absolute inset-0 bg-radial from-[#775a1a]/10 via-[#4a0117]/5 to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 opacity-15 pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero/lak-sarees-hero.jpg')" }}
      />
      <div className="absolute inset-0 bg-[#fff8f8]/90 backdrop-blur-md pointer-events-none" />

      {/* Skip Button (Top Right) */}
      <button
        onClick={handleDismiss}
        className="absolute top-6 right-6 z-20 flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#775a1a]/40 bg-[#fff8f8]/90 text-[#4a0117] hover:bg-[#4a0117] hover:text-[#fff8f8] transition-all duration-300 text-[11px] font-bold uppercase tracking-widest shadow-xs"
        aria-label="Skip Introduction"
      >
        <span>Skip Intro</span>
        <X size={14} />
      </button>

      {/* Central Haute Couture Monogram Showcase */}
      <div className="relative z-10 max-w-lg w-full px-6 text-center flex flex-col items-center">
        {/* Decorative Gold Filigree Top Notch */}
        <div className="flex items-center gap-3 mb-6 animate-fade-in opacity-90">
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#775a1a]" />
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#775a1a]">
            Grand Opening · 2026
          </span>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#775a1a]" />
        </div>

        {/* Regal Emblem with Gentle Pulse */}
        <div className="relative mb-6 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-3 bg-gradient-to-b from-[#fff8f8] to-[#f7f0e8] border border-[#775a1a]/50 shadow-2xl flex items-center justify-center animate-scale-in">
          <img
            src="/images/branding/lak-sarees-emblem.png"
            alt="LAK Sarees Imperial Seal"
            onError={(e) => { e.currentTarget.src = '/assets/emblem.png' }}
            className="w-full h-full object-contain filter drop-shadow-sm"
          />
          <div className="absolute -inset-1 rounded-2xl border border-[#775a1a]/20 pointer-events-none animate-pulse" />
        </div>

        {/* Brand Wordmark & Heritage Tagline */}
        <h1 className="font-serif text-3xl sm:text-5xl text-[#4a0117] font-semibold tracking-wider mb-2 animate-fade-in-up">
          LAK SAREES
        </h1>
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#775a1a] mb-5 animate-fade-in-up delay-100">
          Haute Handlooms &amp; Heirloom Weaves
        </p>

        {/* Brief Narrative */}
        <p className="text-xs sm:text-sm text-[#554244] max-w-md leading-relaxed mb-8 font-normal animate-fade-in-up delay-200">
          Welcome to the digital flagship atelier. Weaving ancestral Kanchipuram Korvai and Banarasi Kadwa drapes in pure mulberry silk and tested gold zari.
        </p>

        {/* Primary Call-to-Action */}
        <button
          onClick={handleDismiss}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded bg-[#4a0117] text-[#ffffff] border border-[#775a1a] shadow-lg hover:bg-[#68182b] hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em] cursor-pointer"
        >
          <Sparkles size={14} className="text-[#ffd489]" />
          <span>Explore Collection</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Trust Badges Minimal Row */}
        <div className="flex items-center justify-center gap-6 mt-10 text-[10px] text-[#554244] uppercase tracking-wider font-semibold">
          <span>100% Silk Mark Certified</span>
          <span className="w-1 h-1 rounded-full bg-[#775a1a]" />
          <span>Ancestral Pit Looms</span>
          <span className="w-1 h-1 rounded-full bg-[#775a1a]" />
          <span>Pan-India Insured</span>
        </div>
      </div>
    </div>
  )
}
