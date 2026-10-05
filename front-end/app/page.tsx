import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import TrackOrderBanner from "@/components/order-tracking/TrackOrderBanner";
import { categories, deals, items } from "@/data/menu";

// SEO: tells Google the restaurant details. Update with the client's real info.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Fusion Wok",
  servesCuisine: ["Burgers", "Pizza", "Pasta"],
  address: { "@type": "PostalAddress", streetAddress: "123 Main Street", addressLocality: "Your City" },
  telephone: "+92 300 0000000",
  openingHours: ["Mo-Th 12:00-23:00", "Fr-Su 12:00-01:00"],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero deals={deals} />
      <TrackOrderBanner />
      <Menu categories={categories} items={items} />
    </>
  );
}
