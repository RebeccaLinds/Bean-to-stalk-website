import React, { useState, useCallback, useMemo, useEffect } from 'react';

interface CartItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  price: string;
  quantity: number;
  category: string;
  dimensions?: 'square' | 'tall' | 'standard';
  type: 'book' | 'course' | 'product';
  maxQuantity?: number;
}

interface CartTotals {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}

interface CartState {
  items: CartItem[];
  totals: CartTotals;
  isUpdating: boolean;
  lastUpdated: Date;
}

const SHIPPING_THRESHOLD = 25;
const SHIPPING_COST = 4.99;
const TAX_RATE = 0.08;
const MAX_QUANTITY_DEFAULT = 10;
const STORAGE_KEY = 'bean-to-stalk-cart';

// Cross-tab synchronization
const STORAGE_EVENT = 'cart-updated';

export const useCart = () => {
  const [cartState, setCartState] = useState<CartState>(() => {
    // Initialize from localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...parsed,
          lastUpdated: new Date(parsed.lastUpdated),
          isUpdating: false
        };
      }
    } catch (error) {
      console.warn('Failed to load cart from localStorage:', error);
    }

    return {
      items: [
        {
          id: 1,
          title: "Whimsical Forest Friends",
          subtitle: "A Magical Coloring Adventure",
          image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QY4pC1bXF9DmtbNXsArH12R8T3wZkySUOzLJa",
          price: "$12.99",
          quantity: 1,
          category: "Coloring Book",
          dimensions: "square",
          type: "book",
          maxQuantity: 5
        },
        {
          id: 2,
          title: "Young Explorer's Guide",
          subtitle: "Wilderness & Outdoor Survival Skills",
          image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QKXUClY8yiOYgGWJN48dnRt3vrMsV6Tek1Zfx",
          price: "$24.99",
          quantity: 2,
          category: "Educational",
          dimensions: "tall",
          type: "book",
          maxQuantity: 3
        },
        {
          id: 4,
          title: "The Bear and His Magic",
          subtitle: "A Magical Adventure Story",
          image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QyaPpazYowXdrJHpBFgYnuWS5G3T8NLzP1M9O",
          price: "$19.99",
          quantity: 1,
          category: "Story Book",
          dimensions: "square",
          type: "book",
          maxQuantity: 5
        }
      ],
      totals: {
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0,
        itemCount: 0
      },
      isUpdating: false,
      lastUpdated: new Date()
    };
  });

  // Parse price string to number
  const parsePrice = useCallback((priceString: string): number => {
    const cleaned = priceString.replace(/[$,]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }, []);

  // Format number to price string
  const formatPrice = useCallback((amount: number): string => {
    return `$${amount.toFixed(2)}`;
  }, []);

  // Calculate totals with real-time updates
  const calculateTotals = useCallback((items: CartItem[]): CartTotals => {
    const subtotal = items.reduce((total, item) => {
      return total + (parsePrice(item.price) * item.quantity);
    }, 0);

    const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      shipping: Math.round(shipping * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      total: Math.round(total * 100) / 100,
      itemCount
    };
  }, [parsePrice]);

  // Save to localStorage and broadcast changes
  const saveCartState = useCallback((newState: CartState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      
      // Broadcast to other tabs
      window.dispatchEvent(new CustomEvent(STORAGE_EVENT, {
        detail: newState
      }));
    } catch (error) {
      console.warn('Failed to save cart to localStorage:', error);
    }
  }, []);

  // Update cart state with automatic total recalculation
  const updateCartState = useCallback((newItems: CartItem[]) => {
    const newState = {
      items: newItems,
      totals: calculateTotals(newItems),
      lastUpdated: new Date(),
      isUpdating: false
    };
    
    setCartState(newState);
    saveCartState(newState);
  }, [calculateTotals, saveCartState]);

  // Set updating state temporarily for visual feedback
  const setUpdating = useCallback(() => {
    setCartState(prevState => ({
      ...prevState,
      isUpdating: true
    }));
  }, []);

  // Check for duplicate items
  const isDuplicateItem = useCallback((newItem: Omit<CartItem, 'quantity'>, existingItems: CartItem[]): boolean => {
    return existingItems.some(item => 
      item.id === newItem.id && 
      item.type === newItem.type
    );
  }, []);

  // Validate item stock/availability
  const validateItemAvailability = useCallback((item: Omit<CartItem, 'quantity'>, quantity: number): { isValid: boolean; error?: string } => {
    // Simulate stock check - in real app, this would be an API call
    const maxQuantity = item.maxQuantity || MAX_QUANTITY_DEFAULT;
    
    if (quantity > maxQuantity) {
      return {
        isValid: false,
        error: `Maximum quantity of ${maxQuantity} allowed for ${item.title}`
      };
    }

    // Simulate out of stock check
    if (item.type === 'course' && quantity > 1) {
      return {
        isValid: false,
        error: 'Only one enrollment per course is allowed'
      };
    }

    return { isValid: true };
  }, []);

  // Update quantity with real-time price updates
  const updateQuantity = useCallback(async (id: number, newQuantity: number): Promise<{ success: boolean; error?: string }> => {
    if (!Number.isInteger(newQuantity) || newQuantity < 0) {
      return { success: false, error: 'Invalid quantity provided' };
    }

    setUpdating();

    try {
      // Remove item if quantity is 0
      if (newQuantity === 0) {
        const newItems = cartState.items.filter(item => item.id !== id);
        updateCartState(newItems);
        return { success: true };
      }

      const newItems = cartState.items.map(item => {
        if (item.id === id) {
          const validation = validateItemAvailability(item, newQuantity);
          if (!validation.isValid) {
            throw new Error(validation.error);
          }

          const maxQuantity = item.maxQuantity || MAX_QUANTITY_DEFAULT;
          const validatedQuantity = Math.min(newQuantity, maxQuantity);
          
          return {
            ...item,
            quantity: validatedQuantity
          };
        }
        return item;
      });

      updateCartState(newItems);
      return { success: true };
    } catch (error) {
      setCartState(prevState => ({ ...prevState, isUpdating: false }));
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update quantity' 
      };
    }
  }, [cartState.items, setUpdating, updateCartState, validateItemAvailability]);

  // Remove item with real-time price updates
  const removeItem = useCallback(async (id: number): Promise<{ success: boolean; error?: string }> => {
    setUpdating();
    
    try {
      const newItems = cartState.items.filter(item => item.id !== id);
      updateCartState(newItems);
      return { success: true };
    } catch (error) {
      setCartState(prevState => ({ ...prevState, isUpdating: false }));
      return { 
        success: false, 
        error: 'Failed to remove item from cart' 
      };
    }
  }, [cartState.items, setUpdating, updateCartState]);

  // Add item to cart with validation
  const addItem = useCallback(async (newItem: Omit<CartItem, 'quantity'>, quantity: number = 1): Promise<{ success: boolean; error?: string }> => {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return { success: false, error: 'Invalid quantity for new item' };
    }

    setUpdating();

    try {
      // Validate item availability
      const validation = validateItemAvailability(newItem, quantity);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      const existingItemIndex = cartState.items.findIndex(item => item.id === newItem.id && item.type === newItem.type);
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const existingItem = cartState.items[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;
        const maxQuantity = existingItem.maxQuantity || MAX_QUANTITY_DEFAULT;
        
        if (newQuantity > maxQuantity) {
          throw new Error(`Cannot add more. Maximum quantity of ${maxQuantity} allowed for ${existingItem.title}`);
        }
        
        const result = await updateQuantity(newItem.id, newQuantity);
        return result;
      } else {
        // Add new item
        const maxQuantity = newItem.maxQuantity || MAX_QUANTITY_DEFAULT;
        const validatedQuantity = Math.min(quantity, maxQuantity);
        
        const itemToAdd: CartItem = {
          ...newItem,
          quantity: validatedQuantity
        };
        
        const newItems = [...cartState.items, itemToAdd];
        updateCartState(newItems);
        return { success: true };
      }
    } catch (error) {
      setCartState(prevState => ({ ...prevState, isUpdating: false }));
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to add item to cart' 
      };
    }
  }, [cartState.items, setUpdating, updateCartState, validateItemAvailability, updateQuantity]);

  // Clear entire cart
  const clearCart = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    setUpdating();
    
    try {
      updateCartState([]);
      return { success: true };
    } catch (error) {
      setCartState(prevState => ({ ...prevState, isUpdating: false }));
      return { 
        success: false, 
        error: 'Failed to clear cart' 
      };
    }
  }, [setUpdating, updateCartState]);

  // Get item total price
  const getItemTotal = useCallback((item: CartItem): number => {
    const priceNumber = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return priceNumber * item.quantity;
  }, []);

  // Check if free shipping threshold is met
  const freeShippingProgress = useMemo(() => {
    const remaining = SHIPPING_THRESHOLD - cartState.totals.subtotal;
    return {
      isEligible: cartState.totals.subtotal >= SHIPPING_THRESHOLD,
      remaining: Math.max(0, remaining),
      progress: Math.min(100, (cartState.totals.subtotal / SHIPPING_THRESHOLD) * 100)
    };
  }, [cartState.totals.subtotal]);

  // Cross-tab synchronization
  useEffect(() => {
    const handleStorageChange = (e: CustomEvent) => {
      const newState = e.detail;
      setCartState({
        ...newState,
        lastUpdated: new Date(newState.lastUpdated),
        isUpdating: false
      });
    };

    window.addEventListener(STORAGE_EVENT as any, handleStorageChange);
    
    return () => {
      window.removeEventListener(STORAGE_EVENT as any, handleStorageChange);
    };
  }, []);

  // Initialize totals on first render if items exist
  useEffect(() => {
    if (cartState.totals.total === 0 && cartState.items.length > 0) {
      updateCartState(cartState.items);
    }
  }, []);

  return {
    // State
    items: cartState.items,
    totals: cartState.totals,
    isUpdating: cartState.isUpdating,
    lastUpdated: cartState.lastUpdated,
    isEmpty: cartState.items.length === 0,
    
    // Actions
    updateQuantity,
    removeItem,
    addItem,
    clearCart,
    
    // Utilities
    getItemTotal,
    formatPrice,
    parsePrice,
    freeShippingProgress,
    isDuplicateItem,
    validateItemAvailability,
    
    // Constants
    SHIPPING_THRESHOLD,
    TAX_RATE,
    MAX_QUANTITY_DEFAULT
  };
};