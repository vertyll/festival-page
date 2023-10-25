const { createContext, useState, useEffect } = require("react");

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
    ls.clear();
  }, [cartProducts, ls]);
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, [ls]);

  function addProduct(productId, selectedProperties) {
    const newProduct = {
      productId,
      selectedProperty: selectedProperties, // Możesz przechowywać wybrane właściwości tutaj
    };
    setCartProducts((prev) => [...prev, newProduct]);
  }

  function removeProduct(productId) {
    setCartProducts((prev) =>
      prev.filter((product) => product.productId !== productId)
    );
  }

  function clearCart() {
    setCartProducts([]);
    ls.clear();
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
