# Fusion Wok 🍴

A minimal restaurant ordering website — browse the menu, add items to a cart, and check out as a guest. No customer accounts, no login for ordering. Built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

This is a front-end demo: there's no backend wired up yet, so the menu is sample data and orders aren't actually saved anywhere.

## Why no accounts

The goal is to keep ordering frictionless — no sign-up, no password, just a name, phone number and delivery address at checkout. The admin side (managing orders and the menu) will get a simple login later, but that's a separate concern from customer ordering.

## Tech stack

- **Next.js** (App Router) — pages and routing
- **TypeScript** — typed components and data
- **Tailwind CSS** — styling, with a custom red/white brand theme and dark mode support
- **Planned:** [Supabase](https://supabase.com) (menu + orders database, free tier) and [Cloudinary](https://cloudinary.com) (food photos, free tier) — not connected yet

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Status | Description |
|---|---|---|
| `/` | ✅ Built | Landing page — deals hero, category tabs, hot items, full menu |
| `/cart` | ✅ Built | Cart with quantity controls, subtotal, delivery fee, and a free-delivery threshold |
| `/checkout` | ✅ Built | Guest checkout — name, phone, address, cash-on-delivery, order summary |
| `/order-tracking` | ✅ Built | order tracking page, with order detail and receipt print feature | 
| Admin pages | 🚧 Not started | Login, orders dashboard, menu management — separate from the customer site |

## Project structure

```
app/
  layout.tsx          # root layout, fonts, light/dark theme bootstrap
  page.tsx             # landing page
  cart/page.tsx         # cart page
  checkout/page.tsx      # checkout page
components/
  CartContext.tsx       # cart state: add, remove, change quantity, clear
  Header.tsx            # sticky header, theme switcher, cart count
  Hero.tsx              # deals slider
  Menu.tsx              # category tabs + menu sections + hot items
  ItemCard.tsx           # single menu item card
  Footer.tsx             # site footer
data/
  menu.js               # categories, deals and menu items (sample data)
```

## Cart and checkout

- Cart state lives in React context (`CartContext`) and resets on page refresh — there's no persistence yet.
- Checkout validates name, phone (Pakistani mobile format), and address, then shows an order confirmation with a generated order ID. Nothing is saved to a database yet; the code marks exactly where a Supabase insert will go.
- Payment is cash-on-delivery only for now. A card option is shown in the UI but disabled.

## Theming

- Brand colors (`brand`, `brand-dark`, `brand-tint`) are defined in `tailwind.config.js`.
- The site defaults to light mode. A theme switcher in the header toggles dark mode and remembers the choice in `localStorage`.

## Images

Menu items use an emoji by default. To show a real photo, add an `img` field with a Cloudinary URL to any item in `data/menu.js`:

```js
{ name: "Zinger Burger", ..., img: "https://res.cloudinary.com/<cloud>/image/upload/burger.jpg" }
```

## Roadmap

- [ ] Order tracking (`/track`, `/order/[id]`)
- [ ] Connect Supabase for menu data and order storage
- [ ] Connect Cloudinary for real food photos
- [ ] Cart drawer on the landing page
- [ ] Admin login + dashboard (orders, menu management)
- [ ] SEO: structured data, sitemap, server-rendered menu data

## Deployment

Deploy to **Cloudflare Pages** or **Netlify**. Vercel's free tier is for non-commercial use only, so it isn't a good fit for a live restaurant site unless you're on a paid plan.

## License

Private project — not licensed for reuse.
