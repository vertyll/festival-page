const { createContext, useState, useEffect } = require("react");

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
    // ls.clear();
  }, [cartProducts, ls]);
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, [ls]);

  function addProduct(productId, selectedProperties) {
    // Sprawdzenie, czy produkt już istnieje w koszyku
    const existingProductIndex = cartProducts.findIndex(
      (p) => p.productId === productId
    );

    if (existingProductIndex !== -1) {
      // Jeśli produkt już istnieje, zwiększ jego ilość
      const updatedProducts = [...cartProducts];
      updatedProducts[existingProductIndex].quantity += 1; // aktualizacja ilości
      setCartProducts(updatedProducts);
    } else {
      // Jeśli to nowy produkt, dodaj go do koszyka z ilością 1
      const newProduct = {
        productId,
        quantity: 1, // nowa właściwość: ilość
        selectedProperty: selectedProperties,
      };
      setCartProducts((prev) => [...prev, newProduct]);
    }
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const existingProductIndex = prev.findIndex(
        (product) => product.productId === productId
      );

      if (existingProductIndex !== -1) {
        const newCartProducts = [...prev];
        const existingProduct = newCartProducts[existingProductIndex];

        // Jeśli produkt ma ilość większą niż 1, zmniejszamy ilość
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          // Jeśli ilość wynosi 1, usuwamy produkt z koszyka
          newCartProducts.splice(existingProductIndex, 1);
        }
        return newCartProducts;
      }

      // Jeśli produkt nie istnieje w koszyku, po prostu zwracamy poprzedni stan
      return prev;
    });
  }

  function clearCart() {
    setCartProducts([], () => {
      ls?.removeItem("cart"); // to będzie wywoływane po zaktualizowaniu stanu
    });
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
