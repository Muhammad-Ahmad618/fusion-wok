import { Category, Deal, MenuItem } from "@/types";

// Replace with data from Supabase later. Add `img` (Cloudinary URL) to any item to show a real photo.
export const categories: Category[] = [
  { id: "burgers", name: "Burgers", icon: "🍔" },
  { id: "pizza", name: "Pizza", icon: "🍕" },
  { id: "pasta", name: "Pasta", icon: "🍝" },
  { id: "drinks", name: "Drinks", icon: "🥤" },
  { id: "desserts", name: "Desserts", icon: "🍰" },
];

export const deals: Deal[] = [
  { tag: "MEGA DEAL", title: "Family Feast, Save 30%", text: "2 large pizzas, 4 burgers and a 1.5L drink for the whole family.", cta: "Order now", href: "#pizza", code: "FEAST30", emoji: "🍕" },
  { tag: "BUY 1 GET 1", title: "Burger Tuesdays", text: "Buy any signature burger and get a second one free, every Tuesday.", cta: "Grab the deal", href: "#burgers", code: "BOGO", emoji: "🍔" },
  { tag: "FREE DELIVERY", title: "Free delivery over Rs. 1,500", text: "Hot and fresh at your door in 30 minutes, or your dessert is on us.", cta: "Add a dessert", href: "#desserts", code: "Auto applied", emoji: "🛵" },
];

export const items: MenuItem[] = [
  { cat: "burgers", name: "Zinger Burger", desc: "Crispy chicken, spicy mayo, lettuce and cheese.", price: 450, emoji: "🍔", rate: 4.8, hot: true },
  { cat: "burgers", name: "Double Beef Smash", desc: "Two smashed patties, cheddar, pickles, house sauce.", price: 690, emoji: "🥩", rate: 4.9, hot: true },
  { cat: "burgers", name: "Classic Cheese", desc: "Juicy patty, melted cheese, tomato and onion.", price: 390, emoji: "🧀", rate: 4.5 },
  { cat: "burgers", name: "Crispy Fries", desc: "Golden fries with a pinch of masala salt.", price: 180, emoji: "🍟", rate: 4.6 },
  { cat: "pizza", name: "Fajita Pizza", desc: "Chicken fajita, peppers, onions and mozzarella.", price: 1050, emoji: "🍕", rate: 4.7, hot: true },
  { cat: "pizza", name: "Pepperoni Feast", desc: "Loaded pepperoni on a rich tomato base.", price: 1190, emoji: "🌶️", rate: 4.8, hot: true },
  { cat: "pizza", name: "Margherita", desc: "Fresh basil, tomato sauce and mozzarella.", price: 850, emoji: "🍅", rate: 4.4 },
  { cat: "pizza", name: "BBQ Chicken", desc: "Smoky BBQ sauce, chicken chunks and red onion.", price: 1120, emoji: "🍗", rate: 4.6 },
  { cat: "pasta", name: "Creamy Alfredo", desc: "Fettuccine in a garlic parmesan cream sauce.", price: 790, emoji: "🍝", rate: 4.7 },
  { cat: "pasta", name: "Spicy Arrabbiata", desc: "Penne in a fiery tomato and chilli sauce.", price: 720, emoji: "🌶️", rate: 4.5 },
  { cat: "pasta", name: "Baked Lasagna", desc: "Layers of pasta, beef ragu and cheese.", price: 890, emoji: "🧆", rate: 4.9, hot: true },
  { cat: "drinks", name: "Fresh Lemonade", desc: "Cool, tangy and made to order.", price: 220, emoji: "🍋", rate: 4.6 },
  { cat: "drinks", name: "Mint Margarita", desc: "Mint, lime and soda over crushed ice.", price: 260, emoji: "🍹", rate: 4.7 },
  { cat: "drinks", name: "Iced Latte", desc: "Chilled espresso with creamy milk.", price: 340, emoji: "🧋", rate: 4.5 },
  { cat: "desserts", name: "Molten Lava Cake", desc: "Warm chocolate cake with a gooey centre.", price: 480, emoji: "🍫", rate: 4.9, hot: true },
  { cat: "desserts", name: "Strawberry Cheesecake", desc: "Creamy, tangy and topped with berries.", price: 520, emoji: "🍰", rate: 4.8 },
  { cat: "desserts", name: "Ice Cream Sundae", desc: "Vanilla scoops, chocolate sauce and nuts.", price: 350, emoji: "🍨", rate: 4.6 },
];
