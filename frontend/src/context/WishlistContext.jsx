import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext(null);

const WISHLIST_KEY = "avshopWishlist";
const LOGIN_KEY = "avshopLoggedIn";

const isUserLoggedIn = () => {
  return localStorage.getItem(LOGIN_KEY) === "true";
};

const getSavedWishlist = () => {
  if (!isUserLoggedIn()) {
    localStorage.removeItem(WISHLIST_KEY);
    return [];
  }

  try {
    const savedWishlist =
      localStorage.getItem(WISHLIST_KEY);

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];
  } catch (error) {
    console.error(
      "Failed to load wishlist:",
      error
    );

    localStorage.removeItem(WISHLIST_KEY);

    return [];
  }
};

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] =
    useState(getSavedWishlist);

  // Login hone par save karo
  // Guest hone par localStorage se remove karo
  useEffect(() => {
    if (isUserLoggedIn()) {
      localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(wishlist)
      );
    } else {
      localStorage.removeItem(WISHLIST_KEY);
    }
  }, [wishlist]);

  // Add to Wishlist
  const addToWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return currentWishlist;
      }

      return [
        ...currentWishlist,
        product,
      ];
    });
  };

  // Remove from Wishlist
  const removeFromWishlist = (id) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter(
        (item) => item.id !== id
      )
    );
  };

  // Clear complete Wishlist
  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem(WISHLIST_KEY);
  };

  // Check product Wishlist me hai ya nahi
  const isInWishlist = (id) => {
    return wishlist.some(
      (item) => item.id === id
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context =
    useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}