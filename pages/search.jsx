import DivCenter from "@/componenets/atoms/DivCenter";
import Input from "@/componenets/atoms/Input";
import ProductContainer from "@/componenets/organism/ProductContainer";
import Layout from "@/componenets/templates/Layout";
import axios from "axios";
import { debounce } from "lodash";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const [phrase, setPhrase] = useState("");
  const [products, setProducts] = useState([]);
  const [debouncedSearch, setDebouncedSrarch] = useState(() => {});
  useEffect(() => {
    if (phrase.length > 0) {
      debouncedSearch();
    } else {
      setProducts([]);
    }
  }, [phrase]);
  useEffect(() => {
    setDebouncedSrarch(debounce(searchProducts, 500));
  }, []);

  function searchProducts() {
    axios
      .get("/api/products?phrase=" + encodeURIComponent(phrase))
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      });
  }

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
