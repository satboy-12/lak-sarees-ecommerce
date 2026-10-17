# LAK SAREES — Flagship Haute Handlooms E-Commerce Platform

A luxury Indian saree boutique web application crafted for **LAK SAREES**, conforming to the **Royal Heritage Couture** design system.

---

## ✦ Luxury Design System

- **Background:** Warm Silk Cream (`#fff8f8` / `#F7F0E8` / `#FCF9F5`)
- **Primary:** Royal Maroon (`#68182B` & `#4A0117`)
- **Accent:** Antique Metallic Gold (`#C6A15B` / `#D4AF37` / `#775A1A`)
- **Typography:**
  - Headings & Titles: `Playfair Display` (High vertical stroke contrast, soft regal curves)
  - Body & Specifications: `Plus Jakarta Sans` / `DM Sans` (Clean, whisper-quiet readability)
  - Icons: Material Symbols Outlined & Lucide React
- **Craftsmanship Accents:** 100% Silk Mark certified seals, gold filigree hairlines, pure tested zari authentication, and keepsake chest packaging.

---

## ✦ Features & Pages

1. **Flagship Home (`/` or `/#collections`)**
   - High-fashion editorial hero with authentic Indian bridal imagery.
   - Trust Badges: 100% Silk Mark Certified, Handloom Guild Pit Looms, Global Insured Delivery.
   - Curated Handloom Edits: Pure Kanchipuram, Banarasi Couture, Chanderi & Tussar, Soft Silk, Everyday Cotton.
   - Featured Saree showcase with instant Quick Look and Bag actions.
   - Brand story vignette honoring ancestral Varanasi & Kanchipuram weavers.
   - Signature Keepsake rigid unboxing presentation.
   - Patron testimonials & VIP Live Video Shopping appointment booking.

2. **Shop / Collections Catalog (`/store` or `/shop`)**
   - Multi-facet filter sidebar: Filter by Weave Category, Occasion, Price Range, and Silk Mark toggle.
   - Real-time search query matching product title, SKU, fabric, and color.
   - Sorting by Featured, Price Low to High, Price High to Low, and Vault Availability.
   - 3-Column Luxury Grid vs 2-Column Wide Editorial Grid toggle.
   - Empty state with 1-click filter reset.

3. **Product Details (`/product?id=...`)**
   - Multi-angle gallery with thumbnail strip.
   - Govt. of India 100% Silk Mark certification badge.
   - Artisan Days Tag (e.g., *38 Days Kadwa Handloom*).
   - Master Weaver Heritage Vignette with workshop cluster details.
   - Blouse Customization selector:
     - **Unstitched Piece** (0.8m brocade silk included — Complimentary)
     - **Made-to-Measure** (Tailored with pure silk lining)
   - Stock counter & quantity selector.
   - Direct WhatsApp Consultation button with pre-filled product query.
   - Complete technical specifications: Fabric, Zari Purity, Origin, Technique, and Care instructions.
   - Curated pairings / Related products.

4. **Artisanal Shopping Bag Drawer**
   - Slide-out drawer with verified item thumbnails, quantities, blouse choices, and subtotals.
   - Real-time stock validation preventing orders beyond available vault pieces.
   - Complimentary insured pan-India delivery summary.
   - Direct Proceed to Checkout CTA.

5. **Simulated Demo Checkout (`/checkout`)**
   - 3-Step Progress Stepper: Bag Review → Delivery & Details → Payment.
   - Customer information with real-time validation (Name, Email, 10-digit Phone).
   - Shipping destination with 6-digit Indian postal PIN code validation.
   - Explicit **DEMO PAYMENT MODE** banner preventing accidental real credential submission.
   - Options: Simulated Instant UPI (Demo), Simulated Net Banking (Demo), Cash on Delivery (Demo).
   - Order summary with item breakdown and verified pricing.

6. **Order Confirmation (`/order-confirmation`)**
   - Generates unique reference code (e.g., `LAK-ORD-2026-88029`).
   - Clear banner stating demo status and test nature of transaction.
   - Complete itemized receipt, delivery address, and Print Receipt action.
   - Direct link to inspect order in Admin Console.

7. **Our Story & Heritage (`/about`)**
   - Editorial brand manifesto and pillars of craftsmanship.
   - Banarasi and Kanchipuram loom lineage and fair weaver guild support.

8. **Contact & Atelier Concierge (`/contact`)**
   - Working interactive consultation form with field validation.
   - Direct WhatsApp Concierge button (`+91 98765 43210`).
   - Atelier hours and location placeholders.

9. **Patron Authentication (`AuthModal`)**
   - Customer sign-in, registration, and password recovery.
   - Fast 1-Click Demo Evaluation buttons:
     - **Sign in as Patron (Customer)**
     - **Sign in as Master Draper (Admin Console)**

10. **Protected Staff Admin Console (`/admin`)**
    - Security clearance guard preventing public customer access.
    - Security ribbon: Staff Session Active, Role: Senior Curator & Inventory Custodian, 2FA Cryptographic Seal.
    - 4 Bento KPI Cards: Simulated Gross Acquisition, Active Fulfilments, Vault Handloom Stock, Patron Appointments.
    - Sales Acquisition Velocity trajectory chart.
    - **Saree Vault**: Add new bespoke saree modal, live stock adjustment inputs, retire product.
    - **Order Manifests**: Filter by status (Processing, Dispatched, Delivered, Cancelled), search by order ref or patron name, and live fulfillment status updater.

---

## ✦ Getting Started on Windows (Beginner-Friendly)

### 1. Requirements
- Windows 10 or 11
- Node.js (v18, v20, or v22+ LTS installed from [nodejs.org](https://nodejs.org/))
- VS Code (or your preferred editor)

### 2. Run Locally
Open PowerShell or Command Prompt in the project folder:

```powershell
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev
```

Open your browser at:
`http://localhost:5173/`

### 3. Build for Production
To test the production compilation:

```powershell
npm run build
npm run preview
```

---

## ✦ Connecting Firebase (When Ready for Production)

This project runs out of the box in **Offline Demo Mode** using browser-persistent storage (`localStorage`). When you are ready to connect Google Cloud Firebase:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password & Google).
3. Enable **Cloud Firestore** and deploy the provided `firestore.rules`.
4. Copy `.env.example` to `.env`:
   ```powershell
   copy .env.example .env
   ```
5. Replace the placeholder values in `.env` with your Firebase project keys:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=lak-sarees.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=lak-sarees-boutique
   VITE_FIREBASE_STORAGE_BUCKET=lak-sarees.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:...
   ```
6. Restart your dev server (`npm run dev`). The application will automatically detect the Firebase keys.

---

## ✦ Deploying to GitHub & Vercel

### Step 1: Push to GitHub
In PowerShell, run:

```powershell
git init
git add .
git commit -m "feat: complete LAK SAREES luxury boutique and staff console"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lak-sarees-boutique.git
git push -u origin main
```

*(Note: `.env` is automatically ignored in `.gitignore` to protect all credentials.)*

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
2. Click **"Add New Project"** → Import your `lak-sarees-boutique` repository.
3. Framework Preset: **Vite** (auto-detected).
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. (Optional) In **Environment Variables**, add the `VITE_FIREBASE_*` variables if using Firebase.
7. Click **Deploy**. Vercel will build and assign your live production URL (e.g. `https://lak-sarees.vercel.app`).
