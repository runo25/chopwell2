export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  cuisine: string;
  deliveryTime: string;
  priceRange: string;
  categories: MenuCategory[];
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  customizations?: CustomizationOption[];
}

export interface CustomizationOption {
  id: string;
  name: string;
  type: 'radio' | 'checkbox';
  choices: { id: string; name: string; price?: number }[];
}

export interface CartItem {
  uniqueId: string; // distinct from menuItemId to allow same item with diff options
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: Record<string, string | string[]>;
  totalPrice: number;
}

export interface Order {
  id: string;
  restaurantName: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Cancelled' | 'On the way';
  total: number;
  items: string[];
  image: string;
}

export interface Address {
  id: string;
  street: string;
  details?: string;
  city: string;
  state: string;
  zip: string;
  label: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}