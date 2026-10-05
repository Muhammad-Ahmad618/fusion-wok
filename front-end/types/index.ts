export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Deal {
  tag: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  code: string;
  emoji: string;
}

export interface MenuItem {
  cat: string;
  name: string;
  desc: string;
  price: number;
  emoji: string;
  rate: number;
  hot?: boolean;
  img?: string;
}
