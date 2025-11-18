import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Header, Button, Card, Icon, InputField, PageWrapper } from '../components/UIComponents';

export const LoginScreen = () => {
  const { login } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || 'user@example.com');
    navigate('/');
  };

  return (
    <PageWrapper className="bg-white dark:bg-gray-900 p-8 justify-center max-w-md mx-auto transition-colors">
      <div className="mb-10 text-center animate-slide-up">
        <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-6 hover:rotate-12 transition-transform duration-500">
            <Icon name="lunch_dining" className="text-primary text-6xl" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Welcome Back</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Sign in to continue your tasty journey</p>
      </div>

      <form onSubmit={handleLogin} className="animate-slide-up delay-100 space-y-6">
        <InputField 
            label="Email Address" 
            type="email" 
            placeholder="name@example.com" 
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
        />
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ml-1">Password</label>
            <input type="password" placeholder="••••••••" className="w-full pl-4 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none text-gray-800 dark:text-white text-sm transition-all duration-200" />
            <div className="text-right mt-2">
                <a href="#" className="text-xs text-primary font-medium hover:underline">Forgot Password?</a>
            </div>
        </div>
        <Button fullWidth onClick={handleLogin} className="shadow-lg shadow-primary/20">Login</Button>
      </form>
      
      <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400 animate-fade-in delay-200">
          Don't have an account? <span className="text-primary font-bold cursor-pointer hover:underline">Sign Up</span>
      </div>
    </PageWrapper>
  );
};

const ProfileMenuItem = ({ icon, label, onClick, isDestructive = false, rightElement, delay = 0 }: any) => (
    <div 
        onClick={onClick} 
        className={`flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-50 dark:border-gray-700 last:border-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors animate-slide-up`}
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className="flex items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center mr-4 transition-colors ${isDestructive ? 'bg-red-50 dark:bg-red-900/20 text-red-500' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 group-hover:bg-white dark:group-hover:bg-gray-600'}`}>
                <Icon name={icon} size={20} />
            </div>
            <span className={`font-medium ${isDestructive ? 'text-red-500' : 'text-gray-800 dark:text-white'}`}>{label}</span>
        </div>
        {rightElement ? rightElement : <Icon name="chevron_right" className="text-gray-400" />}
    </div>
);

export const ProfileScreen = () => {
    const { user, logout, theme, toggleTheme } = useStore();
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <PageWrapper className="bg-gray-50 dark:bg-gray-900 pb-24 transition-colors">
            <div className="bg-white dark:bg-gray-800 p-6 pb-8 shadow-sm mb-4 transition-colors relative overflow-hidden">
                 <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="flex items-center relative z-10 animate-fade-in">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mr-5 overflow-hidden border-4 border-white dark:border-gray-700 shadow-md">
                        <img src="https://i.pravatar.cc/150?img=68" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user.name}</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
                            <Icon name="mail" size={14} className="mr-1.5 opacity-70"/> {user.email}
                        </p>
                    </div>
                </div>
            </div>

            <div className="px-4 space-y-5">
                <Card className="overflow-hidden shadow-md border-none">
                    <ProfileMenuItem icon="person" label="Account Settings" onClick={() => navigate('/profile/settings')} delay={100} />
                    <ProfileMenuItem icon="location_on" label="My Addresses" onClick={() => navigate('/profile/addresses')} delay={150} />
                    <ProfileMenuItem icon="credit_card" label="Payment Methods" onClick={() => {}} delay={200} />
                </Card>

                <Card className="overflow-hidden shadow-md border-none">
                    <ProfileMenuItem 
                        icon={theme === 'dark' ? 'dark_mode' : 'light_mode'} 
                        label="Dark Mode" 
                        onClick={toggleTheme}
                        delay={250}
                        rightElement={
                             <div className={`w-12 h-7 rounded-full p-1 flex items-center transition-colors duration-300 ${theme === 'dark' ? 'bg-primary justify-end' : 'bg-gray-200 dark:bg-gray-600 justify-start'}`}>
                                 <div className="w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-300"></div>
                             </div>
                        }
                    />
                    <ProfileMenuItem icon="notifications" label="Notifications" onClick={() => {}} delay={300} />
                    <ProfileMenuItem icon="help" label="Help & Support" onClick={() => {}} delay={350} />
                </Card>

                <Card className="overflow-hidden shadow-md border-none">
                     <ProfileMenuItem icon="logout" label="Log Out" isDestructive onClick={() => { logout(); navigate('/login'); }} delay={400} />
                </Card>
            </div>
        </PageWrapper>
    );
};

export const AddressListScreen = () => {
    const { user } = useStore();
    const navigate = useNavigate();

    return (
        <PageWrapper className="bg-gray-50 dark:bg-gray-900 transition-colors">
            <Header title="My Addresses" showBack />
            <div className="p-4">
                {user?.addresses.map((addr, idx) => (
                    <div key={addr.id} className="animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                        <Card className="p-4 mb-4 flex items-center justify-between group">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-4 text-gray-500 dark:text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    <Icon name={addr.label === 'Home' ? 'home' : 'work'} size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 dark:text-white text-sm mb-0.5">{addr.label}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{addr.street}, {addr.city}</p>
                                </div>
                            </div>
                            <button className="text-primary text-sm font-semibold hover:underline px-2 py-1">Edit</button>
                        </Card>
                    </div>
                ))}
                <Button variant="outline" fullWidth onClick={() => navigate('/profile/addresses/add')} className="mt-4 dashed border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary text-gray-500 dark:text-gray-400 animate-fade-in">
                    <Icon name="add" className="mr-2"/> Add New Address
                </Button>
            </div>
        </PageWrapper>
    );
};

export const AddressFormScreen = () => {
    const navigate = useNavigate();
    const { addAddress } = useStore();
    const [form, setForm] = useState({ street: '', city: '', state: '', zip: '', label: 'Home' });

    const handleSave = () => {
        addAddress({ ...form, id: Date.now().toString() });
        navigate(-1);
    };

    return (
        <PageWrapper className="bg-gray-50 dark:bg-gray-900 pb-20 transition-colors">
             <Header title="Add Address" showBack />
             <div className="p-4 animate-slide-up">
                 <Card className="p-6">
                     <InputField label="Label (e.g., Home, Work)" value={form.label} onChange={(e:any) => setForm({...form, label: e.target.value})} />
                     <InputField label="Street Address" value={form.street} onChange={(e:any) => setForm({...form, street: e.target.value})} />
                     <div className="grid grid-cols-2 gap-4">
                        <InputField label="City" value={form.city} onChange={(e:any) => setForm({...form, city: e.target.value})} />
                        <InputField label="State" value={form.state} onChange={(e:any) => setForm({...form, state: e.target.value})} />
                     </div>
                     <InputField label="Zip Code" value={form.zip} onChange={(e:any) => setForm({...form, zip: e.target.value})} />
                 </Card>
             </div>
             <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 max-w-md mx-auto transition-colors">
                 <Button fullWidth onClick={handleSave}>Save Address</Button>
             </div>
        </PageWrapper>
    );
};

export const AccountSettingsScreen = () => {
    const { user, updateUser } = useStore();
    const navigate = useNavigate();
    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');

    const handleSave = () => {
        updateUser({ name, phone });
        navigate(-1);
    };

    return (
        <PageWrapper className="bg-gray-50 dark:bg-gray-900 transition-colors">
             <Header title="Edit Profile" showBack />
             <div className="p-4 animate-slide-up">
                 <div className="flex justify-center mb-8">
                      <div className="relative group cursor-pointer">
                          <img src="https://i.pravatar.cc/150?img=68" className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-700 shadow-md transition-transform group-hover:scale-105" />
                          <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full border-4 border-white dark:border-gray-700 shadow-sm hover:bg-emerald-600 transition-colors">
                              <Icon name="camera_alt" size={18} />
                          </button>
                      </div>
                 </div>
                 <Card className="p-6 shadow-lg">
                     <InputField label="Full Name" value={name} onChange={(e:any) => setName(e.target.value)} />
                     <InputField label="Email" value={user?.email || ''} disabled type="email" />
                     <InputField label="Phone Number" value={phone} onChange={(e:any) => setPhone(e.target.value)} />
                 </Card>
                 
                 <Button fullWidth className="mt-6" onClick={handleSave}>Save Changes</Button>
             </div>
        </PageWrapper>
    );
};