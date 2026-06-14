# WoodCraft — Site Code Details

## 📁 Project Files

| File | Size | Purpose |
|---|---|---|
| [index.html](file:///c:/Users/MANAV/OneDrive/Desktop/New%20folder%20(2)/index.html) | 83 KB / 1,476 lines | Entire site — HTML + CSS + JS (all-in-one) |
| `style.css` | 27 KB | External stylesheet (not loaded by index.html currently) |
| `app.js` | 19 KB | External JS (not loaded by index.html currently) |
| `furniture_hero.png` | 871 KB | Hero background + center table product image |
| `furniture_sofa.png` | 797 KB | Sofa product image |
| `furniture_bedroom.png` | 801 KB | Bedroom/wardrobe product image |
| `furniture_dining.png` | 819 KB | Dining set product image |
| `furniture_office.png` | 853 KB | Office desk product image |
| `real_*.jpg / villa_*.png` | 178–1030 KB | Additional real/villa-themed photo assets |
| 34× `WhatsApp Image *.jpeg` | 74–276 KB | WhatsApp sourced product photos |
| `node_modules/`, `package.json` | — | Node dependencies (likely unused dev setup) |

> [!NOTE]
> The site is a **single-file build** — all CSS and JS are embedded inside `index.html`. The `style.css` and `app.js` files exist separately but are **not linked** in the current `<head>`.

---

## 🏗️ HTML Structure (Sections)

```
<head>          → Meta, fonts (Google Fonts), all inline CSS
<body>
  ├── .cursor / .cursor-ring       → Custom gold cursor
  ├── #loader                      → Animated page loader
  ├── .mmenu                       → Mobile fullscreen menu overlay
  ├── <nav>                        → Sticky navigation bar
  ├── #hero (section)              → Full-viewport hero
  │     ├── <canvas #heroCanvas>   → Particle animation
  │     ├── .hero-bg               → Background image (furniture_hero.png)
  │     └── .hero-c                → Headline + CTAs
  ├── .ticker-wrap                 → Scrolling marquee banner
  ├── #about (section)             → Gallery + story + stats
  ├── #collections (section)       → Filterable product grid
  ├── #promise (section)           → 5-icon promise band
  ├── #process (section)           → 4-step how-it-works
  ├── #testimonials (section)      → 3 customer review cards
  ├── #wa-hero (section)           → WhatsApp CTA section
  ├── #contact (section)           → Showroom info + enquiry form
  ├── <footer>                     → 4-column footer
  ├── #lb                          → Image lightbox overlay
  └── #waWidget                    → Floating WhatsApp FAB + chat popup
```

---

## 🎨 CSS Design System

### CSS Custom Properties (`:root`)
| Variable | Value | Used For |
|---|---|---|
| `--g1` | `#C9963B` | Primary gold |
| `--g2` | `#E8B862` | Light gold |
| `--g3` | `#9A7028` | Dark gold |
| `--dk` | `#120D05` | Page background |
| `--dk2` | `#1C140A` | Card / about bg |
| `--dk3` | `#261B0F` | Darker sections |
| `--dk4` | `#311F0D` | Deepest dark |
| `--tx` | `#F5EDE0` | Body text |
| `--mu` | `#9B876D` | Muted/secondary text |
| `--wa` | `#25D366` | WhatsApp green |
| `--wad` | `#128C7E` | WhatsApp dark green |
| `--accent1` | `#FF6B35` | Hot badge orange |
| `--accent2` | `#7B4FBE` | Purple accent |

### Typography
- **Headings**: `Playfair Display` (serif) — loaded from Google Fonts
- **Body**: `Inter` (sans-serif) — loaded from Google Fonts
- **Base font size**: `16px`

### Key CSS Animations
| Name | Effect |
|---|---|
| `ldPulse` | Loader logo opacity pulse |
| `ldFill` | Loader progress bar fill |
| `ldDot` | Loader bouncing dots |
| `heroZoom` | Hero bg slow zoom-out (14s) |
| `heroFadeUp` | Hero text fade+slide up |
| `wordSlide` | Individual word slide from bottom |
| `btnShine` | Shine sweep across CTA button |
| `ticker` | Infinite horizontal scroll marquee |
| `chipPulse` | Green pulse dot in hero badge |
| `treeSway` | Logo tree emoji gentle sway |
| `fabPulse` | WhatsApp FAB pulsing glow |
| `chatPop` | Chat popup spring-in animation |
| `bubbleIn` | Chat bubble slide-in |
| `badgePulse` | FAB notification badge scale pulse |
| `ringExpand` | WhatsApp section concentric rings |
| `waBig` | WhatsApp emoji rocking animation |

### Scroll Reveal Classes
```css
.rv    → fade up (opacity + translateY)
.rv-l  → fade from left (opacity + translateX)
.rv-r  → fade from right (opacity + translateX)
.go    → applied by IntersectionObserver to trigger animation
```

### Responsive Breakpoints
| Breakpoint | Changes |
|---|---|
| `≤1024px` | Nav links hidden → burger menu; About/Contact go single-column; steps 2-col |
| `≤640px` | Section padding reduced; footer 1-col; form 1-col; gallery 1-col |

---

## ⚡ JavaScript Features

### 1. Custom Cursor (`lines 1331–1339`)
- Gold dot (`#cur`) follows mouse exactly
- Gold ring (`#curR`) follows with `0.15` lerp smoothing via `requestAnimationFrame`
- Expands on hover over `a`, `button`, `.pcard`

### 2. Page Loader (`lines 1341–1344`)
- Hides loader `1600ms` after `window.load` by adding `.out` class (CSS fade+visibility)

### 3. Sticky Nav (`lines 1346–1348`)
- Adds `.solid` class (glassmorphism background) when `scrollY > 70px`

### 4. Mobile Menu (`lines 1350–1352`)
- `mm(1)` = open, `mm(0)` = close; toggles `.open` on `#mmenu`

### 5. Hero Particle Canvas (`lines 1354–1388`)
- 80 gold particles with random velocity
- Draws connecting lines between particles `< 100px` apart
- Fully responsive (resizes with window)

### 6. Scroll Reveal (`lines 1390–1394`)
- `IntersectionObserver` with `threshold: 0.1`
- Adds `.go` class with `60ms` staggered delay per element

### 7. Counter Animation (`lines 1396–1417`)
- Counts from 0 → target over ~2 seconds
- Triggers once when `.stats-row` enters viewport
- Auto-appends `+` for ≥1000, `%` for 98

### 8. Product Filter (`lines 1419–1432`)
- Filters `.pcard` by `data-cat` attribute
- Fades grid out → updates visibility → fades back in
- Active tab gets `.on` class

### 9. Image Lightbox (`lines 1433–1437`)
- `openLB(src, caption)` — shows `#lb` overlay with full image
- `closeLB()` — hides it; also closes on backdrop click & `Escape` key

### 10. WhatsApp Chat Widget (`lines 1438–1445`)
- `toggleChat()` toggles `.show` on `#waChat`
- Auto-opens after 8 seconds on page load

### 11. Form Submission (`lines 1446–1462`)
- Validates Name + Phone fields
- Pre-fills WhatsApp message with name, phone, category, requirements
- Opens `wa.me/917738615497` with URL-encoded message

---

## 🛒 Product Catalogue

| Product | Category | Price | Image |
|---|---|---|---|
| Royal Walnut Sofa Set | Living Room | ₹85,000 onwards | `furniture_sofa.png` |
| Marble Top Center Table | Living Room | ₹28,000 onwards | `furniture_hero.png` |
| Heritage King Bed | Bedroom | ₹1,20,000 set | `furniture_bedroom.png` |
| Grand Teak Dining Set | Dining | ₹75,000 set | `furniture_dining.png` |
| Executive L-Shape Desk | Office | ₹42,000 onwards | `furniture_office.png` |
| 6-Door Mirror Wardrobe | Bedroom | ₹65,000 onwards | `furniture_bedroom.png` |

Each card has:
- Badge: `Bestseller` / `New Arrival` / `🔥 Popular`
- Hover zoom on image with 🔍 overlay
- Click → opens lightbox
- WhatsApp Enquire button with **pre-filled product-specific message**

---

## 📞 Business Contact Details

| Field | Value |
|---|---|
| **WhatsApp Number** | `+91 7738615497` |
| **wa.me link** | `https://wa.me/917738615497` |
| **Showroom Address** | Shop No. 12, Furniture Market, Mumbai – 400001, Maharashtra |
| **Hours** | Mon–Sat: 10AM–8PM \| Sun: 11AM–6PM |
| **Delivery Zone** | Mumbai, Thane & Pune (Free delivery + install) |

### WhatsApp Deep-Link Messages Used
| Trigger | Pre-filled text |
|---|---|
| Nav "WhatsApp Us" | `Hello WoodCraft! I'd like to enquire.` |
| Hero "Chat Now" | `Hello! I'd like to enquire about furniture.` |
| Product card Enquire | `Hi! I'm interested in [Product Name]. Please share details & price.` |
| WA Hero main button | `Hello WoodCraft! I'd like to enquire about your furniture collections.` |
| Sofa Quote shortcut | `Hi! I need a sofa set quote. My living room is...` |
| Bedroom Set shortcut | `Hi! I need a complete bedroom set quote.` |
| Custom Order shortcut | `Hi! I want a custom furniture design for my home.` |
| Visit Showroom shortcut | `Hi! What are your showroom timings and address?` |
| Form submission | Dynamically built from form fields |

---

## 🗺️ Section ID Map (for `href` anchors)

| Section ID | Nav Label |
|---|---|
| `#hero` | — (logo link) |
| `#about` | About |
| `#collections` | Collections |
| `#promise` | — (no nav link) |
| `#process` | Process |
| `#testimonials` | Reviews |
| `#wa-hero` | — (no nav link) |
| `#contact` | Contact |

---

## 📊 File Stats Summary

| Metric | Value |
|---|---|
| Total HTML lines | 1,476 |
| Total file size | 83.4 KB |
| CSS lines (inline) | ~793 lines (L11–L793) |
| HTML body lines | ~500 lines (L795–L1329) |
| JS lines (inline) | ~146 lines (L1330–L1476) |
| External image assets | 5 PNG furniture images |
| WhatsApp integrations | 12+ unique CTA links |
| CSS animations defined | 18 keyframe animations |
| JS IntersectionObservers | 2 (scroll reveal + counter) |
