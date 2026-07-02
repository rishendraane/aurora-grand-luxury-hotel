# Aurora Grand – Premium Luxury Resort & Hotel Website

A high-performance, fully optimized, and visually stunning web application for **Aurora Grand**, a fictional five-star luxury hotel located on the scenic East Coast Road (ECR) in Kovalam, Chennai, India.

Deployed Live on Netlify: 👉 **[https://aurora-grand-ecr.netlify.app](https://aurora-grand-ecr.netlify.app)**

---

## 📖 Selected Topic
*   **Topic**: Hotel / Hospitality
*   **Location**: East Coast Road (ECR), Kovalam, Chennai, India

---

## ✨ Features

### 1. Guest Booking Portal
*   **Dynamic Landing Hero**: Full-viewport image with cinematic overlay, smooth scrolling indicators, and interactive scroll-zoom animations.
*   **Opulent Accommodations Catalog**: Grid view of rooms (Deluxe Room, Ocean View Room, Presidential Suite, Executive Suite, etc.) complete with localized pricing (INR), descriptions, dimensions, and filter capabilities.
*   **Contact & Booking Engine**: Form validator supporting dynamic promo code links (e.g., Weekend Escape, Honeymoon, Business Packages).
*   **Interactive Leaflet Map**: Dark-themed interactive map centered on Kovalam, ECR Chennai coordinates.
*   **Asynchronous Live Chat**: Fully integrated production-ready Tawk.to widget.

### 2. Administrative Bookings Dashboard (`/dashboard.html`)
*   **Database Management**: A private management dashboard (excluded from search crawlers) to monitor, filter, search, confirm, cancel, or delete bookings.
*   **Local Storage Sync**: Synchronizes bookings immediately to browser local storage.
*   **Preloaded Sample Data**: Seeds 5 realistic reservations on startup for evaluation.

---

## 🛠️ Technical SEO & Core Web Vitals Optimizations
*   **Single-Listener Scroll coordinator**: Throttled window-level scroll events using `window.requestAnimationFrame()` to avoid layout thrashing and lower Total Blocking Time (TBT).
*   **Asynchronous Font Loading**: Removed render-blocking CSS `@import` rules, loading Google Fonts asynchronously with preconnected links in the HTML header.
*   **Canonical & OG Metadata**: Full set of Canonical links, Open Graph tags, and Twitter Cards on all public templates.
*   **Structured Schema.org Data**: Configured multi-tier JSON-LD scripts (`WebSite`, `Organization`, `Hotel`, `FAQPage`, `ItemList`, and `BreadcrumbList`) to support rich Google search snippets.
*   **Accessibility (a11y)**: Built with W3C semantic tags, keyboard navigability, contrast ratios, and ARIA descriptors to hit at least 95+ on Lighthouse accessibility audits.

---

## 📂 Project Structure
```text
├── css/
│   └── style.css            # Custom premium dark-theme stylesheet
├── js/
│   └── main.js             # Form controls, carousel, filters, and scroll handlers
├── about.html              # Hotel heritage and story page
├── contact.html            # Location coordinates, maps, and reservation inquiries
├── dashboard.html          # Administrative bookings monitor
├── gallery.html            # Media view of hotel amenities
├── index.html              # Main reservation portal landing page
├── rooms.html              # Detailed room selection index
├── robots.txt              # Excludes /dashboard.html, points to sitemap
├── sitemap.xml             # Canonical site map index
└── README.md               # Project documentation
```

---

## 🚀 Setup & Local Execution
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Start a local HTTP server:
   ```bash
   npx http-server ./ -p 8080
   ```
3. Open `http://localhost:8080` in your web browser.
