import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import { BottomTabBar, Toast } from './components/UIComponents';

// Screens
import { FoodDiscoveryScreen, RestaurantDetailScreen, MenuItemDetailScreen, SearchResultsScreen } from './screens/HomeFlow';
import { CartScreen, OrderHistoryScreen, OrderDetailScreen, OrderTrackingScreen, OrderConfirmationScreen } from './screens/OrderFlow';
import { ProfileScreen, LoginScreen, AddressListScreen, AddressFormScreen, AccountSettingsScreen } from './screens/ProfileFlow';

// Layout Container to simulate mobile view on desktop
const MobileLayout = ({ children }: { children?: React.ReactNode }) => {
  const { notification, hideNotification } = useStore();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex justify-center transition-colors">
      <div className="w-full max-w-md bg-gray-50 dark:bg-gray-900 shadow-2xl relative min-h-screen overflow-hidden transition-colors">
        {notification && (
            <Toast 
                message={notification.message} 
                type={notification.type} 
                onClose={hideNotification} 
            />
        )}
        {children}
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { isLoggedIn } = useStore();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AppContent = () => {
  return (
    <MobileLayout>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginScreen />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><FoodDiscoveryScreen /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><SearchResultsScreen /></ProtectedRoute>} />
        <Route path="/restaurant/:id" element={<ProtectedRoute><RestaurantDetailScreen /></ProtectedRoute>} />
        <Route path="/menu-item/:id" element={<ProtectedRoute><MenuItemDetailScreen /></ProtectedRoute>} />
        
        <Route path="/cart" element={<ProtectedRoute><CartScreen /></ProtectedRoute>} />
        <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmationScreen /></ProtectedRoute>} />
        
        <Route path="/orders" element={<ProtectedRoute><OrderHistoryScreen /></ProtectedRoute>} />
        <Route path="/orders/:id" element={<ProtectedRoute><OrderDetailScreen /></ProtectedRoute>} />
        <Route path="/tracking/:id" element={<ProtectedRoute><OrderTrackingScreen /></ProtectedRoute>} />
        
        <Route path="/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
        <Route path="/profile/settings" element={<ProtectedRoute><AccountSettingsScreen /></ProtectedRoute>} />
        <Route path="/profile/addresses" element={<ProtectedRoute><AddressListScreen /></ProtectedRoute>} />
        <Route path="/profile/addresses/add" element={<ProtectedRoute><AddressFormScreen /></ProtectedRoute>} />
      </Routes>
      <BottomTabBar />
    </MobileLayout>
  );
};

const App = () => {
  return (
    <StoreProvider>
      <Router>
        <AppContent />
      </Router>
    </StoreProvider>
  );
};

export default App;