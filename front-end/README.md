# Fusion Wok (Next.js + Tailwind)

## Run it
    npm install
    npm run dev      # http://localhost:3000

## Where things are
- data/menu.js: categories, deals and food items (swap for Supabase data later)
- components/: Header (theme switch + cart count), Hero (deals slider), Menu (tabs, hot items, sections), ItemCard, Footer
- tailwind.config.js: brand red colours

## Real images
Upload photos to Cloudinary, then add the URL to an item in data/menu.js:
    { name: "Zinger Burger", ..., img: "https://res.cloudinary.com/<cloud>/image/upload/burger.jpg" }
Items without `img` show the emoji.

## Deploy
Use Cloudflare Pages or Netlify (Vercel's free plan is non-commercial only).
