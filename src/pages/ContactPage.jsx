// LAK SAREES — Contact & VIP Concierge Suite
// Includes verified form validation, studio information placeholders, and WhatsApp concierge

import React, { useState } from 'react'
import { useStore } from '../context/StoreContext'
import {
  MessageCircle, Phone, Mail, MapPin, Send, CheckCircle,
  Video, Calendar, Clock, Sparkles
} from 'lucide-react'

export const ContactPage = () => {
  const { showToast } = useStore()
  const WHATSAPP_NUMBER = '919876543210'

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Bridal Video Shopping',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please provide your name'
    if (!form.email.trim() || !form.email.includes('@')) errs.email = 'Valid email required'
    if (!form.phone.trim()) errs.phone = 'Contact phone number required'
    if (!form.message.trim()) errs.message = 'Please tell us what you are looking for'

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setSubmitted(true)
    showToast('Your inquiry has been received by our head draper. We will reach out shortly.')
  }

  return (
    <div className="flex flex-col w-full bg-surface py-12 lg:py-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-secondary font-bold">
            Personal Atelier Assistance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-primary font-bold mt-2">
            Connect with LAK SAREES
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-3 leading-relaxed">
            Whether booking an exclusive video trousseau viewing or seeking custom blouse styling advice, our master drapers are delighted to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Contact Cards & WhatsApp (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* WhatsApp Priority Card */}
            <div className="p-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 shadow-xs flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-black flex items-center justify-center font-bold">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-primary">Instant WhatsApp Concierge</h3>
                  <p className="text-[11px] text-on-surface-variant">Live drape videos &amp; immediate motif photos</p>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Connect with our concierge team on WhatsApp for real-time video clips, drape recommendations, and delivery confirmations.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  'Namaste LAK Sarees! I would like to inquire about your handloom saree collection.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#20ba59] transition-colors shadow"
              >
                <MessageCircle size={15} /> Chat with Concierge Now
              </a>
            </div>

            {/* Atelier Information Card */}
            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-primary border-b border-outline-variant/30 pb-3">
                Atelier Placeholders
              </h3>

              <div className="flex items-start gap-3 text-xs text-on-surface-variant">
                <MapPin size={16} className="text-secondary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-primary block">Flagship Atelier &amp; Loom House</span>
                  <span>24 Palace Heritage Enclave, Near Ganges Ghats, Varanasi, UP 221001</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-on-surface-variant">
                <Phone size={16} className="text-secondary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-primary block">Telephone Line</span>
                  <span>+91 98765 43210 (10:00 AM – 8:00 PM IST)</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-on-surface-variant">
                <Mail size={16} className="text-secondary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-primary block">Electronic Correspondence</span>
                  <span>concierge@laksarees.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Booking Form (7 cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-outline-variant/30 shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-50 text-green-700 flex items-center justify-center mx-auto">
                  <CheckCircle size={32} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-primary">Inquiry Dispatched</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                  Thank you, {form.name}. Our head draper will contact you via WhatsApp / email within 2 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="lak-button mt-4"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary">Schedule a Consultation</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Fill out the form below to book a live video drape viewing or submit custom queries.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      Full Name *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Radhika Sharma"
                      className={`w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary ${
                        errors.name ? 'border border-red-500' : ''
                      }`}
                    />
                    {errors.name && <p className="text-[10px] text-red-600 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      Email Address *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@domain.com"
                      className={`w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary ${
                        errors.email ? 'border border-red-500' : ''
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      Phone Number (+91) *
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="98765 43210"
                      className={`w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary ${
                        errors.phone ? 'border border-red-500' : ''
                      }`}
                    />
                    {errors.phone && <p className="text-[10px] text-red-600 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      Inquiry Category
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
                    >
                      <option>Bridal Video Shopping Appointment</option>
                      <option>Custom Blouse Tailoring Consultation</option>
                      <option>Specific Saree Motif Availability</option>
                      <option>Bulk Trousseau Gifting Inquiry</option>
                      <option>International Shipping Query</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      Your Message or Preferred Timings *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Please let us know which colors, fabrics, or celebration dates you are preparing for..."
                      className={`w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary resize-none ${
                        errors.message ? 'border border-red-500' : ''
                      }`}
                    />
                    {errors.message && <p className="text-[10px] text-red-600 mt-1">{errors.message}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="lak-button w-full justify-center py-3.5 mt-2"
                >
                  <Send size={15} /> Submit Concierge Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
