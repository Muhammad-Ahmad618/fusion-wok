import { Category, Deal, MenuItem } from "@/types";

// Replace with data from Supabase later. Photos live in `public/images/menu` and are shown
// wherever an item/deal/category has an `img`; the `emoji` stays as the fallback.
const IMG = "/images/menu";

export const categories: Category[] = [
  { id: "wok", name: "Wok Stir-Fry", icon: "🥘", img: `${IMG}/kung-pao-chicken.jpg` },
  { id: "noodles", name: "Noodles", icon: "🍜", img: `${IMG}/chow-mein.jpg` },
  { id: "rice", name: "Fried Rice", icon: "🍚", img: `${IMG}/yangchow-fried-rice.jpg` },
  { id: "dimsum", name: "Dim Sum", icon: "🥟", img: `${IMG}/pork-dumplings.jpg` },
  { id: "drinks", name: "Drinks", icon: "🥤", img: `${IMG}/brown-sugar-milk-tea.jpg` },
  { id: "desserts", name: "Desserts", icon: "🍮", img: `${IMG}/mango-pudding.jpg` },
];

export const deals: Deal[] = [
  { tag: "MEGA DEAL", title: "Family Feast, Save 30%", text: "2 chow mein, 2 fried rice and a 1.5L drink for the whole family.", cta: "Order now", href: "#noodles", code: "FEAST30", emoji: "🥡", img: `${IMG}/hero-family-feast.jpg` },
  { tag: "BUY 1 GET 1", title: "Dim Sum Tuesdays", text: "Buy any dim sum platter and get a second one free, every Tuesday.", cta: "Grab the deal", href: "#dimsum", code: "BOGO", emoji: "🥟", img: `${IMG}/hero-dim-sum.jpg` },
  { tag: "FREE DELIVERY", title: "Free delivery over Rs. 1,500", text: "Hot and fresh at your door in 30 minutes, or your dessert is on us.", cta: "Add a dessert", href: "#desserts", code: "Auto applied", emoji: "🛵", img: `${IMG}/hero-chinese-takeout.jpg` },
];

export const items: MenuItem[] = [
  { cat: "wok", name: "Kung Pao Chicken", desc: "Diced chicken with peanuts, dried chillies and a savoury wok sauce.", price: 890, emoji: "🌶️", rate: 4.8, hot: true, img: `${IMG}/kung-pao-chicken.jpg` },
  { cat: "wok", name: "Sweet & Sour Chicken", desc: "Crispy chicken tossed in a tangy pineapple sweet & sour glaze.", price: 850, emoji: "🍍", rate: 4.7, hot: true, img: `${IMG}/sweet-sour-chicken.jpg` },
  { cat: "wok", name: "Mongolian Beef", desc: "Tender beef strips, spring onions and a rich soy-garlic sauce.", price: 980, emoji: "🥩", rate: 4.9, hot: true, img: `${IMG}/mongolian-beef.jpg` },
  { cat: "wok", name: "Szechuan Tofu", desc: "Silken tofu in a fiery, numbing Szechuan chilli sauce.", price: 720, emoji: "🌶️", rate: 4.5, img: `${IMG}/szechuan-tofu.jpg` },
  { cat: "noodles", name: "Chicken Chow Mein", desc: "Wok-tossed egg noodles with chicken, cabbage and soy.", price: 750, emoji: "🍜", rate: 4.7, hot: true, img: `${IMG}/chow-mein.jpg` },
  { cat: "noodles", name: "Beef Lo Mein", desc: "Soft egg noodles, seared beef and glazed peppers.", price: 820, emoji: "🥢", rate: 4.6, img: `${IMG}/lo-mein.jpg` },
  { cat: "noodles", name: "Dan Dan Noodles", desc: "Spicy minced pork, sesame and chilli oil over springy noodles.", price: 790, emoji: "🌶️", rate: 4.8, hot: true, img: `${IMG}/dan-dan-noodles.jpg` },
  { cat: "noodles", name: "Wonton Noodle Soup", desc: "Pork wontons and noodles in a light, savoury broth.", price: 680, emoji: "🍲", rate: 4.5, img: `${IMG}/wonton-noodle-soup.jpg` },
  { cat: "rice", name: "Egg Fried Rice", desc: "Classic wok-fried rice with egg, spring onion and soy.", price: 550, emoji: "🍚", rate: 4.6, img: `${IMG}/egg-fried-rice.jpg` },
  { cat: "rice", name: "Yangchow Fried Rice", desc: "Wok-fried rice with shrimp, BBQ pork, egg and peas.", price: 780, emoji: "🍤", rate: 4.7, hot: true, img: `${IMG}/yangchow-fried-rice.jpg` },
  { cat: "rice", name: "Chicken Fried Rice", desc: "Fluffy rice tossed with shredded chicken and vegetables.", price: 720, emoji: "🍗", rate: 4.5, img: `${IMG}/chicken-fried-rice.jpg` },
  { cat: "rice", name: "Shrimp Fried Rice", desc: "Juicy shrimp, egg and spring onion in a smoky wok flavour.", price: 750, emoji: "🦐", rate: 4.6, img: `${IMG}/shrimp-fried-rice.jpg` },
  { cat: "dimsum", name: "Pork Dumplings", desc: "Steamed pork and chive dumplings with dipping sauce.", price: 620, emoji: "🥟", rate: 4.8, hot: true, img: `${IMG}/pork-dumplings.jpg` },
  { cat: "dimsum", name: "Chicken Siu Mai", desc: "Open-top steamed dumplings topped with crab roe.", price: 650, emoji: "🥟", rate: 4.6, img: `${IMG}/chicken-siu-mai.jpg` },
  { cat: "dimsum", name: "Crispy Spring Rolls", desc: "Golden, crunchy rolls packed with cabbage and glass noodles.", price: 480, emoji: "🥠", rate: 4.5, img: `${IMG}/spring-rolls.jpg` },
  { cat: "dimsum", name: "Scallion Pancakes", desc: "Flaky, pan-fried layered flatbread with spring onion.", price: 420, emoji: "🫓", rate: 4.4, img: `${IMG}/scallion-pancakes.jpg` },
  { cat: "drinks", name: "Jasmine Green Tea", desc: "Freshly brewed fragrant jasmine tea.", price: 220, emoji: "🍵", rate: 4.6, img: `${IMG}/jasmine-tea.jpg` },
  { cat: "drinks", name: "Lychee Iced Tea", desc: "Sweet lychee tea over ice with fruit pieces.", price: 260, emoji: "🧋", rate: 4.7, img: `${IMG}/lychee-iced-tea.jpg` },
  { cat: "drinks", name: "Brown Sugar Milk Tea", desc: "Rich black tea with slow-cooked brown sugar syrup.", price: 320, emoji: "🥛", rate: 4.8, img: `${IMG}/brown-sugar-milk-tea.jpg` },
  { cat: "desserts", name: "Mango Pudding", desc: "Silky mango pudding with fresh mango pulp.", price: 380, emoji: "🥭", rate: 4.8, hot: true, img: `${IMG}/mango-pudding.jpg` },
  { cat: "desserts", name: "Sesame Balls", desc: "Crispy fried dough filled with sweet red bean paste.", price: 350, emoji: "🍩", rate: 4.6, img: `${IMG}/sesame-balls.jpg` },
  { cat: "desserts", name: "Fried Banana", desc: "Golden fried banana with honey drizzle.", price: 330, emoji: "🍌", rate: 4.5, img: `${IMG}/fried-banana.jpg` },
];
