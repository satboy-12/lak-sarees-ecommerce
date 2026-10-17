// LAK SAREES — Cinematic Grand Opening Experience
// Luxury fashion film opening sequence conforming strictly to brand guidelines:
// Scene 1: Darkness & Anticipation (Deep Maroon #68182B, subtle gold glow, silk unfolding)
// Scene 2: The Silk Reveal (Realistic fabric flow, slow-motion drift, soft golden light sweep)
// Scene 3: LAK SAREES Brand Reveal (Original emblem sharp & centered, restrained gold shimmer)
// Scene 4: Seamless Website Entrance (Smooth cinematic dissolve into untouched homepage)

import React, { useState, useEffect, useRef } from 'react'
import { X, Sparkles } from 'lucide-react'
import './GrandOpeningIntro.css'

export const GrandOpeningIntro = ({ onComplete }) => {
  // Phase state: 0 = Anticipation/Unfold, 1 = Silk Reveal, 2 = Brand Reveal, 3 = Exit/Entrance
  const [phase, setPhase] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [logoLoaded, setLogoLoaded] = useState(false)
  const timerRef = useRef(null)
  const animFrameRef = useRef(null)
  const startTimeRef = useRef(null)

  const TOTAL_DURATION_MS = 6200 // 6.2 seconds total

  // Smooth dismiss handler
  const handleDismiss = () => {
    if (isExiting) return
    setIsExiting(true)

    // Save session flag so it only plays on first entry in browsing session
    try {
      sessionStorage.setItem('lak_intro_seen', 'true')
    } catch (e) {
      // Graceful fallback if storage is restricted
    }

    setTimeout(() => {
      if (onComplete) onComplete()
    }, 850)
  }

  // Check prefers-reduced-motion
  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (mediaQuery.matches) {
        handleDismiss()
        return
      }
    } catch (e) {
      // Ignore if matchMedia not supported
    }

    // Escape key listener for accessibility
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleDismiss()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    // Sequence timeline orchestration
    // t=0ms: Scene 1 (Darkness & Anticipation / Silk unfolding)
    // t=1900ms: Scene 2 (The Silk Reveal & Light sweep)
    // t=3800ms: Scene 3 (LAK SAREES Brand Reveal)
    // t=5500ms: Scene 4 (Seamless Entrance fade-out)
    const t1 = setTimeout(() => setPhase(1), 1900)
    const t2 = setTimeout(() => setPhase(2), 3800)
    const t3 = setTimeout(() => handleDismiss(), 5500)

    // Progress counter for subtle indicator
    startTimeRef.current = performance.now()
    const updateProgress = (now) => {
      const elapsed = now - startTimeRef.current
      const pct = Math.min(100, Math.round((elapsed / TOTAL_DURATION_MS) * 100))
      setProgress(pct)
      if (pct < 100 && !isExiting) {
        animFrameRef.current = requestAnimationFrame(updateProgress)
      }
    }
    animFrameRef.current = requestAnimationFrame(updateProgress)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      if (timerRef.current) clearTimeout(timerRef.current)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  // Circumference for 14px circle (radius = 5.5, circumference ≈ 34.55)
  const radius = 5.5
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="LAK SAREES Grand Opening Presentation"
      className={`lak-cinematic-root ${isExiting ? 'lak-cinematic-exit' : ''}`}
    >
      {/* Layer 1: Ambient Deep Maroon (#68182B) Glow */}
      <div className="lak-cinematic-ambient" />

      {/* Layer 2: Scene 1 Silk Macro Unfold (0.0s - 2.0s) */}
      <div
        className={`lak-cinematic-silk-layer lak-cinematic-silk-macro ${
          phase === 0 ? 'lak-active' : 'lak-passed'
        }`}
        style={{
          backgroundImage: "url('/images/products/macro-zari-weave.jpg')",
        }}
      />

      {/* Layer 3: Scene 2 Flowing Silk Drapery (2.0s - 4.0s) */}
      <div
        className={`lak-cinematic-silk-layer lak-cinematic-silk-flow ${
          phase === 1 ? 'lak-active' : phase > 1 ? 'lak-passed' : ''
        }`}
        style={{
          backgroundImage: "url('/images/products/saree-antique-maroon-bridal.jpg')",
        }}
      />

      {/* Layer 4: Soft Golden Light Sweep across the Silk */}
      <div
        className={`lak-cinematic-light-sweep ${
          phase === 1 ? 'lak-active' : ''
        }`}
      />

      {/* Layer 5: Cinematic Vignette Shadow */}
      <div className="lak-cinematic-vignette" />

      {/* Skip Button: Top Right, Accessible, Discrete */}
      <button
        onClick={handleDismiss}
        className="lak-cinematic-skip-btn"
        aria-label="Skip Introduction and Enter Website"
      >
        <svg className="lak-cinematic-progress-ring" viewBox="0 0 14 14">
          <circle
            cx="7"
            cy="7"
            r={radius}
            fill="none"
            stroke="rgba(198, 161, 91, 0.25)"
            strokeWidth="1.5"
          />
          <circle
            cx="7"
            cy="7"
            r={radius}
            fill="none"
            className="lak-cinematic-progress-circle"
            strokeWidth="1.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span>Skip Intro</span>
        <X size={13} className="text-[#C6A15B]" />
      </button>

      {/* Captions for Scene 1 & Scene 2 */}
      <div
        className={`lak-cinematic-caption ${
          phase === 0 ? 'lak-visible' : 'lak-hidden'
        }`}
      >
        <div className="inline-flex items-center gap-3">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#C6A15B]" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
            The Royal Heritage Collection
          </span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#C6A15B]" />
        </div>
      </div>

      <div
        className={`lak-cinematic-caption ${
          phase === 1 ? 'lak-visible' : 'lak-hidden'
        }`}
      >
        <div className="inline-flex items-center gap-3">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#C6A15B]" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#F7F0E8] font-medium">
            Ancestral Mulberry Silk &amp; Pure Tested Gold Zari
          </span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#C6A15B]" />
        </div>
      </div>

      {/* Layer 6: Scene 3 Brand Reveal (3.8s - 5.8s) */}
      <div
        className={`lak-cinematic-brand-stage ${
          phase >= 2 ? 'lak-visible' : ''
        }`}
      >
        {/* Editorial Eyebrow */}
        <div className="flex items-center gap-3 mb-5 opacity-90">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#C6A15B]" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.36em] text-[#C6A15B] font-bold">
            Haute Couture Atelier
          </span>
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#C6A15B]" />
        </div>

        {/* The Original LAK SAREES Emblem Plaque */}
        <div className="lak-cinematic-emblem-card">
          {/* Ornamental Gold Corner Accents */}
          <div className="lak-cinematic-corner lak-cinematic-corner-tl" />
          <div className="lak-cinematic-corner lak-cinematic-corner-tr" />
          <div className="lak-cinematic-corner lak-cinematic-corner-bl" />
          <div className="lak-cinematic-corner lak-cinematic-corner-br" />

          {/* Shimmer Light Beam across the Logo */}
          <div
            className={`lak-cinematic-logo-shimmer ${
              phase >= 2 ? 'lak-shimmer-run' : ''
            }`}
          />

          {/* Original Emblem Image: perfectly sharp, centered, undistorted */}
          <img
            src="/assets/emblem.png"
            alt="LAK SAREES"
            onLoad={() => setLogoLoaded(true)}
            onError={(e) => {
              // Fallback to alternative existing branding asset
              e.currentTarget.src = '/images/branding/lak-sarees-emblem.png'
            }}
            className="lak-cinematic-logo-img"
          />
        </div>

        {/* Heritage Subtitle */}
        <div className="mt-6 flex flex-col items-center">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.32em] text-[#F7F0E8] drop-shadow-sm">
            Haute Handlooms &amp; Heirloom Weaves
          </p>
          <div className="flex items-center gap-2 mt-2 text-[10px] uppercase tracking-[0.24em] text-[#C6A15B] font-medium opacity-85">
            <span>Kanchipuram</span>
            <span>·</span>
            <span>Banaras</span>
            <span>·</span>
            <span>Handwoven in India</span>
          </div>
        </div>
      </div>
    </div>
  )
}
