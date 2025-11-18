import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { CartItem, MenuItem, UserProfile, Address } from '../types';
import { INITIAL_USER } from '../constants';

interface Notification {
    message: string;
    type: 'success' | 'error' | 'info';
    id: number;
}

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity: number, options: Record<string, any>) => void;
  removeFromCart: (uniqueId: string) => void;
  updateQuantity: (uniqueId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  
  // User
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string) => void;
  logout: () => void;
  addAddress: (address: Address) => void;
  updateUser: (data: Partial<UserProfile>) => void;

  // UI
  notification: Notification | null;
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideNotification: () => void;
  
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children?: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null); // Start logged out for demo flow
  const [notification, setNotification] = useState<Notification | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Toggle Theme
  const toggleTheme = () => {
      setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Apply theme class to html element
  useEffect(() => {
      if (theme === 'dark') {
          document.documentElement.classList.add('dark');
      } else {
          document.documentElement.classList.remove('dark');
      }
  }, [theme]);

  const addToCart = (item: MenuItem, quantity: number, options: Record<string, any>) => {
    const uniqueId = `${item.id}-${Date.now()}`;
    
    // Calculate base price + options price
    let itemTotal = item.price;
    
    // Simulating option costs:
    let optionsCost = 0;
    if(item.customizations) {
         item.customizations.forEach(cust => {
             if(cust.type === 'radio') {
                 const choice = cust.choices.find(c => c.id === options[cust.id]);
                 if(choice?.price) optionsCost += choice.price;
             } else if (cust.type === 'checkbox') {
                 const selectedIds = options[cust.id] as string[] || [];
                 selectedIds.forEach(sid => {
                     const choice = cust.choices.find(c => c.id === sid);
                     if(choice?.price) optionsCost += choice.price;
                 });
             }
         });
    }

    const finalUnitPrice = itemTotal + optionsCost;

    setCart(prev => [...prev, {
      uniqueId,
      menuItem: item,
      quantity,
      selectedOptions: options,
      totalPrice: finalUnitPrice * quantity
    }]);
  };

  const removeFromCart = (uniqueId: string) => {
    setCart(prev => prev.filter(item => item.uniqueId !== uniqueId));
  };

  const updateQuantity = (uniqueId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.uniqueId === uniqueId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        const unitPrice = item.totalPrice / item.quantity;
        return { ...item, quantity: newQuantity, totalPrice: unitPrice * newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const login = (email: string) => {
    setUser({ ...INITIAL_USER, email });
  };

  const logout = () => {
    setUser(null);
  };

  const addAddress = (address: Address) => {
    if (user) {
      setUser({ ...user, addresses: [...user.addresses, address] });
    }
  };

  const updateUser = (data: Partial<UserProfile>) => {
      if(user) {
          setUser({...user, ...data});
      }
  };

  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
      setNotification({ message, type, id: Date.now() });
  }, []);

  const hideNotification = () => setNotification(null);

  return (
    <StoreContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal,
      user, isLoggedIn: !!user, login, logout, addAddress, updateUser,
      notification, showNotification, hideNotification,
      theme, toggleTheme
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};