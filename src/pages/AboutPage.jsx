// LAK SAREES — Brand Story & Artisanal Heritage Editorial
// High-fashion lookbook style honoring Varanasi and Kanchipuram master weavers

import React from 'react'
import {
  ShieldCheck, Sparkles, Award, Heart, CheckCircle2,
  ArrowRight, MessageCircle, MapPin
} from 'lucide-react'

export const AboutPage = ({ navigate }) => {
  const WHATSAPP_NUMBER = '919876543210'

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* 1. EDITORIAL HERO BANNER */}
      <section className="relative w-full bg-surface-container-lowest py-16 lg:py-24 border-b border-outline-variant/30">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-3">
            Haute Handloom Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-primary font-bold leading-tight">
            The Living Art of the Indian Drape
          </h1>
          <div className="w-16 h-[1.5px] bg-secondary mx-auto my-6"></div>
          <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Founded with a reverence for authentic Indian handloom traditions, LAK SAREES bridges ancestral weaving clusters with modern luxury connoisseurs across the globe.
          </p>
        </div>
      </section>

      {/* 2. THREE PILLARS OF CRAFTSMANSHIP */}
      <section className="w-full py-16 lg:py-24">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-secondary mb-5">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-primary mb-3">
                  100% Pure Silk Mark
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Every saree in our vault carries the Govt. of India Silk Mark certification seal. We source solely untwisted, unbleached pure mulberry silk and wild forest tussar filaments.
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-secondary mt-6 block">
                Purity Guaranteed
              </span>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-secondary mb-5">
                  <Sparkles size={24} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-primary mb-3">
                  Tested Silver-Gilt Zari
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Our bridal trousseaus use authentic tested zari threads—pure silver electroplated with 24K gold foil—ensuring an antique sheen that does not tarnish or discolor over decades.
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-secondary mt-6 block">
                Precious Metal Threads
              </span>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-secondary mb-5">
                  <Heart size={24} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-primary mb-3">
                  Artisan Guild Direct
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  By working directly with master weavers in Kanchipuram, Varanasi, Chanderi, and Salem, we ensure fair master wages, preserve endangered pit loom techniques, and eliminate middlemen.
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-secondary mt-6 block">
                Ethical Luxury
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISUAL EDITORIAL SPLIT */}
      <section className="w-full py-16 bg-surface-container-low/40 border-y border-outline-variant/20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30">
              <img
                src="/assets/model-drape.png"
                alt="LAK Sarees Model Editorial"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="flex flex-col gap-5">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-secondary font-bold">
                The Loom Heritage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-primary font-bold leading-tight">
                From Ancestral Pit Looms to Modern Heirlooms
              </h2>
              <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                A single Banarasi Kadwa or Kanchipuram Korvai drape can require between 28 to 45 consecutive days of intense manual labor. Two weavers sit synchronized on ancestral pit looms, passing individual shuttles across hundreds of thousands of warp intersections.
              </p>
              <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                When you choose an heirloom from LAK SAREES, you become the custodian of a living cultural lineage that spans over five centuries of South Asian textile excellence.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('shop')}
                  className="lak-button py-3.5 px-6"
                >
                  Explore Current Vault <ArrowRight size={15} />
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    'Namaste LAK Sarees! I would like to learn more about your master weaver clusters.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="lak-button-outline py-3.5 px-6"
                >
                  <MessageCircle size={15} /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
