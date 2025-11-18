import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// --- Page Wrapper for Transitions ---
export const PageWrapper = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => (
  <div className={`animate-fade-in min-h-screen flex flex-col ${className}`}>
    {children}
  </div>
);

// --- Icons ---
export const Icon = ({ name, className = "", size = 24 }: { name: string; className?: string; size?: number }) => (
  <span className={`material-symbols-outlined ${className}`} style={{ fontSize: size }}>
    {name}
  </span>
);

// --- Bottom Tab Bar ---
export const BottomTabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: 'Home', icon: 'home', path: '/' },
    { name: 'Orders', icon: 'receipt_long', path: '/orders' },
    { name: 'Cart', icon: 'shopping_cart', path: '/cart' },
    { name: 'Profile', icon: 'person', path: '/profile' },
  ];

  const hiddenPaths = ['/login', '/menu-item', '/restaurant', '/order-confirmation', '/tracking'];
  if (hiddenPaths.some(p => location.pathname.startsWith(p))) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 pb-safe pt-2 px-6 flex justify-between items-center z-50 h-16 max-w-md mx-auto transition-all duration-300">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path || (tab.path !== '/' && location.pathname.startsWith(tab.path));
        return (
          <button
            key={tab.name}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center justify-center w-16 transition-all duration-300 ${
              isActive ? 'text-primary -translate-y-1' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            <Icon 
                name={tab.icon} 
                className={`transition-transform duration-300 ${isActive ? "filled scale-110" : ""}`} 
            />
            <span className={`text-[10px] mt-1 font-medium transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>{tab.name}</span>
          </button>
        );
      })}
    </div>
  );
};

// --- Cards ---
interface CardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 ${onClick ? 'cursor-pointer hover:shadow-md hover:border-primary/30 dark:hover:border-primary/30 hover:-translate-y-0.5' : ''} ${className}`}
  >
    {children}
  </div>
);

// --- Header ---
export const Header = ({ title, showBack = false }: { title: string; showBack?: boolean }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-4 py-3 flex items-center shadow-sm sticky top-0 z-40 transition-colors duration-300">
      {showBack && (
        <button onClick={() => navigate(-1)} className="mr-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 transition-colors active:scale-95">
          <Icon name="arrow_back" />
        </button>
      )}
      <h1 className="text-lg font-bold text-gray-900 dark:text-white flex-1 truncate animate-fade-in">{title}</h1>
    </div>
  );
};

// --- Form Inputs ---
export const InputField = ({ label, type = "text", placeholder, value, onChange, disabled = false }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ml-1">{label}</label>
    <div className="relative group">
        <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full pl-4 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm transition-all duration-200 disabled:text-gray-500 disabled:bg-gray-100"
        />
    </div>
  </div>
);

// --- Buttons ---
export const Button = ({ children, onClick, variant = 'primary', className = "", fullWidth = false }: any) => {
  const baseStyle = "py-3 px-6 rounded-lg font-semibold text-sm flex items-center justify-center transition-all duration-200 active:scale-[0.98]";
  const variants = {
    primary: "bg-gradient-to-r from-primary to-emerald-600 text-white shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:brightness-105",
    secondary: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600",
    outline: "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800",
    danger: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 border border-transparent hover:border-red-200 dark:hover:border-red-800"
  };
  
  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

// --- Toast Notification ---
export const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'info'; onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColors = {
        success: 'bg-gray-800 dark:bg-gray-700',
        error: 'bg-red-500 dark:bg-red-600',
        info: 'bg-blue-500 dark:bg-blue-600'
    };

    return (
        <div className="fixed top-4 left-4 right-4 z-[100] flex justify-center pointer-events-none">
             <div className={`${bgColors[type]} text-white px-4 py-3 rounded-full shadow-xl shadow-black/10 flex items-center animate-slide-down max-w-sm mx-auto pointer-events-auto backdrop-blur-md`}>
                 <Icon name={type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info'} size={20} className="mr-2" />
                 <span className="text-sm font-medium">{message}</span>
             </div>
        </div>
    );
};