const { createContext, useState, useEffect } = require("react");

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]); // Początkowy stan to pusta tablica
  useEffect(() => {
    const cartItems = localStorage.getItem("cart");

    if (cartItems) {
      // Jeśli znaleziono elementy w koszyku, ustaw stan
      setCartProducts(JSON.parse(cartItems));
    }
  }, []); // Pusta tablica zależności oznacza, że ten efekt działa raz, podobnie jak componentDidMount
  useEffect(() => {
    // Aktualizacja localStorage gdy zmienia się cartProducts
    if (cartProducts.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cartProducts]);

  function addProduct(productId, selectedProperties) {
    setCartProducts((prevCartProducts) => {
      // Tworzenie unikalnego klucza dla produktu
      const uniqueKey = `${productId}-${JSON.stringify(selectedProperties)}`;

      // Sprawdzenie, czy istnieje już produkt o tym unikalnym kluczu
      const existingProductIndex = prevCartProducts.findIndex(
        (p) =>
          `${p.productId}-${JSON.stringify(p.selectedProperties)}` === uniqueKey
      );

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
    setCartProducts([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
