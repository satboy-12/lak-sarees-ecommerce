// LAK SAREES — Luxury Editorial Footer
// Conforming strictly to Stitch Royal Heritage Couture Design System

import React from 'react'
import {
  MessageCircle, Phone, Mail, MapPin, ShieldCheck,
  Sparkles, ArrowUpRight, Heart, Award
} from 'lucide-react'

export const Footer = ({ navigate }) => {
  const WHATSAPP_NUMBER = '919876543210'

  return (
    <footer className="bg-[#1f1618] text-surface-container-lowest border-t border-secondary/40">
      {/* 1. BRAND EMBLEM & EDITORIAL CREST BANNER */}
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-outline-variant/20">
          
          {/* Brand Manifesto (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <img
                src="/assets/emblem.png"
                alt="LAK Sarees Emblem"
                className="h-12 w-12 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-widest text-surface-container-lowest font-bold leading-none">
                  LAK SAREES
                </span>
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-secondary-fixed font-semibold mt-1">
                  Haute Handlooms
                </span>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-surface-variant/80 leading-relaxed max-w-sm mt-2">
              Sarees chosen for the moments you hold closest. Handwoven heirlooms in pure silk, celebrating centuries of ancestral weaving clusters from Varanasi and Kanchipuram.
            </p>

            <div className="flex items-center gap-2 mt-2 text-xs text-secondary-fixed font-medium">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
              <span>Atelier Open for Private Consultations</span>
            </div>
          </div>

          {/* Quick Collection Links (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-secondary-fixed font-bold">
              Collections
            </p>
            <nav className="flex flex-col gap-2.5 text-xs text-surface-variant/75">
              <button
                onClick={() => navigate('silk-sarees')}
                className="text-left hover:text-secondary-fixed transition-colors"
              >
                Pure Kanchipuram
              </button>
              <button
                onClick={() => navigate('bridal-couture')}
                className="text-left hover:text-secondary-fixed transition-colors"
              >
                Banarasi Brocades
              </button>
              <button
                onClick={() => navigate('festive')}
                className="text-left hover:text-secondary-fixed transition-colors"
              >
                Chanderi Tissue
              </button>
              <button
                onClick={() => navigate('shop')}
                className="text-left hover:text-secondary-fixed transition-colors"
              >
                Soft Mulberry Silk
              </button>
              <button
                onClick={() => navigate('shop')}
                className="text-left hover:text-secondary-fixed transition-colors"
              >
                Everyday Handloom Cotton
              </button>
            </nav>
          </div>

          {/* Boutiques & Atelier (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-secondary-fixed font-bold">
              Flagship Atelier
            </p>
            <div className="flex flex-col gap-3 text-xs text-surface-variant/75">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-secondary-fixed shrink-0 mt-0.5" />
                <span>24 Palace Heritage Enclave, Near Ganges Ghats, Varanasi, UP 221001</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-secondary-fixed shrink-0" />
                <span>+91 98765 43210 (10 AM – 8 PM IST)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-secondary-fixed shrink-0" />
                <span>concierge@laksarees.com</span>
              </div>
            </div>
          </div>

          {/* Personalized Concierge CTA (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4 bg-surface-container-low/10 p-5 rounded-xl border border-secondary/20">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-secondary-fixed font-bold flex items-center gap-2">
              <Sparkles size={14} /> Personal Concierge
            </p>
            <p className="text-xs text-surface-variant/80 leading-relaxed">
              Seeking trousseau styling advice or live drape videos? Connect directly with our master drapers.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Namaste LAK Sarees! I would like to schedule a private video consultation and explore your bridal heirloom collection.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider rounded shadow hover:bg-[#20ba59] transition-colors"
            >
              <MessageCircle size={15} />
              WhatsApp Concierge
            </a>
          </div>
        </div>

        {/* 2. TRUST MARKS & CRAFTSMANSHIP STANDARDS */}
        <div className="py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-b border-outline-variant/15 text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck size={22} className="text-secondary-fixed mb-1.5" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-surface-container-lowest">
              100% Silk Mark Certified
            </span>
            <span className="text-[10px] text-surface-variant/60">Govt. of India Quality Mark</span>
          </div>

          <div className="flex flex-col items-center">
            <Award size={22} className="text-secondary-fixed mb-1.5" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-surface-container-lowest">
              Tested Pure Zari
            </span>
            <span className="text-[10px] text-surface-variant/60">Certified Silver &amp; Gold Threads</span>
          </div>

          <div className="flex flex-col items-center">
            <Sparkles size={22} className="text-secondary-fixed mb-1.5" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-surface-container-lowest">
              Ancestral Pit Looms
            </span>
            <span className="text-[10px] text-surface-variant/60">Direct Artisan Guild Support</span>
          </div>

          <div className="flex flex-col items-center">
            <Heart size={22} className="text-secondary-fixed mb-1.5" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-surface-container-lowest">
              Insured Worldwide Transit
            </span>
            <span className="text-[10px] text-surface-variant/60">Delivered in Keepsake Boxes</span>
          </div>
        </div>

        {/* 3. COPYRIGHT & DEMO DISCLAIMER */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-surface-variant/60">
          <div>
            © {new Date().getFullYear()} LAK SAREES · Flagship Haute Handlooms Atelier. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-[10px] tracking-wider uppercase">
            <span className="text-secondary-fixed font-semibold">Demo Experience Mode</span>
            <span>·</span>
            <span>Simulated Payments</span>
            <span>·</span>
            <button onClick={() => navigate('admin')} className="text-secondary-fixed hover:underline">
              Staff Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
