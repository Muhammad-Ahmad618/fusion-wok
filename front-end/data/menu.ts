import { Category, Deal, MenuItem } from "@/types";

// Replace with data from Supabase later. Add `img` (Cloudinary URL) to any item to show a real photo.
export const categories: Category[] = [
  { id: "wok", name: "Wok Stir-Fry", icon: "🥘" },
  { id: "noodles", name: "Noodles", icon: "🍜" },
  { id: "rice", name: "Fried Rice", icon: "🍚" },
  { id: "dimsum", name: "Dim Sum", icon: "🥟" },
  { id: "drinks", name: "Drinks", icon: "🥤" },
  { id: "desserts", name: "Desserts", icon: "🍮" },
];

export const deals: Deal[] = [
  { tag: "MEGA DEAL", title: "Family Feast, Save 30%", text: "2 chow mein, 2 fried rice and a 1.5L drink for the whole family.", cta: "Order now", href: "#noodles", code: "FEAST30", emoji: "🥡" },
  { tag: "BUY 1 GET 1", title: "Dim Sum Tuesdays", text: "Buy any dim sum platter and get a second one free, every Tuesday.", cta: "Grab the deal", href: "#dimsum", code: "BOGO", emoji: "🥟" },
  { tag: "FREE DELIVERY", title: "Free delivery over Rs. 1,500", text: "Hot and fresh at your door in 30 minutes, or your dessert is on us.", cta: "Add a dessert", href: "#desserts", code: "Auto applied", emoji: "🛵" },
];

export const items: MenuItem[] = [
  { cat: "wok", name: "Kung Pao Chicken", desc: "Diced chicken with peanuts, dried chillies and a savoury wok sauce.", price: 890, emoji: "🌶️", rate: 4.8, hot: true },
  { cat: "wok", name: "Sweet & Sour Chicken", desc: "Crispy chicken tossed in a tangy pineapple sweet & sour glaze.", price: 850, emoji: "🍍", rate: 4.7, hot: true },
  { cat: "wok", name: "Mongolian Beef", desc: "Tender beef strips, spring onions and a rich soy-garlic sauce.", price: 980, emoji: "🥩", rate: 4.9, hot: true },
  { cat: "wok", name: "Szechuan Tofu", desc: "Silken tofu in a fiery, numbing Szechuan chilli sauce.", price: 720, emoji: "🌶️", rate: 4.5 },
  { cat: "noodles", name: "Chicken Chow Mein", desc: "Wok-tossed egg noodles with chicken, cabbage and soy.", price: 750, emoji: "🍜", rate: 4.7, hot: true },
  { cat: "noodles", name: "Beef Lo Mein", desc: "Soft egg noodles, seared beef and glazed peppers.", price: 820, emoji: "🥢", rate: 4.6 },
  { cat: "noodles", name: "Dan Dan Noodles", desc: "Spicy minced pork, sesame and chilli oil over springy noodles.", price: 790, emoji: "🌶️", rate: 4.8, hot: true },
  { cat: "noodles", name: "Wonton Noodle Soup", desc: "Pork wontons and noodles in a light, savoury broth.", price: 680, emoji: "🍲", rate: 4.5 },
  { cat: "rice", name: "Egg Fried Rice", desc: "Classic wok-fried rice with egg, spring onion and soy.", price: 550, emoji: "🍚", rate: 4.6 },
  { cat: "rice", name: "Yangchow Fried Rice", desc: "Wok-fried rice with shrimp, BBQ pork, egg and peas.", price: 780, emoji: "🍤", rate: 4.7, hot: true },
  { cat: "rice", name: "Chicken Fried Rice", desc: "Fluffy rice tossed with shredded chicken and vegetables.", price: 720, emoji: "🍗", rate: 4.5 },
  { cat: "rice", name: "Shrimp Fried Rice", desc: "Juicy shrimp, egg and spring onion in a smoky wok flavour.", price: 750, emoji: "🦐", rate: 4.6 },
  { cat: "dimsum", name: "Pork Dumplings", desc: "Steamed pork and chive dumplings with dipping sauce.", price: 620, emoji: "🥟", rate: 4.8, hot: true },
  { cat: "dimsum", name: "Chicken Siu Mai", desc: "Open-top steamed dumplings topped with crab roe.", price: 650, emoji: "🥟", rate: 4.6 },
  { cat: "dimsum", name: "Crispy Spring Rolls", desc: "Golden, crunchy rolls packed with cabbage and glass noodles.", price: 480, emoji: "🥠", rate: 4.5 },
  { cat: "dimsum", name: "Scallion Pancakes", desc: "Flaky, pan-fried layered flatbread with spring onion.", price: 420, emoji: "🫓", rate: 4.4 },
  { cat: "drinks", name: "Jasmine Green Tea", desc: "Freshly brewed fragrant jasmine tea.", price: 220, emoji: "🍵", rate: 4.6 },
  { cat: "drinks", name: "Lychee Iced Tea", desc: "Sweet lychee tea over ice with fruit pieces.", price: 260, emoji: "🧋", rate: 4.7 },
  { cat: "drinks", name: "Brown Sugar Milk Tea", desc: "Rich black tea with slow-cooked brown sugar syrup.", price: 320, emoji: "🥛", rate: 4.8 },
  { cat: "desserts", name: "Mango Pudding", desc: "Silky mango pudding with fresh mango pulp.", price: 380, emoji: "🥭", rate: 4.8, hot: true },
  { cat: "desserts", name: "Sesame Balls", desc: "Crispy fried dough filled with sweet red bean paste.", price: 350, emoji: "🍩", rate: 4.6 },
  { cat: "desserts", name: "Fried Banana", desc: "Golden fried banana with honey drizzle.", price: 330, emoji: "🍌", rate: 4.5 },
];
