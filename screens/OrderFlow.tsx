import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Header, Button, Card, Icon, PageWrapper } from '../components/UIComponents';
import { MOCK_ORDERS } from '../constants';

// --- Cart ---
export const CartScreen = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
        <PageWrapper className="bg-gray-50 dark:bg-gray-900 items-center justify-center p-6 text-center transition-colors">
            <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 animate-pop">
                <Icon name="shopping_cart" className="text-gray-400 dark:text-gray-500 text-5xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 animate-slide-up">Your Cart is Empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 animate-slide-up delay-100">Looks like you haven't added any food yet.</p>
            <Button onClick={() => navigate('/')} variant="secondary" className="animate-slide-up delay-200">Browse Restaurants</Button>
        </PageWrapper>
    );
  }

  const handleCheckout = () => {
      // Simulate order process
      setTimeout(() => {
          clearCart();
          navigate('/order-confirmation');
      }, 500);
  };

  return (
    <PageWrapper className="bg-gray-50 dark:bg-gray-900 pb-36 transition-colors">
      <Header title="My Cart" />
      <div className="p-4">
        {cart.map((item, idx) => (
          <div key={item.uniqueId} className="animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
            <Card className="p-4 mb-4 flex items-start group">
                <img src={item.menuItem.image} className="w-16 h-16 rounded-lg object-cover mr-4 bg-gray-200 dark:bg-gray-700 group-hover:scale-105 transition-transform duration-300" />
                <div className="flex-1">
                    <div className="flex justify-between mb-1">
                        <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm">{item.menuItem.name}</h4>
                        <span className="font-bold text-gray-900 dark:text-white text-sm">${item.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        {Object.values(item.selectedOptions).flat().join(', ')}
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-1 shadow-inner">
                            <button onClick={() => updateQuantity(item.uniqueId, -1)} className="w-7 h-7 flex items-center justify-center text-gray-500 dark:text-gray-300 font-bold hover:bg-white dark:hover:bg-gray-600 hover:shadow-sm rounded transition-all">-</button>
                            <span className="mx-2 text-sm font-semibold w-4 text-center text-gray-900 dark:text-white">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.uniqueId, 1)} className="w-7 h-7 flex items-center justify-center text-gray-800 dark:text-white font-bold hover:bg-white dark:hover:bg-gray-600 hover:shadow-sm rounded transition-all">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.uniqueId)} className="text-red-500 text-xs font-medium p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">Remove</button>
                    </div>
                </div>
            </Card>
          </div>
        ))}
        
        <Card className="p-5 mt-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="flex justify-between mb-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 text-sm text-gray-600 dark:text-gray-400">
                <span>Delivery Fee</span>
                <span>$2.99</span>
            </div>
            <div className="h-px bg-gray-100 dark:bg-gray-700 mb-3"></div>
            <div className="flex justify-between font-bold text-gray-900 dark:text-white text-lg">
                <span>Total</span>
                <span>${(cartTotal + 2.99).toFixed(2)}</span>
            </div>
        </Card>
      </div>
      
      <div className="fixed bottom-16 left-0 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-t dark:border-gray-700 p-4 max-w-md mx-auto transition-colors z-40">
          <Button fullWidth onClick={handleCheckout} className="shadow-xl shadow-primary/20">
              Checkout Now
          </Button>
      </div>
    </PageWrapper>
  );
};

// --- Order Confirmation ---
export const OrderConfirmationScreen = () => {
    const navigate = useNavigate();
    return (
        <PageWrapper className="bg-white dark:bg-gray-900 items-center justify-center p-6 text-center transition-colors">
            <div className="mb-8 relative">
                <div className="absolute inset-0 bg-green-100 dark:bg-green-900/30 rounded-full animate-ping opacity-75"></div>
                <Icon name="check_circle" className="text-green-500 text-8xl relative z-10 animate-pop" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 animate-slide-up delay-100">Order Confirmed!</h1>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-10 max-w-xs mx-auto animate-slide-up delay-200 leading-relaxed">
                Your order <span className="font-mono font-bold text-gray-800 dark:text-gray-200">#GRB-56789</span> has been placed successfully.
            </p>
            <div className="w-full space-y-3 animate-slide-up delay-300">
                <Button fullWidth onClick={() => navigate('/tracking/GRB-56789')}>Track Your Order</Button>
                <Button fullWidth variant="outline" onClick={() => navigate('/')}>Back to Home</Button>
            </div>
        </PageWrapper>
    );
};

// --- Order History ---
export const OrderHistoryScreen = () => {
    const navigate = useNavigate();
    return (
        <PageWrapper className="bg-gray-50 dark:bg-gray-900 pb-20 transition-colors">
            <Header title="Past Orders" />
            <div className="p-4">
                {MOCK_ORDERS.map((order, idx) => (
                    <div key={order.id} className="animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                        <Card className="mb-4 p-4 group" onClick={() => navigate(`/orders/${order.id}`)}>
                            <div className="flex items-start mb-4">
                                <img src={order.image} className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 object-cover mr-3 shadow-sm" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{order.restaurantName}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{order.date}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">{order.items.join(', ')}</p>
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded border ${order.status === 'Delivered' ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700' : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800'}`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="border-t border-gray-100 dark:border-gray-700 pt-3 flex justify-between items-center">
                                <span className="font-bold text-gray-800 dark:text-gray-100">${order.total.toFixed(2)}</span>
                                <Button variant="outline" className="py-1 px-4 text-xs h-8 rounded-full hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-colors">Reorder</Button>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </PageWrapper>
    );
};

// --- Order Detail ---
export const OrderDetailScreen = () => {
    const { id } = useParams();
    const order = MOCK_ORDERS.find(o => o.id === id) || MOCK_ORDERS[0];

    return (
        <PageWrapper className="bg-gray-50 dark:bg-gray-900 transition-colors">
            <Header title="Order Details" showBack />
            <div className="p-4 animate-slide-up">
                <Card className="p-6 text-center mb-4">
                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{order.restaurantName}</h2>
                     <p className="text-green-600 dark:text-green-400 font-bold text-sm mb-6 uppercase tracking-wide">{order.status}</p>
                     <div className="flex justify-center space-x-6">
                         <div className="text-center">
                             <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Order ID</div>
                             <div className="font-mono text-sm font-bold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{order.id}</div>
                         </div>
                         <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                         <div className="text-center">
                             <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Total</div>
                             <div className="font-mono text-sm font-bold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">${order.total.toFixed(2)}</div>
                         </div>
                     </div>
                </Card>

                <h3 className="font-bold text-gray-700 dark:text-gray-300 text-sm mb-3 uppercase tracking-wide pl-1 mt-6">Items</h3>
                <Card className="p-4 mb-6">
                    {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between py-3 border-b border-gray-50 dark:border-gray-700 last:border-0 text-sm">
                            <span className="text-gray-800 dark:text-gray-200 font-medium">{item}</span>
                            <span className="text-gray-500 dark:text-gray-400 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">x1</span>
                        </div>
                    ))}
                </Card>

                <Card className="p-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                        <Icon name="location_on" size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold mb-0.5">Delivered To</p>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Home</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">123 Maple Ave, Springfield</p>
                    </div>
                </Card>
            </div>
        </PageWrapper>
    );
};

// --- Order Tracking ---
export const OrderTrackingScreen = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col h-full transition-colors animate-fade-in">
            <div className="flex-1 bg-gray-200 relative overflow-hidden">
                {/* Mock Map Background */}
                <div className="absolute inset-0 bg-blue-50/50 dark:bg-gray-800/50 flex items-center justify-center">
                     {/* Grid lines simulating map */}
                    <div className="w-full h-full opacity-10" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                </div>
                
                {/* Courier Pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="relative">
                         <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-50 scale-150"></div>
                         <div className="w-14 h-14 bg-primary rounded-full border-4 border-white dark:border-gray-800 shadow-2xl flex items-center justify-center relative z-10">
                             <Icon name="two_wheeler" className="text-white" size={28} />
                         </div>
                         <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rotate-45 border-r-4 border-b-4 border-white dark:border-gray-800"></div>
                    </div>
                </div>

                <button 
                  onClick={() => window.history.back()} 
                  className="absolute top-6 left-6 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg z-20 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-95"
                >
                  <Icon name="arrow_back" />
                </button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 relative z-10 -mt-10 transition-colors animate-slide-up">
                <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full mx-auto mb-8"></div>
                
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">On the way</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Arriving in 15 minutes</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-xl text-sm font-mono font-bold text-gray-700 dark:text-gray-300 shadow-inner">
                        12:45 PM
                    </div>
                </div>

                <div className="relative border-l-2 border-gray-100 dark:border-gray-700 ml-3 space-y-10 pb-6">
                    <div className="relative pl-8">
                        <div className="absolute -left-[9px] top-0.5 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-gray-800 shadow-sm"></div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">Order Picked Up</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">12:30 PM • Restaurant</p>
                    </div>
                     <div className="relative pl-8 opacity-50">
                        <div className="absolute -left-[9px] top-0.5 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 border-4 border-white dark:border-gray-800"></div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">Arrived at Location</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pending</p>
                    </div>
                </div>

                <div className="flex items-center border-t border-gray-100 dark:border-gray-700 pt-6 mt-2">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 mr-4 overflow-hidden">
                        <img src="https://i.pravatar.cc/150?img=33" alt="Courier" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-bold dark:text-white">John Doe</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Your Courier • 4.9 ★</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="w-10 h-10 flex items-center justify-center bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"><Icon name="call" size={20} /></button>
                        <button className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><Icon name="chat" size={20} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};