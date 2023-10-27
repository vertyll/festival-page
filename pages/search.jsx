import DivCenter from "@/componenets/atoms/DivCenter";
import Input from "@/componenets/atoms/Input";
import ProductContainer from "@/componenets/organism/ProductContainer";
import Layout from "@/componenets/templates/Layout";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

export default function SearchPage() {
  const [term, setTerm] = useState("");
  const [products, setProducts] = useState([]);
  const searchProducts = useCallback(
    debounce((nextValue) => {
      axios
        .get("/api/products?phrase=" + encodeURIComponent(nextValue))
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("There was an issue fetching data: ", error);
        });
    }, 500),
    [setProducts]
  );
  useEffect(() => {
    if (term) {
      searchProducts(phrase);
    } else {
      setProducts([]);
    }
    return () => {
      searchProducts.cancel();
    };
  }, [term, searchProducts]);

  return (
    <Layout>
      <DivCenter>
        <Input
          autoFocus
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Wyszukaj produkt ..."
        />
        <ProductContainer products={products} />
      </DivCenter>
    </Layout>
  );
}
