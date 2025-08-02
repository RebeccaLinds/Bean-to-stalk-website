import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, Truck, Shield, Package, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  price: string;
  quantity: number;
  category: string;
  dimensions?: 'square' | 'tall' | 'standard';
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "Whimsical Forest Friends",
      subtitle: "A Magical Coloring Adventure",
      image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QY4pC1bXF9DmtbNXsArH12R8T3wZkySUOzLJa",
      price: "$12.99",
      quantity: 1,
      category: "Coloring Book",
      dimensions: "square"
    },
    {
      id: 2,
      title: "Young Explorer's Guide",
      subtitle: "Wilderness & Outdoor Survival Skills",
      image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QX04mrYDq6LNxoUOFZd9TCWiKzRth0P8jDu4g",
      price: "$24.99",
      quantity: 2,
      category: "Educational",
      dimensions: "tall"
    },
    {
      id: 4,
      title: "The Bear and His Magic",
      subtitle: "A Magical Adventure Story",
      image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QCFQJwGtnzU1oGdab2YqAOQujwNDJpixZgXmf",
      price: "$19.99",
      quantity: 1,
      category: "Story Book",
      dimensions: "square"
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getItemTotal = (price: string, quantity: number) => {
    const numPrice = parseFloat(price.replace('$', ''));
    return numPrice * quantity;
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + getItemTotal(item.price, item.quantity);
    }, 0);
  };

  const subtotal = getSubtotal();
  const shipping = subtotal > 25 ? 0 : 4.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any books to your cart yet.
            </p>
            <button
              onClick={() => navigate('/books')}
              className="bg-emerald-600 text-white px-8 py-3 rounded-full hover:bg-emerald-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/books')}
            className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continue Shopping
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => {
              return (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-start space-x-6">
                    {/* Book Image with Dynamic Dimensions */}
                    <div className="flex-shrink-0">
                      <div 
                        className={`relative bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 ${
                          item.dimensions === 'square' ? 'w-24 aspect-square' : 'w-16 aspect-7/10'
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => {
                            console.error(`Failed to load image for ${item.title}:`, e);
                            e.currentTarget.src = "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QyaPpazYowXdrJHpBFgYnuWS5G3T8NLzP1M9O";
                          }}
                        />
                        
                        {/* Book spine effect */}
                        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-r from-black/15 to-transparent"></div>
                      </div>
                    </div>

                    {/* Book Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                          <p className="text-gray-600">{item.subtitle}</p>
                          <span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium mt-2">
                            {item.category}
                          </span>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                          title="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-emerald-600">
                            ${getItemTotal(item.price, item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.price} each
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-gray-400">
                              {item.quantity} × {item.price}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Free Shipping Progress */}
              {subtotal < 25 && subtotal > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-emerald-700">Free Shipping Progress</span>
                    <span className="text-sm text-emerald-600">
                      ${(25 - subtotal).toFixed(2)} to go
                    </span>
                  </div>
                  <div className="w-full bg-emerald-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((subtotal / 25) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-emerald-600">
                    Add ${(25 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                  </span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-emerald-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-emerald-600 text-white py-4 rounded-full hover:bg-emerald-700 transition-colors flex items-center justify-center font-semibold text-lg mb-4">
                <CreditCard className="h-5 w-5 mr-2" />
                Proceed to Checkout
              </button>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Secure checkout powered by Stripe
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Order Benefits</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Truck className="h-4 w-4 text-emerald-500 mr-3" />
                    Free US + Canada shipping *on orders over $25 (USD)
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-emerald-500 mr-3" />
                    30-day return policy
                  </li>
                  <li className="flex items-center">
                    <Package className="h-4 w-4 text-emerald-500 mr-3" />
                    Secure payment processing
                  </li>
                  <li className="flex items-center">
                    <CreditCard className="h-4 w-4 text-emerald-500 mr-3" />
                    Digital receipts and tracking
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;