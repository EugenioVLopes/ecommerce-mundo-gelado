"use client";
import { SessionProvider } from "next-auth/react";
import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { MenuItemProps } from "./menu/MenuItem";

interface CartItem extends MenuItemProps {
  quantity: number;
}

interface CartContextType {
  cartProducts: CartItem[];
  cartTotal: number;
  addToCart: (product: MenuItemProps) => void;
  removeFromCart: (productToRemove: MenuItemProps) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemsCount: number;
}

// Função auxiliar para comparar arrays
function areArraysEqual(
  arr1: any[] | undefined,
  arr2: any[] | undefined
): boolean {
  if (!arr1 && !arr2) return true;
  if (!arr1 || !arr2) return false;
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item, index) => item === arr2[index]);
}

// Função auxiliar para comparar objetos
function areObjectsEqual(obj1: any, obj2: any): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !areObjectsEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
}

function isObject(object: any): boolean {
  return object != null && typeof object === "object";
}

// Função auxiliar para comparar produtos
function areProductsEqual(
  product1: MenuItemProps,
  product2: MenuItemProps
): boolean {
  // Comparar propriedades básicas
  if (
    product1._id !== product2._id ||
    product1.name !== product2.name ||
    product1.price !== product2.price
  ) {
    return false;
  }

  // Comparar arrays, se existirem
  const arrayProps: (keyof CartItem)[] = [
    "selectedCreams",
    "selectedFruits",
    "selectedToppings",
  ];
  for (const prop of arrayProps) {
    if (product1[prop] && prop in product2) {
      if (
        !areArraysEqual(product1[prop] as string[], product2[prop] as string[])
      ) {
        return false;
      }
    }
  }

  return true;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls) {
      const cart = ls.getItem("cart");
      if (cart) {
        const parsedCart = JSON.parse(cart);
        setCartProducts(parsedCart);
        updateTotals(parsedCart);
      }
    }
  }, [ls]);

  function updateTotals(products: CartItem[]) {
    const total = products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const count = products.reduce((sum, item) => sum + item.quantity, 0);
    setCartTotal(total);
    setItemsCount(count);
  }

  function saveCartToLocalStorage(products: CartItem[]) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(products));
    }
  }

  const addToCart = (product: MenuItemProps) => {
    setCartProducts((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex((item) =>
        areProductsEqual(item, product)
      );

      if (existingProductIndex > -1) {
        const updatedProducts = [...prevProducts];
        updatedProducts[existingProductIndex].quantity += 1;
        updateTotals(updatedProducts);
        saveCartToLocalStorage(updatedProducts);
        return updatedProducts;
      } else {
        const newProduct = { ...product, quantity: 1 };
        const updatedProducts = [...prevProducts, newProduct];
        updateTotals(updatedProducts);
        saveCartToLocalStorage(updatedProducts);
        return updatedProducts;
      }
    });
  };

  const removeFromCart = (productToRemove: string | MenuItemProps) => {
    setCartProducts((prevProducts) => {
      let updatedProducts;

      if (typeof productToRemove === "string") {
        // Se for uma string, assume que é o ID do produto
        updatedProducts = prevProducts.filter(
          (item) => item._id !== productToRemove
        );
      } else {
        // Se for um objeto MenuItemProps, usa a comparação completa
        updatedProducts = prevProducts.filter(
          (item) => !areProductsEqual(item, productToRemove)
        );
      }

      updateTotals(updatedProducts);
      saveCartToLocalStorage(updatedProducts);
      return updatedProducts;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartProducts((prevProducts) => {
      const updatedProducts = prevProducts
        .map((item) =>
          item._id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        )
        .filter((item) => item.quantity > 0);
      updateTotals(updatedProducts);
      saveCartToLocalStorage(updatedProducts);
      return updatedProducts;
    });
  };

  const clearCart = () => {
    setCartProducts([]);
    setCartTotal(0);
    setItemsCount(0);
    saveCartToLocalStorage([]);
  };

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          cartTotal,
          addToCart,
          removeFromCart,
          updateQuantity,
          clearCart,
          itemsCount,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
