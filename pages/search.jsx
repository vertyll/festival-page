import DivCenter from "@/componenets/atoms/DivCenter";
import Input from "@/componenets/atoms/Input";
import ProductContainer from "@/componenets/organism/ProductContainer";
import Layout from "@/componenets/templates/Layout";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

export default function SearchPage() {
  const [phrase, setPhrase] = useState("");
  const [products, setProducts] = useState([]);
  const searchProducts = useCallback(
    debounce((nextValue) => {
      axios
        .get("/api/products?phrase=" + encodeURIComponent(nextValue))
        .then((response) => {
          console.log(response.data)
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("There was an issue fetching data: ", error);
        });
    }, 500),
    []
  );
  useEffect(() => {
    if (phrase) {
      searchProducts(phrase);
    } else {
      setProducts([]);
    }
    return () => {
      searchProducts.cancel();
    };
  }, [phrase, searchProducts]);

  return (
    <Layout>
      <DivCenter>
        <Input
          autoFocus
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          placeholder="Wyszukaj produkt ..."
        />
        <ProductContainer products={products} />
      </DivCenter>
    </Layout>
  );
}
