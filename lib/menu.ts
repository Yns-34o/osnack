export type Category = 'sandwichs' | 'burgers' | 'sides' | 'boissons';

export interface Product {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  category: Category;
  tag?: string;
}

export const CATEGORY_LABELS: Record<Category | 'all', string> = {
  all: 'Tout',
  sandwichs: 'Sandwichs au four',
  burgers: 'Burgers signatures',
  sides: 'Sides & Desserts',
  boissons: 'Boissons',
};

export const MENU: Product[] = [
  // ---- Sandwichs au four ----
  {
    id: 'le-torcy',
    name: "Le Torcy",
    desc: "Pain au four, poulet fermier grillé, mozzarella fondante, tomate, basilic, sauce maison.",
    price: 8.5,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80',
    category: 'sandwichs',
    tag: 'Signature',
  },
  {
    id: 'litalien',
    name: "L'Italien",
    desc: "Jambon cru, roquette, tomate séchée, pesto verde et parmesan. Le goût de l'Italie.",
    price: 9.5,
    image: 'https://images.unsplash.com/photo-1539252554935-80c8cb536cbb?w=800&auto=format&fit=crop&q=80',
    category: 'sandwichs',
  },
  {
    id: 'le-gourmand',
    name: 'Le Gourmand',
    desc: "Viande hachée épicée, oignons confits, cheddar et sauce barbecue. Cot solide garanti.",
    price: 9.0,
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&auto=format&fit=crop&q=80',
    category: 'sandwichs',
    tag: 'Épicé',
  },

  // ---- Burgers signatures ----
  {
    id: 'o-classic',
    name: "O'Classic",
    desc: "Steak 150 g, cheddar fondu, salade, tomate, oignons rouges, sauce maison.",
    price: 10.5,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    category: 'burgers',
    tag: 'Best-seller',
  },
  {
    id: 'le-double',
    name: 'Le Double',
    desc: "Double steak, double cheddar, bacon croustillant, oignons confits. Pour les grosses faims.",
    price: 13.0,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80',
    category: 'burgers',
  },
  {
    id: 'le-spicy',
    name: 'Le Spicy',
    desc: "Steak, pepper jack, jalapeños, sauce piquante maison. Pour qui aime le piment.",
    price: 11.5,
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&auto=format&fit=crop&q=80',
    category: 'burgers',
    tag: 'Épicé',
  },

  // ---- Sides & Desserts ----
  {
    id: 'frites-maison',
    name: 'Frites Maison',
    desc: "Coupe généreuse de frites fraîches, croustillantes, sel de mer. Cuites minute.",
    price: 3.5,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&auto=format&fit=crop&q=80',
    category: 'sides',
    tag: 'Fait maison',
  },
  {
    id: 'onion-rings',
    name: 'Onion Rings',
    desc: "Beignets d'oignons dorés, panure croustillante, sauce maison à l'oignon.",
    price: 4.5,
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=800&auto=format&fit=crop&q=80',
    category: 'sides',
  },
  {
    id: 'fondant-chocolat',
    name: 'Fondant Chocolat',
    desc: "Cœur coulant au chocolat noir, glace vanille de Madagascar. Le final parfait.",
    price: 5.5,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    category: 'sides',
    tag: 'Dessert',
  },

  // ---- Boissons ----
  {
    id: 'coca-cola',
    name: 'Coca-Cola',
    desc: "33 cl, bien frais. L'accompagnement classique du burger.",
    price: 2.5,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&auto=format&fit=crop&q=80',
    category: 'boissons',
  },
  {
    id: 'eau-minerale',
    name: 'Eau Minérale',
    desc: "50 cl, plate ou pétillante. Source naturelle.",
    price: 2.0,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf40?w=800&auto=format&fit=crop&q=80',
    category: 'boissons',
  },
  {
    id: 'citronnade',
    name: 'Citronnade Maison',
    desc: "Pressée du jour, citrons frais, une touche de menthe. Désaltérante.",
    price: 3.5,
    image: 'https://images.unsplash.com/photo-1438638531655-25cb4c1f0d3e?w=800&auto=format&fit=crop&q=80',
    category: 'boissons',
    tag: 'Maison',
  },
];

export const countByCategory = (cat: Category | 'all'): number =>
  cat === 'all' ? MENU.length : MENU.filter((p) => p.category === cat).length;

export const CATEGORIES: (Category | 'all')[] = ['all', 'sandwichs', 'burgers', 'sides', 'boissons'];
