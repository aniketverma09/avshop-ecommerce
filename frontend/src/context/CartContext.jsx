import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext(null);

const CART_KEY = "avshopCart";
const LOGIN_KEY = "avshopLoggedIn";

const isUserLoggedIn = () => {
  return localStorage.getItem(LOGIN_KEY) === "true";
};

const getSavedCart = () => {
  // Guest user ke liye cart kabhi load nahi hoga
  if (!isUserLoggedIn()) {
    localStorage.removeItem(CART_KEY);
    return [];
  }

  try {
    const savedCart = localStorage.getItem(CART_KEY);

    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Failed to load cart:", error);
    localStorage.removeItem(CART_KEY);
    return [];
  }
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(getSavedCart);

  // Login hone par localStorage me save karo
  // Guest hone par localStorage se cart remove karo
  useEffect(() => {
    if (isUserLoggedIn()) {
      localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
      );
    } else {
      localStorage.removeItem(CART_KEY);
    }
  }, [cart]);

  // Add to Cart
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // Remove complete product
  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    );
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  // Clear complete cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_KEY);
  };

  // Total price
  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) * item.quantity,
    0
  );

  // Total items
  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}