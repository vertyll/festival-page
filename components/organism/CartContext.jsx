import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState(() => {
    if (typeof window !== "undefined") {
      const cartItems = localStorage.getItem("cart");
      return cartItems ? JSON.parse(cartItems) : [];
    }
    return [];
  });

  useEffect(() => {
    if (cartProducts.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cartProducts]);

  function addProduct(productId, selectedProperties) {
    setCartProducts((prevCartProducts) => {
      const uniqueKey = `${productId}-${JSON.stringify(selectedProperties)}`;

      // Sprawdzenie, czy istnieje już produkt o tym unikalnym kluczu
      const existingProductIndex = prevCartProducts.findIndex((item) => item.uniqueKey === uniqueKey);

      if (existingProductIndex !== -1) {
        // Zwiększenie ilości istniejącego produktu
        const updatedProducts = [...prevCartProducts];
        updatedProducts[existingProductIndex].quantity += 1;
        return updatedProducts;
      } else {
        // Dodanie nowego produktu do koszyka z unikalnym kluczem
        const newProduct = {
          uniqueKey,
          productId,
          selectedProperties,
          quantity: 1,
        };
        return [...prevCartProducts, newProduct];
      }
    });
  }

  function removeProduct(productId, selectedProperties) {
    setCartProducts((prevCartProducts) => {
      const uniqueKey = `${productId}-${JSON.stringify(selectedProperties)}`;
      const existingProductIndex = prevCartProducts.findIndex((item) => item.uniqueKey === uniqueKey);

      if (existingProductIndex !== -1) {
        const newCartProducts = [...prevCartProducts];
        const existingProduct = newCartProducts[existingProductIndex];

        // Zmniejszenie ilości istniejącego produktu
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          // Usunięcie produktu z koszyka, jeśli ilość wynosi 0
          newCartProducts.splice(existingProductIndex, 1);
        }

        return newCartProducts;
      }

      // Jeśli produkt nie istnieje w koszyku, zwracamy poprzedni stan
      return prevCartProducts;
    });
  }

  function clearCart() {
    localStorage.removeItem("cart");
  }

  async function finalizePurchase() {
    try {
      await axios.post("/api/update-availability", { cartProducts });
    } catch (error) {
      console.error("Błąd podczas aktualizacji stanu magazynowego produktu:", error);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addProduct,
        removeProduct,
        clearCart,
        finalizePurchase,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
