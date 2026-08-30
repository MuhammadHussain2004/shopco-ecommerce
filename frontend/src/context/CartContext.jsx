import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "shopco_cart";
const PROMO_STORAGE_KEY = "shopco_promo";

function lineId(item) {
  return `${item.productId}__${item.size}__${item.color}`;
}

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadPromo() {
  try {
    const raw = localStorage.getItem(PROMO_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [promo, setPromo] = useState(loadPromo);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors (e.g. private browsing quota)
    }
  }, [items]);

  useEffect(() => {
    try {
      if (promo) {
        localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(promo));
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch {
      // ignore storage errors (e.g. private browsing quota)
    }
  }, [promo]);

  const addItem = (item, quantity = 1) => {
    setItems((prev) => {
      const id = lineId(item);
      const existing = prev.find((line) => lineId(line) === id);
      if (existing) {
        return prev.map((line) =>
          lineId(line) === id
            ? { ...line, quantity: line.quantity + quantity }
            : line
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeItem = (item) => {
    const id = lineId(item);
    setItems((prev) => prev.filter((line) => lineId(line) !== id));
  };

  const updateQuantity = (item, quantity) => {
    const id = lineId(item);
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((line) => lineId(line) !== id)
        : prev.map((line) =>
            lineId(line) === id ? { ...line, quantity } : line
          )
    );
  };

  const clearCart = () => {
    setItems([]);
    setPromo(null);
  };

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    itemCount,
    promo,
    setPromo,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
