// LAK SAREES — Shop & Collection Catalog Experience
// Faithful reproduction of Stitch Shop Collection Page with multi-facet filters & sorting

import React, { useState, useMemo } from 'react'
import { useStore } from '../context/StoreContext'
import { ProductCard } from '../components/ProductCard'
import {
  Search, SlidersHorizontal, Grid, Columns, X,
  ShieldCheck, RotateCcw, ChevronRight, Check
} from 'lucide-react'

export const ShopPage = ({ navigate, onSelectProduct, initialFilters = {} }) => {
  const { products, formatMoney } = useStore()

  // Filter States
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category || 'All')
  const [selectedOccasion, setSelectedOccasion] = useState(initialFilters.occasion || 'All')
  const [silkMarkOnly, setSilkMarkOnly] = useState(false)
  const [priceRange, setPriceRange] = useState('All') // 'All' | 'under25k' | '25k-45k' | 'above45k'
  const [sortBy, setSortBy] = useState('featured')
  const [gridColumns, setGridColumns] = useState(3) // 3 or 2
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const categories = ['All', 'Pure Kanchipuram', 'Banarasi Couture', 'Chanderi & Tussar', 'Soft Silk', 'Everyday Cotton']
  const occasions = ['All', 'Bridal Couture', 'Festive Wear', 'Royal Reception', 'Everyday Luxury']

  // Multi-facet filtering and sorting
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      // Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false

      // Occasion
      if (selectedOccasion !== 'All' && p.occasion !== selectedOccasion) return false

      // Silk Mark
      if (silkMarkOnly && !p.silkMarkCertified) return false

      // Price Range
      if (priceRange === 'under20k' && p.price > 20000) return false
      if (priceRange === '20k-40k' && (p.price < 20000 || p.price > 40000)) return false
      if (priceRange === 'above40k' && p.price < 40000) return false

      // Search Query
      if (search.trim()) {
        const q = search.toLowerCase()
        const text = `${p.name} ${p.category} ${p.fabric} ${p.color} ${p.origin || ''} ${p.sku}`.toLowerCase()
        if (!text.includes(q)) return false
      }

      return true
    })

    // Sorting
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'stock') {
      result = [...result].sort((a, b) => a.stock - b.stock)
    }

    return result
  }, [products, selectedCategory, selectedOccasion, silkMarkOnly, priceRange, search, sortBy])

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('All')
    setSelectedOccasion('All')
    setSilkMarkOnly(false)
    setPriceRange('All')
    setSortBy('featured')
  }

  const hasActiveFilters =
    search.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedOccasion !== 'All' ||
    silkMarkOnly ||
    priceRange !== 'All'

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* 1. TOP EDITORIAL HEADER & BREADCRUMBS */}
      <section className="w-full bg-surface-container-low px-4 sm:px-6 lg:px-16 py-8 border-b border-outline-variant/30">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-3">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-on-surface-variant">
            <button onClick={() => navigate('home')} className="hover:text-primary transition-colors">
              Home
            </button>
            <ChevronRight size={13} className="text-secondary" />
            <span className="text-primary font-bold">Shop All Sarees</span>
          </nav>

          {/* Main Collection Title */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
            <div className="max-w-2xl flex flex-col gap-2">
              <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span>Artisanal Bridal &amp; Festive Trousseau</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary font-semibold tracking-tight">
                The Bridal &amp; Silk Heirlooms Archive
              </h1>
              <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Explore our master-crafted pure silk sarees, handwoven with tested pure silver and gold zari. Each drape represents weeks of meticulous handloom craftsmanship passed down across generations.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start lg:self-end bg-surface-container px-4 py-2 rounded-lg text-primary text-xs font-semibold border border-outline-variant/30">
              <ShieldCheck size={16} className="text-secondary" />
              <span className="uppercase tracking-wider">100% Silk Mark Certified Pure Silk</span>
            </div>
          </div>

          {/* Filter Summary & Controls Bar */}
          <div className="mt-6 pt-4 bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-outline-variant/30 flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Active Count & Filter Pills */}
            <div className="w-full lg:w-auto flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary mr-2">
                Showing {filteredProducts.length} Handloom Sarees
              </span>

              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container text-primary text-xs font-medium">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')} className="hover:text-error">
                    <X size={13} />
                  </button>
                </span>
              )}

              {selectedOccasion !== 'All' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container text-primary text-xs font-medium">
                  {selectedOccasion}
                  <button onClick={() => setSelectedOccasion('All')} className="hover:text-error">
                    <X size={13} />
                  </button>
                </span>
              )}

              {silkMarkOnly && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container text-primary text-xs font-medium">
                  Silk Mark Only
                  <button onClick={() => setSilkMarkOnly(false)} className="hover:text-error">
                    <X size={13} />
                  </button>
                </span>
              )}

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-secondary text-xs uppercase tracking-wider underline hover:text-primary transition-colors ml-2 font-bold"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Sorting & Grid View Controls */}
            <div className="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-4">
              
              {/* Mobile Filter Toggle Button */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 bg-surface-container rounded-lg text-xs font-bold text-primary"
              >
                <SlidersHorizontal size={14} /> Filter Archive
              </button>

              <div className="flex items-center gap-2">
                <label htmlFor="sort-select" className="text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
                  Sort By:
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-surface-container-low text-primary text-xs font-semibold py-2 px-3 rounded border border-outline-variant/40 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="stock">Vault Availability</option>
                </select>
              </div>

              {/* Desktop 3-Col vs 2-Col Grid View Toggle */}
              <div className="hidden sm:flex items-center gap-1 bg-surface-container-low p-1 rounded-lg border border-outline-variant/40">
                <button
                  onClick={() => setGridColumns(3)}
                  className={`p-1.5 rounded transition-colors ${
                    gridColumns === 3 ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-on-surface-variant'
                  }`}
                  title="3-Column Gallery"
                >
                  <Grid size={15} />
                </button>
                <button
                  onClick={() => setGridColumns(2)}
                  className={`p-1.5 rounded transition-colors ${
                    gridColumns === 2 ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-on-surface-variant'
                  }`}
                  title="2-Column Large Editorial View"
                >
                  <Columns size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN BODY: SIDEBAR FILTERS + LUXURY PRODUCT GRID */}
      <section className="w-full px-4 sm:px-6 lg:px-16 py-12">
        <div className="max-w-[1360px] mx-auto flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Filter Sidebar (Desktop) */}
          <aside className={`w-full lg:w-72 shrink-0 flex flex-col gap-6 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs ${
            mobileFilterOpen ? 'block' : 'hidden lg:flex'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <span className="font-serif text-lg font-bold text-primary flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-secondary" /> Filter Archive
              </span>
              <button
                onClick={clearFilters}
                className="text-xs text-on-surface-variant hover:text-primary uppercase tracking-wider font-semibold"
              >
                Reset
              </button>
            </div>

            {/* Search Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                Search Sarees
              </label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Kanchipuram, Banarasi, Red..."
                  className="w-full pl-9 pr-3 py-2 bg-surface-container-low text-xs rounded-lg text-primary focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>
            </div>

            {/* Silk Mark Certified Toggle */}
            <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                <ShieldCheck size={16} className="text-secondary" />
                <span>100% Silk Mark Only</span>
              </div>
              <input
                type="checkbox"
                checked={silkMarkOnly}
                onChange={(e) => setSilkMarkOnly(e.target.checked)}
                className="w-4 h-4 accent-primary cursor-pointer"
              />
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2.5">
                Weave Category
              </h3>
              <div className="space-y-1.5 text-xs text-on-surface-variant">
                {categories.map((cat) => {
                  const count = cat === 'All' ? products.length : products.filter(p => p.category === cat).length
                  return (
                    <label
                      key={cat}
                      className="flex items-center justify-between p-1.5 rounded hover:bg-surface-container-low cursor-pointer transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(cat)}
                          className="accent-primary"
                        />
                        <span className={selectedCategory === cat ? 'font-bold text-primary' : ''}>
                          {cat}
                        </span>
                      </span>
                      <span className="text-[10px] text-on-surface-variant/70">({count})</span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Occasion Filter */}
            <div className="pt-4 border-t border-outline-variant/30">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2.5">
                Occasion &amp; Edit
              </h3>
              <div className="space-y-1.5 text-xs text-on-surface-variant">
                {occasions.map((occ) => (
                  <label
                    key={occ}
                    className="flex items-center justify-between p-1.5 rounded hover:bg-surface-container-low cursor-pointer transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="occasion"
                        checked={selectedOccasion === occ}
                        onChange={() => setSelectedOccasion(occ)}
                        className="accent-primary"
                      />
                      <span className={selectedOccasion === occ ? 'font-bold text-primary' : ''}>
                        {occ}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="pt-4 border-t border-outline-variant/30">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2.5">
                Price Range
              </h3>
              <div className="space-y-1.5 text-xs text-on-surface-variant">
                {[
                  { id: 'All', label: 'All Price Tiers' },
                  { id: 'under20k', label: 'Under ₹20,000' },
                  { id: '20k-40k', label: '₹20,000 – ₹40,000' },
                  { id: 'above40k', label: '₹40,000+ (Bridal Couture)' }
                ].map((tier) => (
                  <label
                    key={tier.id}
                    className="flex items-center justify-between p-1.5 rounded hover:bg-surface-container-low cursor-pointer transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={priceRange === tier.id}
                        onChange={() => setPriceRange(tier.id)}
                        className="accent-primary"
                      />
                      <span className={priceRange === tier.id ? 'font-bold text-primary' : ''}>
                        {tier.label}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Product Grid Area */}
          <main className="flex-1 w-full">
            {filteredProducts.length === 0 ? (
              <div className="bg-surface-container-lowest p-12 sm:p-16 rounded-2xl border border-outline-variant/30 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-secondary mb-4">
                  <Search size={26} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-primary">No Sarees Found</h3>
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant mt-2 max-w-sm leading-relaxed">
                  We could not find any drapes matching your exact filter specifications. Try clearing your filters to view the full boutique catalog.
                </p>
                <button
                  onClick={clearFilters}
                  className="lak-button mt-6"
                >
                  <RotateCcw size={15} /> Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 sm:gap-8 ${
                  gridColumns === 2
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={onSelectProduct}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </section>
    </div>
  )
}
