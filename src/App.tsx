import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, Phone, Home as HomeIcon, Instagram, MapPin, Clock, Menu as MenuIcon, X, ShoppingBag, User as UserIcon, LogOut, Plus, Minus, Trash2, CreditCard, CheckCircle, ArrowLeft } from 'lucide-react';
import { MENU_ITEMS } from './constants';
import { Category, MenuItem, CartItem, User } from './types';

// --- Components ---

const CheckoutSection = ({ 
  items, 
  total, 
  onComplete, 
  onBack 
}: { 
  items: CartItem[], 
  total: number, 
  onComplete: () => void,
  onBack: () => void
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };

  return (
    <section className="py-20 px-4 min-h-[80vh]">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-brand-brown/60 hover:text-brand-green mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> กลับไปเลือกเมนู
        </button>

        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-brand-beige">
              <h2 className="text-3xl mb-8 flex items-center gap-3">
                <CreditCard className="text-brand-green" /> ข้อมูลการชำระเงิน
              </h2>
              
              <form className="space-y-6" onSubmit={handlePayment}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2 ml-2">ชื่อบนบัตร</label>
                    <input required className="w-full px-5 py-3 rounded-2xl bg-brand-cream border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-green/50" placeholder="สมชาย ใจดี" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2 ml-2">หมายเลขบัตร</label>
                    <input required className="w-full px-5 py-3 rounded-2xl bg-brand-cream border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-green/50" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 ml-2">วันหมดอายุ</label>
                    <input required className="w-full px-5 py-3 rounded-2xl bg-brand-cream border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-green/50" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 ml-2">CVV</label>
                    <input required className="w-full px-5 py-3 rounded-2xl bg-brand-cream border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-green/50" placeholder="123" />
                  </div>
                </div>

                <button 
                  disabled={isProcessing}
                  className="w-full rounded-full bg-brand-green text-white py-4 font-semibold shadow-lg hover:bg-brand-green-dark transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      กำลังประมวลผล...
                    </>
                  ) : (
                    `ชำระเงิน ฿${total} ✨`
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="bg-brand-beige/20 p-8 rounded-[2.5rem] border border-brand-beige">
              <h3 className="text-xl mb-6">สรุปรายการสั่งซื้อ</h3>
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-brand-brown/70">{item.name} x {item.quantity}</span>
                    <span className="font-bold">฿{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-brand-beige pt-4 flex justify-between items-center text-xl font-bold">
                <span>ยอดรวมสุทธิ</span>
                <span className="text-brand-green">฿{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SuccessSection = ({ onHome }: { onHome: () => void }) => (
  <section className="py-20 px-4 min-h-[80vh] flex items-center justify-center">
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl border border-brand-beige text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-24 h-24 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-8"
      >
        <CheckCircle size={48} />
      </motion.div>
      <h2 className="text-4xl mb-4">ชำระเงินเรียบร้อย!</h2>
      <p className="text-brand-brown/60 mb-10">
        ขอบคุณที่ใช้บริการ Siam Savor<br />
        เราได้รับคำสั่งซื้อของคุณแล้ว และกำลังเตรียมอาหารสุดพิเศษให้คุณ
      </p>
      <button 
        onClick={onHome}
        className="w-full rounded-full bg-brand-green text-white py-4 font-semibold shadow-lg hover:bg-brand-green-dark transition-all"
      >
        กลับไปหน้าหลัก 🏠
      </button>
    </motion.div>
  </section>
);

const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  cartCount, 
  onOpenCart, 
  user, 
  onOpenAuth, 
  onLogout 
}: { 
  activeTab: string, 
  setActiveTab: (tab: string) => void,
  cartCount: number,
  onOpenCart: () => void,
  user: User | null,
  onOpenAuth: () => void,
  onLogout: () => void
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { id: 'home', label: 'หน้าแรก', icon: <HomeIcon size={18} /> },
    { id: 'menu', label: 'เมนู', icon: <Utensils size={18} /> },
    { id: 'contact', label: 'ติดต่อเรา', icon: <Phone size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-beige">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setActiveTab('home')}
        >
          <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white shadow-sm">
            <span className="text-xl">🍜</span>
          </div>
          <span className="font-display text-2xl text-brand-brown tracking-tight">Siam Savor</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-link flex items-center gap-2 ${activeTab === tab.id ? 'active' : 'text-brand-brown/70'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-brand-brown hover:bg-brand-beige rounded-full transition-colors"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-brand-green text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-cream">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-2 ml-2">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-brand-brown">{user.name}</p>
                <button onClick={onLogout} className="text-[10px] text-red-500 hover:underline">ออกจากระบบ</button>
              </div>
              <div className="w-8 h-8 bg-brand-beige rounded-full flex items-center justify-center text-brand-brown">
                <UserIcon size={16} />
              </div>
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="p-2 text-brand-brown hover:bg-brand-beige rounded-full transition-colors"
            >
              <UserIcon size={22} />
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-brand-brown" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-brand-cream border-b border-brand-beige p-4 flex flex-col gap-2"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsOpen(false);
                }}
                className={`nav-link flex items-center gap-3 w-full ${activeTab === tab.id ? 'active' : 'text-brand-brown/70'}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const CartModal = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove,
  onCheckout
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: CartItem[],
  onUpdateQuantity: (id: number, delta: number) => void,
  onRemove: (id: number) => void,
  onCheckout: () => void
}) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-brand-cream z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-brand-beige flex items-center justify-between">
              <h2 className="text-2xl flex items-center gap-2">
                <ShoppingBag className="text-brand-green" /> ตระกร้าของคุณ
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-brand-beige rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <ShoppingBag size={64} />
                  <p className="text-lg">ตระกร้าว่างเปล่า...<br />ลองเลือกเมนูที่ชอบดูสิ!</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-bold">{item.name}</h4>
                        <p className="text-brand-green font-bold">฿{item.price * item.quantity}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-white rounded-full px-3 py-1 border border-brand-beige">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="text-brand-brown hover:text-brand-green"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="text-brand-brown hover:text-brand-green"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-red-400 hover:text-red-600 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-brand-beige bg-white space-y-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>ราคารวมทั้งหมด</span>
                  <span className="text-brand-green">฿{total}</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full rounded-full bg-brand-green text-white py-4 font-semibold shadow-lg hover:bg-brand-green-dark transition-all"
                >
                  ไปหน้าชำระเงิน ✨
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const AuthModal = ({ 
  isOpen, 
  onClose, 
  onLogin 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  onLogin: (user: User) => void 
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    onLogin({ 
      name: formData.name || 'คุณลูกค้า', 
      email: formData.email 
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-brand-cream z-[70] shadow-2xl rounded-[2.5rem] overflow-hidden border border-brand-beige"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl">{isLogin ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}</h2>
                <button onClick={onClose} className="p-2 hover:bg-brand-beige rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-1 ml-2">ชื่อของคุณ</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-5 py-3 rounded-2xl bg-white border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all" 
                      placeholder="ระบุชื่อ-นามสกุล" 
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-1 ml-2">อีเมล</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-3 rounded-2xl bg-white border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all" 
                    placeholder="example@mail.com" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 ml-2">รหัสผ่าน</label>
                  <input 
                    required
                    type="password" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-5 py-3 rounded-2xl bg-white border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all" 
                    placeholder="••••••••" 
                  />
                </div>
                
                <button className="w-full rounded-full bg-brand-green text-white py-4 font-semibold shadow-lg hover:bg-brand-green-dark transition-all mt-4">
                  {isLogin ? 'เข้าสู่ระบบ ✨' : 'สมัครสมาชิก ✨'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-brand-brown/60 hover:text-brand-green transition-colors"
                >
                  {isLogin ? 'ยังไม่มีบัญชี? สมัครสมาชิกที่นี่' : 'มีบัญชีอยู่แล้ว? เข้าสู่ระบบที่นี่'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Hero = ({ onExplore }: { onExplore: () => void }) => (
  <section className="pt-32 pb-16 px-4">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1 bg-brand-green/20 text-brand-green-dark rounded-full text-sm font-semibold mb-4">
          ✨ รสชาติไทยแท้ ต้นตำรับ
        </span>
        <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
          ยินดีต้อนรับสู่ <br />
          <span className="text-brand-green">Siam Savor</span>
        </h1>
        <p className="text-lg text-brand-brown/80 mb-8 max-w-md">
          สัมผัสความอบอุ่นของการต้อนรับแบบไทย และรสชาติที่จัดจ้านจากสูตรดั้งเดิมของเรา ปรุงด้วยความใส่ใจและวัตถุดิบที่สดใหม่ทุกวัน
        </p>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={onExplore}
            className="rounded-full bg-brand-green text-white px-8 py-4 font-semibold shadow-lg hover:bg-brand-green-dark transition-all flex items-center gap-2 group"
          >
            ดูเมนูอาหาร <span className="group-hover:translate-x-1 transition-transform">🍜</span>
          </button>
          <button className="rounded-full border-2 border-brand-beige px-8 py-4 font-semibold hover:bg-brand-beige transition-all flex items-center gap-2">
            จองโต๊ะ 🥗
          </button>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="w-full aspect-square rounded-[2rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
          <img 
            src="https://picsum.photos/seed/thai-restaurant-view/800/800" 
            alt="วิวร้านอาหาร Siam Savor" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden lg:block">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <img key={i} src={`https://i.pravatar.cc/40?img=${i+10}`} className="w-8 h-8 rounded-full border-2 border-white" />
              ))}
            </div>
            <p className="text-sm font-medium">ลูกค้าประทับใจกว่า 500+ ท่าน</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const MenuSection = ({ onAddToCart }: { onAddToCart: (item: MenuItem) => void }) => {
  const [filter, setFilter] = useState<Category>('ทั้งหมด');
  const categories: Category[] = ['ทั้งหมด', 'อาหารทานเล่น', 'อาหารจานหลัก', 'ของหวาน', 'เครื่องดื่ม'];

  const filteredItems = filter === 'ทั้งหมด' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === filter);

  const getCategoryIcon = (cat: Category) => {
    switch(cat) {
      case 'อาหารทานเล่น': return '🥗';
      case 'อาหารจานหลัก': return '🍜';
      case 'ของหวาน': return '🍰';
      case 'เครื่องดื่ม': return '🧋';
      default: return '✨';
    }
  };

  return (
    <section className="py-20 px-4 bg-brand-beige/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4">เมนูแนะนำของเรา</h2>
          <p className="text-brand-brown/60">คัดสรรเมนูพิเศษเพื่อมื้ออาหารที่สมบูรณ์แบบของคุณ</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-6 py-2 transition-all flex items-center gap-2 ${
                filter === cat 
                ? 'bg-brand-green text-white shadow-md scale-105' 
                : 'bg-white text-brand-brown hover:bg-brand-beige'
              }`}
            >
              <span>{getCategoryIcon(cat)}</span>
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-brand-green">
                    ฿{item.price}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl">{item.name}</h3>
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  <p className="text-sm text-brand-brown/60 line-clamp-2 mb-4">
                    {item.description}
                  </p>
                  <button 
                    onClick={() => onAddToCart(item)}
                    className="w-full rounded-full bg-brand-beige/50 py-2 text-sm font-semibold hover:bg-brand-green hover:text-white transition-colors"
                  >
                    สั่งอาหาร
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-6">แวะมาหาเรา</h2>
            <p className="text-brand-brown/70 mb-8">
              เรายินดีต้อนรับคุณเสมอ! มาสัมผัสประสบการณ์อาหารไทยที่ดีที่สุดในย่านนี้
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">ที่ตั้ง</h4>
                  <p className="text-brand-brown/60">123 ถนนสุขุมวิท, กรุงเทพมหานคร, ประเทศไทย</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">เวลาทำการ</h4>
                  <p className="text-brand-brown/60">จันทร์ - อาทิตย์: 11:00 น. - 22:00 น.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">ติดต่อ</h4>
                  <p className="text-brand-brown/60">02-123-4567</p>
                  <p className="text-brand-brown/60">hello@siamsavor.com</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button className="w-10 h-10 rounded-full bg-brand-brown text-white flex items-center justify-center hover:scale-110 transition-transform">
                <Instagram size={20} />
              </button>
              <button className="w-10 h-10 rounded-full bg-brand-brown text-white flex items-center justify-center hover:scale-110 transition-transform">
                <span className="font-bold text-xs">FB</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-[2rem] shadow-xl border border-brand-beige min-h-[400px] flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <h3 className="text-2xl mb-6">ส่งข้อความหาเรา</h3>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-sm font-medium mb-1">ชื่อของคุณ</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-2xl bg-brand-cream border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all" placeholder="ระบุชื่อของคุณ" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">อีเมล</label>
                      <input required type="email" className="w-full px-4 py-3 rounded-2xl bg-brand-cream border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">ข้อความ</label>
                      <textarea required rows={4} className="w-full px-4 py-3 rounded-2xl bg-brand-cream border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all" placeholder="เราสามารถช่วยอะไรคุณได้บ้าง?"></textarea>
                    </div>
                    <button className="w-full rounded-full bg-brand-green text-white py-4 font-semibold shadow-lg hover:bg-brand-green-dark transition-all">
                      ส่งข้อความ ✨
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-2xl mb-2">ส่งข้อความสำเร็จ!</h3>
                  <p className="text-brand-brown/60 mb-8">
                    ขอบคุณที่ติดต่อเรา เราจะรีบตอบกลับคุณโดยเร็วที่สุด
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-brand-green font-semibold hover:underline"
                  >
                    ส่งข้อความอื่นเพิ่มเติม
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-brand-brown text-brand-cream py-12 px-4">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white">
          <span className="text-sm">🍜</span>
        </div>
        <span className="font-display text-xl tracking-tight">Siam Savor</span>
      </div>
      
      <p className="text-brand-cream/60 text-sm">
        © {new Date().getFullYear()} Siam Savor Thai Restaurant. สงวนลิขสิทธิ์.
      </p>

      <div className="flex gap-6 text-sm font-medium">
        <a href="#" className="hover:text-brand-green transition-colors">นโยบายความเป็นส่วนตัว</a>
        <a href="#" className="hover:text-brand-green transition-colors">เงื่อนไขการใช้บริการ</a>
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen selection:bg-brand-green/30">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => setUser(null)}
      />
      
      <main>
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero onExplore={() => setActiveTab('menu')} />
              <div className="py-12 bg-brand-green/5">
                <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                  <span className="font-display text-2xl">มิชลิน ไกด์</span>
                  <span className="font-display text-2xl">Thai Select</span>
                  <span className="font-display text-2xl">สุดยอดร้านอาหารกรุงเทพฯ</span>
                </div>
              </div>
              <MenuSection onAddToCart={addToCart} />
              <ContactSection />
            </motion.div>
          )}

          {activeTab === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-20"
            >
              <MenuSection onAddToCart={addToCart} />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-20"
            >
              <ContactSection />
            </motion.div>
          )}

          {activeTab === 'checkout' && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-20"
            >
              <CheckoutSection 
                items={cart} 
                total={cart.reduce((sum, i) => sum + (i.price * i.quantity), 0)}
                onComplete={() => {
                  setCart([]);
                  setActiveTab('success');
                }}
                onBack={() => setActiveTab('menu')}
              />
            </motion.div>
          )}

          {activeTab === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-20"
            >
              <SuccessSection onHome={() => setActiveTab('home')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setActiveTab('checkout');
        }}
      />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLogin={setUser}
      />

      <Footer />
    </div>
  );
}
