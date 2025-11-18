import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon, Card, Header, Button, PageWrapper } from '../components/UIComponents';
import { MOCK_RESTAURANTS } from '../constants';
import { useStore } from '../context/StoreContext';
import { MenuItem, CustomizationOption } from '../types';

// --- Components ---

const RestaurantCard: React.FC<{ data: any, onClick: () => void, delay: number }> = ({ data, onClick, delay }) => (
  <div 
    className="animate-slide-up" 
    style={{ animationDelay: `${delay}ms` }}
  >
    <Card className="mb-5 group" onClick={onClick}>
        <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <img 
            src={data.image} 
            alt={data.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            loading="lazy" 
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
        
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center text-black">
            <span className="text-yellow-500 material-symbols-outlined text-[14px] mr-1 fill-current">star</span>
            {data.rating}
        </div>
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-black shadow-sm">
            {data.deliveryTime}
        </div>
        </div>
        <div className="p-4">
        <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{data.name}</h3>
            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{data.priceRange}</span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center mt-1">
            <Icon name="restaurant" size={14} className="mr-1.5 text-gray-400" />
            {data.cuisine}
        </p>
        </div>
    </Card>
  </div>
);

const MenuItemCard: React.FC<{ item: MenuItem, onClick: () => void }> = ({ item, onClick }) => (
  <div onClick={onClick} className="flex p-4 border-b border-gray-50 dark:border-gray-700 last:border-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
    <div className="flex-1 pr-4">
      <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1 group-hover:text-primary transition-colors">{item.name}</h4>
      <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2 mb-2 leading-relaxed">{item.description}</p>
      <span className="font-bold text-gray-900 dark:text-white">${item.price.toFixed(2)}</span>
    </div>
    <div className="w-24 h-24 flex-shrink-0 relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm">
      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
      <button className="absolute -bottom-0 -right-0 bg-white dark:bg-gray-800 rounded-tl-xl p-2 shadow-sm border-t border-l border-gray-100 dark:border-gray-600">
        <Icon name="add" className="text-primary" />
      </button>
    </div>
  </div>
);

// --- Screens ---

export const FoodDiscoveryScreen = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const categories = ['All', 'Burger', 'Pizza', 'Sushi', 'Asian', 'Mexican', 'Dessert'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <PageWrapper className="pb-20 bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header Area */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-4 pb-2 sticky top-0 z-30 shadow-sm transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div className="animate-fade-in">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Delivering to</p>
            <div className="flex items-center text-primary font-bold cursor-pointer group">
              <span className="group-hover:underline">Current Location</span>
              <Icon name="expand_more" className="ml-1 transition-transform group-hover:rotate-180" />
            </div>
          </div>
          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer relative">
             <Icon name="notifications" className="text-gray-600 dark:text-gray-300" />
             <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-800"></span>
          </div>
        </div>

        <form onSubmit={handleSearch} className="relative group">
          <Icon name="search" className="absolute left-3 top-3 text-gray-400 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Find food or restaurants..." 
            className="w-full bg-gray-100 dark:bg-gray-700 py-3 pl-10 pr-4 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300 shadow-inner"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div className="flex overflow-x-auto no-scrollbar gap-3 mt-4 pb-2 mask-linear-fade">
          {categories.map((cat, idx) => (
            <button 
              key={cat} 
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 active:scale-95 ${
                idx === 0 ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Section */}
      <div className="p-4">
        <h2 className="font-bold text-lg mb-4 text-gray-800 dark:text-white animate-fade-in">Featured Restaurants</h2>
        <div className="space-y-4">
            {MOCK_RESTAURANTS.map((rest, idx) => (
            <RestaurantCard 
                key={rest.id} 
                data={rest} 
                onClick={() => navigate(`/restaurant/${rest.id}`)} 
                delay={idx * 100}
            />
            ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export const SearchResultsScreen = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    setQuery(params.get('q') || '');
  }, []);

  const filtered = MOCK_RESTAURANTS.filter(r => 
    r.name.toLowerCase().includes(query.toLowerCase()) || 
    r.cuisine.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PageWrapper className="bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header title={`Results for "${query}"`} showBack />
      <div className="p-4">
        {filtered.length > 0 ? (
          filtered.map((rest, idx) => (
             <RestaurantCard key={rest.id} data={rest} onClick={() => navigate(`/restaurant/${rest.id}`)} delay={idx * 100} />
          ))
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="search_off" className="text-gray-400 dark:text-gray-600 text-4xl" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">No restaurants found.</p>
            <p className="text-gray-400 text-sm mt-2">Try searching for something else</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export const RestaurantDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = MOCK_RESTAURANTS.find(r => r.id === id);

  if (!restaurant) return <div className="p-4 dark:text-white">Not Found</div>;

  return (
    <PageWrapper className="bg-gray-50 dark:bg-gray-900 pb-10 transition-colors">
      {/* Hero Banner */}
      <div className="relative h-72 w-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
        <img src={restaurant.image} className="w-full h-full object-cover animate-pop origin-center scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
        
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full shadow-sm text-white hover:bg-white/30 transition-colors active:scale-95"
        >
          <Icon name="arrow_back" size={24} />
        </button>
      </div>

      {/* Info Card */}
      <div className="px-4 -mt-12 relative z-10 animate-slide-up">
        <Card className="p-5 mb-6 shadow-xl dark:shadow-black/40">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{restaurant.name}</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{restaurant.cuisine}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-2.5 py-1.5 rounded-xl font-bold text-sm flex items-center border border-green-100 dark:border-green-800 shadow-sm">
                    <span className="text-green-600 dark:text-green-400 text-[16px] mr-1">★</span>
                    {restaurant.rating}
                </div>
            </div>
            <div className="h-px bg-gray-100 dark:bg-gray-700 my-4"></div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center"><Icon name="schedule" size={18} className="mr-1.5 text-gray-400"/> {restaurant.deliveryTime}</div>
                <div className="flex items-center"><Icon name="attach_money" size={18} className="text-gray-400"/> {restaurant.priceRange}</div>
                <div className="flex items-center"><Icon name="local_shipping" size={18} className="mr-1.5 text-gray-400"/> Free Delivery</div>
            </div>
        </Card>
        
        {/* Menu Sections */}
        {restaurant.categories.map((cat, idx) => (
          <div key={cat.id} className="mb-6 animate-slide-up" style={{ animationDelay: `${100 + (idx * 100)}ms` }}>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 ml-1">{cat.name}</h3>
            <Card className="overflow-hidden shadow-md border-none">
              {cat.items.map(item => (
                <MenuItemCard 
                    key={item.id} 
                    item={item} 
                    onClick={() => navigate(`/menu-item/${item.id}`)} 
                />
              ))}
            </Card>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};

export const MenuItemDetailScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, showNotification } = useStore();
    
    const findItem = () => {
        for(const r of MOCK_RESTAURANTS) {
            for(const c of r.categories) {
                const found = c.items.find(i => i.id === id);
                if(found) return found;
            }
        }
        return null;
    };

    const item = findItem();
    const [quantity, setQuantity] = useState(1);
    const [options, setOptions] = useState<Record<string, any>>({});

    if(!item) return <div className="dark:text-white">Item not found</div>;

    const handleOptionChange = (optId: string, type: string, val: string) => {
        if (type === 'radio') {
            setOptions(prev => ({ ...prev, [optId]: val }));
        } else {
            setOptions(prev => {
                const current = prev[optId] || [];
                if (current.includes(val)) {
                    return { ...prev, [optId]: current.filter((v: string) => v !== val) };
                } else {
                    return { ...prev, [optId]: [...current, val] };
                }
            });
        }
    };

    const handleAddToCart = () => {
        addToCart(item, quantity, options);
        showNotification(`${quantity}x ${item.name} added to cart`);
        navigate(-1);
    };

    return (
        <PageWrapper className="bg-gray-50 dark:bg-gray-900 relative pb-24 transition-colors">
            <div className="relative h-80 w-full bg-gray-200 dark:bg-gray-700">
                <img src={item.image} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <button 
                    onClick={() => navigate(-1)} 
                    className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white shadow-md hover:bg-white/30 transition-colors active:scale-95"
                >
                    <Icon name="close" />
                </button>
            </div>
            
            <div className="px-4 -mt-10 relative z-10 animate-slide-up">
                <Card className="p-6 mb-5 shadow-xl dark:shadow-black/30">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{item.name}</h1>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm mb-4">{item.description}</p>
                    <p className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</p>
                </Card>

                {item.customizations?.map(cust => (
                    <div key={cust.id} className="mb-5 animate-fade-in">
                        <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 text-md ml-1">{cust.name}</h3>
                        <Card className="divide-y divide-gray-100 dark:divide-gray-700 border-none">
                            {cust.choices.map(choice => {
                                const isSelected = cust.type === 'radio' 
                                    ? options[cust.id] === choice.id 
                                    : (options[cust.id] || []).includes(choice.id);

                                return (
                                    <label key={choice.id} className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 active:bg-gray-100 dark:active:bg-gray-700 transition-colors">
                                        <div className="flex items-center">
                                            <div className={`w-5 h-5 rounded-${cust.type === 'radio' ? 'full' : 'md'} border flex items-center justify-center mr-3 transition-all duration-200 ${isSelected ? 'bg-primary border-primary scale-110' : 'border-gray-300 dark:border-gray-500'}`}>
                                                {isSelected && <Icon name="check" size={14} className="text-white" />}
                                            </div>
                                            <span className={`font-medium text-sm ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{choice.name}</span>
                                        </div>
                                        {choice.price && <span className="text-gray-500 dark:text-gray-400 text-sm">+${choice.price.toFixed(2)}</span>}
                                        <input 
                                            type={cust.type} 
                                            name={cust.id}
                                            className="hidden"
                                            onChange={() => handleOptionChange(cust.id, cust.type, choice.id)}
                                            checked={!!isSelected}
                                        />
                                    </label>
                                );
                            })}
                        </Card>
                    </div>
                ))}

                {/* Quantity */}
                <div className="flex items-center justify-center my-8 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center text-gray-600 dark:text-gray-300 text-xl font-bold active:scale-90">-</button>
                    <span className="mx-6 text-2xl font-bold text-gray-800 dark:text-white w-8 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 rounded-full bg-primary hover:bg-emerald-600 shadow-lg shadow-primary/30 transition-all flex items-center justify-center text-white text-xl font-bold active:scale-90">+</button>
                </div>
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-t dark:border-gray-700 p-4 max-w-md mx-auto z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-colors">
                <Button fullWidth onClick={handleAddToCart}>
                    Add to Cart - ${(item.price * quantity).toFixed(2)} 
                </Button>
            </div>
        </PageWrapper>
    );
};