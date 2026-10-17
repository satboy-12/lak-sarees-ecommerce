// LAK SAREES — Flagship Editorial Home Experience
// Faithful reproduction of Stitch Flagship Home Design

import React from 'react'
import { useStore } from '../context/StoreContext'
import { ProductCard } from '../components/ProductCard'
import { categoriesList } from '../data/products'
import {
  ArrowRight, ShieldCheck, Sparkles, Award, Globe,
  MessageCircle, Video, Star, CheckCircle, Package
} from 'lucide-react'

export const HomePage = ({ navigate, onSelectProduct }) => {
  const { products, formatMoney } = useStore()
  const WHATSAPP_NUMBER = '919876543210'

  const featuredSarees = products.filter(p => p.featured).slice(0, 6)

  const testimonials = [
    {
      quote: 'My wedding Kanchipuram from LAK Sarees is an absolute heirloom. The density of the pure zari and the traditional Korvai joinery left everyone in awe at our wedding in Udaipur.',
      author: 'Dr. Radhika Singhania',
      location: 'Hyderabad',
      saree: 'Devi Crimson Brocade Pure Banarasi'
    },
    {
      quote: 'The unboxing experience was breathtaking—the rigid keepsake chest, jasmine fragrance pouch, and Govt. Silk Mark certificate made it feel like receiving royalty.',
      author: 'Ananya Raghavan',
      location: 'Chennai',
      saree: 'Imperial Vaansingaram Kanchipuram'
    },
    {
      quote: 'Living in London, booking a video consultation with their master draper was effortless. They held up each drape against natural light and explained every motif.',
      author: 'Priya Mehta',
      location: 'London, UK',
      saree: 'Meenakshi Gulab Jamdani'
    }
  ]

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative w-full bg-surface-container-lowest overflow-hidden pb-16 lg:pb-24 pt-6">
        {/* Ambient Heritage Aura */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary-fixed/20 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-primary-fixed/25 blur-3xl pointer-events-none"></div>

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block w-8 h-[1px] bg-secondary"></span>
                <span className="font-sans text-xs uppercase tracking-[0.24em] text-secondary font-bold">
                  Haute Handloom Atelier
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight leading-[1.08] mb-5">
                Timeless Elegance. <br />
                <span className="italic font-normal text-secondary">Woven in Tradition.</span>
              </h1>

              <p className="font-sans text-sm sm:text-base text-on-surface-variant mb-7 max-w-lg leading-relaxed">
                Discover sarees that celebrate your most meaningful milestones. Pure Kanchipuram, Banarasi, and Chanderi heirlooms woven with tested silver and gold zari by revered master artisans.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                <button
                  onClick={() => navigate('shop')}
                  className="lak-button py-3.5 px-7"
                >
                  Explore Collection <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => navigate('about')}
                  className="lak-button-outline py-3.5 px-7"
                >
                  Discover Our Story
                </button>
              </div>

              {/* Trust Badges Bar */}
              <div className="bg-surface-container-low/70 rounded-xl p-4 border border-outline-variant/30">
                <div className="grid grid-cols-3 gap-2 text-center divide-x divide-outline-variant/40">
                  <div className="flex flex-col items-center px-1">
                    <ShieldCheck size={20} className="text-secondary mb-1" />
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider text-primary font-bold">
                      100% Silk Mark
                    </span>
                    <span className="text-[10px] text-on-surface-variant hidden sm:inline">
                      Govt. Certified Purity
                    </span>
                  </div>

                  <div className="flex flex-col items-center px-1">
                    <Sparkles size={20} className="text-secondary mb-1" />
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider text-primary font-bold">
                      Handloom Guild
                    </span>
                    <span className="text-[10px] text-on-surface-variant hidden sm:inline">
                      Pittoi &amp; Kadwa Weaves
                    </span>
                  </div>

                  <div className="flex flex-col items-center px-1">
                    <Globe size={20} className="text-secondary mb-1" />
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider text-primary font-bold">
                      Global Insured
                    </span>
                    <span className="text-[10px] text-on-surface-variant hidden sm:inline">
                      Direct to 45+ Countries
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Showcase (7 cols) */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative w-full aspect-[4/3] lg:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl group border border-outline-variant/30 bg-surface-container-low">
                <img
                  src="/images/hero/lak-sarees-hero.jpg"
                  alt="Indian bride draped in LAK Sarees heirloom pure gold zari bridal weave in royal courtyard"
                  onError={(e) => { e.currentTarget.src = '/assets/hero-bride.png' }}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Scrim Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-transparent to-transparent pointer-events-none"></div>

                {/* Floating Editorial Tag on Image */}
                <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs bg-surface-container-lowest/90 backdrop-blur-md p-4 sm:p-5 rounded-xl shadow-lg border border-outline-variant/30">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-bold block">
                    Bridal Opus 2026
                  </span>
                  <p className="font-serif text-lg text-primary font-bold mt-1">
                    The Imperial Vaansingaram
                  </p>
                  <p className="font-sans text-xs text-on-surface-variant mt-1 leading-relaxed">
                    Handwoven in gold tested zari with sacred forest motifs across 42 days on ancestral pit looms.
                  </p>
                </div>

                {/* Pure Zari Authentic Seal Badge */}
                <div className="absolute top-5 right-5 w-16 h-16 rounded-full bg-surface-container-lowest/95 backdrop-blur-md shadow-lg flex flex-col items-center justify-center text-center p-1 border border-secondary/40">
                  <Sparkles size={18} className="text-secondary" />
                  <span className="text-[8px] uppercase tracking-tighter text-primary font-bold mt-0.5">
                    Pure Zari
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILIGREE SEPARATOR */}
      <div className="w-full max-w-[1360px] mx-auto px-6 my-10 flex items-center justify-center">
        <div className="flex-1 h-[1px] bg-secondary/30"></div>
        <div className="px-5 flex items-center gap-2 text-secondary">
          <Sparkles size={16} />
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-secondary font-bold">
            Heirloom Handlooms
          </span>
          <Sparkles size={16} />
        </div>
        <div className="flex-1 h-[1px] bg-secondary/30"></div>
      </div>

      {/* 3. CURATED HANDLOOM EDITS & CLUSTERS */}
      <section className="w-full py-12 lg:py-20 bg-surface">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-secondary font-bold">
                Artisanal Curation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-primary font-semibold mt-1">
                Curated Handloom Edits
              </h2>
            </div>
            <p className="font-sans text-xs sm:text-sm text-on-surface-variant max-w-md leading-relaxed">
              Distinguished by historic weaving clusters, warp-weighted pure silks, and weightless celebration weaves.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categoriesList.map((cat, idx) => (
              <div
                key={cat.id}
                onClick={() => navigate('shop', { category: cat.id })}
                className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer shadow-sm border border-outline-variant/30 hover:shadow-luxury transition-all duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  onError={(e) => { e.currentTarget.src = '/images/fallback-saree.jpg' }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <span className="text-[9px] uppercase tracking-widest text-secondary-container block font-semibold">
                    {cat.count} Masterpieces
                  </span>
                  <h3 className="font-serif text-lg font-bold mt-0.5 leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-white/70 mt-1 line-clamp-1">
                    {cat.tagline}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-secondary-container group-hover:translate-x-1 transition-transform">
                    Explore Edit <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED ATELIER SAREES */}
      <section className="w-full py-16 bg-surface-container-low/40 border-y border-outline-variant/25">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-secondary font-bold">
                Boutique Vault
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-primary font-semibold mt-1">
                Featured Heirloom Drapes
              </h2>
            </div>
            <button
              onClick={() => navigate('shop')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-secondary transition-colors"
            >
              View Full Collection ({products.length}) <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredSarees.map((saree) => (
              <ProductCard key={saree.id} product={saree} onSelect={onSelectProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. WEAVING STORY & ARTISAN HERITAGE */}
      <section id="brand-story" className="w-full py-16 lg:py-24 bg-surface">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30">
                <img
                  src="/assets/model-drape.png"
                  alt="Master craftsmanship at LAK Sarees atelier"
                  onError={(e) => { e.currentTarget.src = '/images/fallback-saree.jpg' }}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Floating Plaque */}
              <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-secondary text-surface-container-lowest p-6 rounded-xl shadow-xl max-w-xs border border-secondary-container">
                <p className="font-serif text-2xl font-bold">Every Thread</p>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-secondary-fixed mt-1">
                  Carries a Living Heritage
                </p>
              </div>
            </div>

            {/* Text Vignette */}
            <div className="lg:col-span-6 flex flex-col gap-5 lg:pl-6">
              <span className="font-sans text-xs uppercase tracking-[0.24em] text-secondary font-bold">
                The Atelier Story
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl text-primary font-semibold leading-tight">
                Tradition that feels <em className="font-normal italic text-secondary">like you.</em>
              </h2>

              <div className="w-12 h-[1.5px] bg-secondary my-1"></div>

              <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
                At LAK Sarees, we believe a handloom saree is far more than an article of clothing. It carries the heartbeat of ancestral weavers, the quiet grace of family rituals, and the indelible memories of your most joyful days.
              </p>

              <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
                Every warp and weft is woven with Govt.-certified pure mulberry silk threads and tested zari. No synthetic polyester blends, no power-loom compromises—only genuine artisanal craftsmanship that honors the heritage of Varanasi and Kanchipuram.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
                  <span className="font-serif text-2xl font-bold text-primary">300+</span>
                  <p className="text-xs text-on-surface-variant font-medium mt-1">
                    Artisan Weaver Guild Families Supported
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
                  <span className="font-serif text-2xl font-bold text-primary">100%</span>
                  <p className="text-xs text-on-surface-variant font-medium mt-1">
                    Govt. Silk Mark &amp; Pure Zari Tested
                  </p>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => navigate('about')}
                  className="lak-button py-3.5 px-7"
                >
                  Read Full Heritage Dossier <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SIGNATURE HEIRLOOM PACKAGING SHOWCASE */}
      <section className="w-full py-16 bg-primary text-surface-container-lowest">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 flex flex-col gap-4">
              <span className="font-sans text-xs uppercase tracking-[0.24em] text-secondary-fixed font-bold">
                The Unboxing Ceremony
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-semibold leading-tight">
                A Keepsake Chest for <br />
                <span className="italic font-normal text-secondary-fixed">Generations.</span>
              </h2>
              <p className="font-sans text-xs sm:text-sm text-surface-variant/80 leading-relaxed max-w-lg mt-2">
                Every saree leaves our atelier nestled in a custom gold-embossed rigid keepsake chest, cushioned in pure mul-mul cotton fabric, infused with natural jasmine botanicals, and accompanied by its official Silk Mark hologram certification card.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs text-surface-variant/90">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-secondary-fixed" />
                  <span>Rigid Gold-Foil Keepsake Chest</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-secondary-fixed" />
                  <span>Breathable Muslin Saree Storage Bag</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-secondary-fixed" />
                  <span>Govt. 100% Silk Mark Hologram</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-secondary-fixed" />
                  <span>Natural Herbal Moth &amp; Fabric Care</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-secondary/30">
                <img
                  src="/images/branding/lak-sarees-packaging.jpg"
                  alt="LAK Sarees Signature Keepsake Rigid Packaging"
                  onError={(e) => { e.currentTarget.src = '/assets/packaging.png' }}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PATRON TESTIMONIALS */}
      <section className="w-full py-16 lg:py-24 bg-surface-container-low/30">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-sans text-xs uppercase tracking-[0.24em] text-secondary font-bold">
              Voices of our Patrons
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-semibold mt-1">
              Celebrated in Memories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest p-6 sm:p-8 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-secondary mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="font-serif text-sm sm:text-base text-primary italic leading-relaxed">
                    “{t.quote}”
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-outline-variant/30">
                  <p className="font-bold text-xs text-primary">{t.author}</p>
                  <p className="text-[11px] text-on-surface-variant">{t.location} · {t.saree}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. VIDEO SHOPPING & CONCIERGE BANNER */}
      <section className="w-full py-14 bg-surface-container-lowest border-t border-outline-variant/20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-secondary mb-3">
              <Video size={24} />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-primary font-semibold">
              Live Video Shopping Experience
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
              Connect one-on-one with our master drapers in Varanasi or Chennai. Inspect pallu details, drape fluidities, and zari sheen in high definition from anywhere in the world.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  'Hello LAK Sarees! I would like to book a live video shopping consultation.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="lak-button py-3 px-6"
              >
                <MessageCircle size={16} /> Book on WhatsApp
              </a>
              <button
                onClick={() => navigate('contact')}
                className="lak-button-outline py-3 px-6"
              >
                Schedule via Email
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
