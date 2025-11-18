import { Restaurant, Order, UserProfile } from './types';

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Burger & Beyond',
    image: 'https://picsum.photos/800/400?random=1',
    rating: 4.8,
    cuisine: 'American • Burgers',
    deliveryTime: '20-30 min',
    priceRange: '$$',
    categories: [
      {
        id: 'c1',
        name: 'Popular Items',
        items: [
          {
            id: 'm1',
            name: 'Classic Cheeseburger',
            description: 'Angus beef patty, american cheese, lettuce, tomato, secret sauce.',
            price: 12.50,
            image: 'https://picsum.photos/200/200?random=10',
            customizations: [
                { id: 'size', name: 'Size', type: 'radio', choices: [{id: 's', name: 'Single'}, {id: 'd', name: 'Double', price: 4}] },
                { id: 'extras', name: 'Extras', type: 'checkbox', choices: [{id: 'bacon', name: 'Bacon', price: 2}, {id: 'egg', name: 'Fried Egg', price: 1.5}] }
            ]
          }
        ]
      },
      {
        id: 'c2',
        name: 'Sides',
        items: [
          {
            id: 'm2',
            name: 'Truffle Fries',
            description: 'Crispy fries tossed with truffle oil and parmesan.',
            price: 6.00,
            image: 'https://picsum.photos/200/200?random=11'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Sushi Master',
    image: 'https://picsum.photos/800/400?random=2',
    rating: 4.9,
    cuisine: 'Japanese • Sushi',
    deliveryTime: '35-45 min',
    priceRange: '$$$',
    categories: [
        {
            id: 'c3',
            name: 'Rolls',
            items: [
                { id: 'm3', name: 'Spicy Tuna Roll', description: 'Fresh tuna, spicy mayo, cucumber.', price: 9.00, image: 'https://picsum.photos/200/200?random=12' }
            ]
        }
    ]
  },
  {
    id: '3',
    name: 'Pizza Paradiso',
    image: 'https://picsum.photos/800/400?random=3',
    rating: 4.5,
    cuisine: 'Italian • Pizza',
    deliveryTime: '25-40 min',
    priceRange: '$$',
    categories: []
  },
  {
    id: '4',
    name: 'Green Bowl',
    image: 'https://picsum.photos/800/400?random=4',
    rating: 4.7,
    cuisine: 'Healthy • Salads',
    deliveryTime: '15-25 min',
    priceRange: '$',
    categories: []
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-12345',
    restaurantName: 'Burger & Beyond',
    date: 'Oct 24, 2023 • 12:30 PM',
    status: 'Delivered',
    total: 24.50,
    items: ['Classic Cheeseburger x1', 'Truffle Fries x1', 'Coke Zero x1'],
    image: 'https://picsum.photos/100/100?random=1'
  },
  {
    id: 'ORD-67890',
    restaurantName: 'Sushi Master',
    date: 'Oct 20, 2023 • 7:15 PM',
    status: 'Delivered',
    total: 42.00,
    items: ['Spicy Tuna Roll x2', 'Salmon Sashimi x1'],
    image: 'https://picsum.photos/100/100?random=2'
  }
];

export const INITIAL_USER: UserProfile = {
  name: 'Alex Johnson',
  email: 'alex.j@example.com',
  phone: '(555) 123-4567',
  addresses: [
    { id: 'a1', label: 'Home', street: '123 Maple Avenue', city: 'Springfield', state: 'IL', zip: '62704' },
    { id: 'a2', label: 'Work', street: '456 Tech Blvd, Suite 200', city: 'Springfield', state: 'IL', zip: '62701' }
  ]
};
