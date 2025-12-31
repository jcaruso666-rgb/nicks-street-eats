import { useState, createContext, useContext, ReactNode } from "react";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'hotdog' | 'potato';
  image?: string;
}

interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customizations: string[];
  specialInstructions: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | null>(null);

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems(prev => [...prev, item]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => {
    const toppingsCost = item.customizations.length * 0.75;
    return sum + (item.menuItem.price + toppingsCost) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

const MENU: MenuItem[] = [
  { id: "chicago", name: "Chicago Dog", price: 6.50, description: "Yellow mustard, neon green relish, onions, tomato, pickle spear, sport peppers, celery salt on a poppy seed bun", category: 'hotdog', image: './chicago-dog-oXvA-.png' },
  { id: "coney", name: "Coney Dog", price: 6.00, description: "Meaty chili, diced onions, and yellow mustard", category: 'hotdog', image: './coney-dog-rRkEt.png' },
  { id: "newyork", name: "New York Dog", price: 5.50, description: "Sauerkraut, spicy brown mustard, and onion sauce", category: 'hotdog' },
  { id: "classic", name: "Classic Dog", price: 4.50, description: "Your choice of ketchup, mustard, relish, and onions", category: 'hotdog' },
  { id: "loaded", name: "Fully Loaded Potato", price: 8.50, description: "Butter, sour cream, cheddar cheese, bacon bits, chives", category: 'potato' },
  { id: "chili-potato", name: "Chili Cheese Spud", price: 9.00, description: "Famous chili, melted cheddar, sour cream, diced onions", category: 'potato' },
  { id: "bbq-potato", name: "BBQ Pulled Pork Potato", price: 9.50, description: "Slow-smoked pulled pork, tangy BBQ sauce, coleslaw", category: 'potato' },
  { id: "veggie-potato", name: "Garden Fresh Potato", price: 7.50, description: "Steamed broccoli, mushrooms, peppers, cheese sauce", category: 'potato' },
];

const EXTRA_TOPPINGS = {
  hotdog: ['Extra Chili', 'Jalapeños', 'Extra Cheese', 'Bacon', 'Sauerkraut', 'Grilled Onions'],
  potato: ['Extra Cheese', 'Extra Bacon', 'Jalapeños', 'Extra Sour Cream', 'Green Onions', 'Pulled Pork']
};

function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-[#1a1a1a] sticky top-0 z-50 border-b-4 border-[#d4a10a]">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="font-['Permanent_Marker',_cursive] text-[#d4a10a] text-xl md:text-2xl">
          Nick's Street Eats
        </a>
        <a 
          href="#cart" 
          className="relative flex items-center gap-2 px-4 py-2 bg-[#c8442d] text-white font-['Oswald',_sans-serif] font-bold uppercase tracking-wider hover:bg-[#d4a10a] hover:text-[#1a1a1a] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Cart
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#d4a10a] text-[#1a1a1a] rounded-full text-xs flex items-center justify-center font-bold">
              {itemCount}
            </span>
          )}
        </a>
      </div>
    </header>
  );
}

function MenuItemCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  const [showCustomize, setShowCustomize] = useState(false);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');

  const handleAddToCart = () => {
    addItem({
      id: `${item.id}-${Date.now()}`,
      menuItem: item,
      quantity,
      customizations: selectedToppings,
      specialInstructions: instructions,
    });
    setShowCustomize(false);
    setSelectedToppings([]);
    setQuantity(1);
    setInstructions('');
  };

  const toggleTopping = (topping: string) => {
    setSelectedToppings(prev => 
      prev.includes(topping) 
        ? prev.filter(t => t !== topping)
        : [...prev, topping]
    );
  };

  const toppings = EXTRA_TOPPINGS[item.category];
  const itemTotal = (item.price + selectedToppings.length * 0.75) * quantity;

  return (
    <>
      <div 
        className="bg-[#2a2a2a] group hover:bg-[#333] transition-colors cursor-pointer"
        onClick={() => setShowCustomize(true)}
      >
        {item.image && (
          <div className="aspect-square overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-['Oswald',_sans-serif] text-lg font-bold text-white group-hover:text-[#d4a10a] transition-colors">
              {item.name}
            </h3>
            <span className="font-['Permanent_Marker',_cursive] text-[#d4a10a] text-xl">
              ${item.price.toFixed(2)}
            </span>
          </div>
          <p className="font-['Merriweather',_serif] text-white/60 text-sm leading-relaxed mb-4">
            {item.description}
          </p>
          <button className="w-full py-2 bg-[#c8442d] text-white font-['Oswald',_sans-serif] uppercase tracking-wider text-sm hover:bg-[#d4a10a] hover:text-[#1a1a1a] transition-colors">
            Add to Order
          </button>
        </div>
      </div>

      {/* Customization Modal */}
      {showCustomize && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setShowCustomize(false)}>
          <div 
            className="bg-[#1a1a1a] max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {item.image && (
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-['Oswald',_sans-serif] text-2xl font-bold text-white">{item.name}</h3>
                  <p className="font-['Merriweather',_serif] text-white/60 text-sm mt-1">{item.description}</p>
                </div>
                <button onClick={() => setShowCustomize(false)} className="text-white/50 hover:text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block font-['Oswald',_sans-serif] text-white/80 text-sm uppercase tracking-wider mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-[#2a2a2a] text-white font-bold hover:bg-[#3a3a3a] transition-colors"
                  >
                    -
                  </button>
                  <span className="font-['Oswald',_sans-serif] text-white text-xl w-8 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-[#2a2a2a] text-white font-bold hover:bg-[#3a3a3a] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Extra Toppings */}
              <div className="mb-6">
                <label className="block font-['Oswald',_sans-serif] text-white/80 text-sm uppercase tracking-wider mb-3">
                  Extra Toppings (+$0.75 each)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {toppings.map(topping => (
                    <button
                      key={topping}
                      onClick={() => toggleTopping(topping)}
                      className={`px-3 py-2 text-sm font-['Oswald',_sans-serif] uppercase tracking-wide transition-colors ${
                        selectedToppings.includes(topping)
                          ? 'bg-[#d4a10a] text-[#1a1a1a]'
                          : 'bg-[#2a2a2a] text-white/70 hover:bg-[#3a3a3a]'
                      }`}
                    >
                      {topping}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Instructions */}
              <div className="mb-6">
                <label className="block font-['Oswald',_sans-serif] text-white/80 text-sm uppercase tracking-wider mb-3">
                  Special Instructions
                </label>
                <textarea
                  value={instructions}
                  onChange={e => setInstructions(e.target.value)}
                  placeholder="Any allergies or special requests?"
                  rows={2}
                  className="w-full px-4 py-3 bg-[#2a2a2a] border-2 border-[#3a3a3a] text-white font-['Merriweather',_serif] text-sm focus:border-[#d4a10a] focus:outline-none resize-none"
                />
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#c8442d] text-white font-['Oswald',_sans-serif] text-lg font-bold uppercase tracking-wider hover:bg-[#d4a10a] hover:text-[#1a1a1a] transition-colors flex justify-between items-center px-6"
              >
                <span>Add to Cart</span>
                <span>${itemTotal.toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MenuSection() {
  const [filter, setFilter] = useState<'all' | 'hotdog' | 'potato'>('all');

  const filteredItems = MENU.filter(item => 
    filter === 'all' || item.category === filter
  );

  return (
    <section className="py-12 bg-[#1a1a1a] min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="font-['Permanent_Marker',_cursive] text-4xl md:text-5xl text-white mb-2">
            Order Online
          </h1>
          <p className="font-['Merriweather',_serif] text-white/60">
            Pickup at 1616 N Bell Street, Fremont
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {[
            { key: 'all', label: 'All Items' },
            { key: 'hotdog', label: '🌭 Hot Dogs' },
            { key: 'potato', label: '🥔 Potatoes' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as typeof filter)}
              className={`px-5 py-2 font-['Oswald',_sans-serif] text-sm uppercase tracking-wider transition-colors ${
                filter === tab.key
                  ? 'bg-[#c8442d] text-white'
                  : 'bg-[#2a2a2a] text-white/70 hover:bg-[#3a3a3a]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [step, setStep] = useState<'cart' | 'details' | 'confirm'>('cart');
  const [pickupTime, setPickupTime] = useState('');
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', email: '' });
  const [orderNumber, setOrderNumber] = useState('');

  const handleCheckout = () => {
    if (items.length === 0) return;
    setStep('details');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const num = `NSE-${Date.now().toString().slice(-6)}`;
    setOrderNumber(num);
    setStep('confirm');
    clearCart();
  };

  if (step === 'confirm') {
    return (
      <section id="cart" className="py-12 bg-[#f5e6c8]">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="bg-white p-8 md:p-12 shadow-lg">
            <span className="text-6xl mb-6 block">🎉</span>
            <h2 className="font-['Permanent_Marker',_cursive] text-3xl text-[#1a1a1a] mb-4">
              Order Confirmed!
            </h2>
            <p className="font-['Oswald',_sans-serif] text-[#c8442d] text-xl font-bold mb-2">
              Order #{orderNumber}
            </p>
            <p className="font-['Merriweather',_serif] text-[#3d3d3d] mb-6">
              We'll have your food ready at the time you selected. See you soon!
            </p>
            <div className="bg-[#f5e6c8] p-4 mb-6">
              <p className="font-['Oswald',_sans-serif] text-sm uppercase tracking-wider text-[#1a1a1a]/70">Pickup Location</p>
              <p className="font-['Merriweather',_serif] text-[#1a1a1a] font-bold">1616 N Bell Street, Fremont, NE</p>
            </div>
            <a 
              href="/order" 
              onClick={() => window.location.reload()}
              className="inline-block px-8 py-3 bg-[#c8442d] text-white font-['Oswald',_sans-serif] font-bold uppercase tracking-wider hover:bg-[#1a1a1a] transition-colors"
            >
              Order More
            </a>
          </div>
        </div>
      </section>
    );
  }

  if (step === 'details') {
    return (
      <section id="cart" className="py-12 bg-[#f5e6c8]">
        <div className="max-w-xl mx-auto px-4">
          <button 
            onClick={() => setStep('cart')}
            className="flex items-center gap-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a] font-['Oswald',_sans-serif] uppercase tracking-wider text-sm mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Cart
          </button>
          
          <div className="bg-white p-6 md:p-8 shadow-lg">
            <h2 className="font-['Permanent_Marker',_cursive] text-2xl text-[#1a1a1a] mb-6">
              Pickup Details
            </h2>
            
            <form onSubmit={handlePlaceOrder}>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block font-['Oswald',_sans-serif] text-[#1a1a1a]/80 text-sm uppercase tracking-wider mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-[#1a1a1a]/20 font-['Merriweather',_serif] focus:border-[#c8442d] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-['Oswald',_sans-serif] text-[#1a1a1a]/80 text-sm uppercase tracking-wider mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-[#1a1a1a]/20 font-['Merriweather',_serif] focus:border-[#c8442d] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-['Oswald',_sans-serif] text-[#1a1a1a]/80 text-sm uppercase tracking-wider mb-2">Email</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-[#1a1a1a]/20 font-['Merriweather',_serif] focus:border-[#c8442d] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-['Oswald',_sans-serif] text-[#1a1a1a]/80 text-sm uppercase tracking-wider mb-2">Pickup Time *</label>
                  <select
                    required
                    value={pickupTime}
                    onChange={e => setPickupTime(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#1a1a1a]/20 font-['Merriweather',_serif] focus:border-[#c8442d] focus:outline-none bg-white"
                  >
                    <option value="">Select a time</option>
                    <option value="asap">ASAP (15-20 min)</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="1:00">1:00 PM</option>
                    <option value="1:30">1:30 PM</option>
                    <option value="2:00">2:00 PM</option>
                    <option value="2:30">2:30 PM</option>
                    <option value="3:00">3:00 PM</option>
                    <option value="3:30">3:30 PM</option>
                  </select>
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t-2 border-[#1a1a1a]/10 pt-6 mb-6">
                <h3 className="font-['Oswald',_sans-serif] text-lg font-bold text-[#1a1a1a] mb-3">Order Summary</h3>
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm mb-2">
                    <span className="font-['Merriweather',_serif] text-[#3d3d3d]">
                      {item.quantity}x {item.menuItem.name}
                      {item.customizations.length > 0 && (
                        <span className="text-[#1a1a1a]/50"> (+{item.customizations.length} extras)</span>
                      )}
                    </span>
                    <span className="font-['Oswald',_sans-serif] text-[#1a1a1a]">
                      ${((item.menuItem.price + item.customizations.length * 0.75) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between font-bold mt-4 pt-4 border-t border-[#1a1a1a]/10">
                  <span className="font-['Oswald',_sans-serif] text-lg">Total</span>
                  <span className="font-['Permanent_Marker',_cursive] text-[#c8442d] text-xl">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#c8442d] text-white font-['Oswald',_sans-serif] text-lg font-bold uppercase tracking-wider hover:bg-[#1a1a1a] transition-colors"
              >
                Place Order
              </button>
              <p className="text-center font-['Merriweather',_serif] text-[#1a1a1a]/50 text-xs mt-4">
                Pay at pickup • Cash or card accepted
              </p>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cart" className="py-12 bg-[#f5e6c8]">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="font-['Permanent_Marker',_cursive] text-3xl text-[#1a1a1a] mb-6">
          Your Cart
        </h2>

        {items.length === 0 ? (
          <div className="bg-white p-12 text-center shadow-lg">
            <span className="text-5xl mb-4 block">🛒</span>
            <p className="font-['Merriweather',_serif] text-[#3d3d3d] mb-4">Your cart is empty</p>
            <p className="font-['Oswald',_sans-serif] text-[#1a1a1a]/50 text-sm">
              Add some delicious items from the menu above!
            </p>
          </div>
        ) : (
          <div className="bg-white shadow-lg">
            {items.map(item => (
              <div key={item.id} className="p-4 border-b border-[#1a1a1a]/10 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-['Oswald',_sans-serif] text-lg font-bold text-[#1a1a1a]">
                      {item.menuItem.name}
                    </h4>
                    {item.customizations.length > 0 && (
                      <p className="font-['Merriweather',_serif] text-[#1a1a1a]/60 text-sm">
                        +{item.customizations.join(', ')}
                      </p>
                    )}
                    {item.specialInstructions && (
                      <p className="font-['Merriweather',_serif] text-[#c8442d]/80 text-sm italic">
                        "{item.specialInstructions}"
                      </p>
                    )}
                  </div>
                  <span className="font-['Permanent_Marker',_cursive] text-[#c8442d] text-lg">
                    ${((item.menuItem.price + item.customizations.length * 0.75) * item.quantity).toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-[#f5e6c8] text-[#1a1a1a] font-bold hover:bg-[#d4a10a] transition-colors"
                    >
                      -
                    </button>
                    <span className="font-['Oswald',_sans-serif] text-[#1a1a1a] w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-[#f5e6c8] text-[#1a1a1a] font-bold hover:bg-[#d4a10a] transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-[#c8442d]/70 hover:text-[#c8442d] font-['Oswald',_sans-serif] text-sm uppercase tracking-wider"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            
            {/* Total & Checkout */}
            <div className="p-6 bg-[#1a1a1a]">
              <div className="flex justify-between items-center mb-4">
                <span className="font-['Oswald',_sans-serif] text-white text-lg uppercase tracking-wider">Total</span>
                <span className="font-['Permanent_Marker',_cursive] text-[#d4a10a] text-2xl">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-[#c8442d] text-white font-['Oswald',_sans-serif] text-lg font-bold uppercase tracking-wider hover:bg-[#d4a10a] hover:text-[#1a1a1a] transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Order() {
  return (
    <CartProvider>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;1,400&family=Oswald:wght@400;600;700&family=Permanent+Marker&display=swap" rel="stylesheet" />
      
      <div className="min-h-screen bg-[#1a1a1a]">
        <Header />
        <MenuSection />
        <Cart />
        
        {/* Footer */}
        <footer className="py-8 bg-[#0f0f0f]">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <a href="/" className="font-['Permanent_Marker',_cursive] text-[#d4a10a] text-xl">Nick's Street Eats</a>
            <p className="font-['Oswald',_sans-serif] text-white/50 text-sm mt-2">
              1616 N Bell Street, Fremont, NE • Wed–Sat 11am–4pm
            </p>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

export default Order;
