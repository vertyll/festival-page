/* eslint-disable react-hooks/exhaustive-deps */
import DivCenter from "@/componenets/atoms/DivCenter";
import Input from "@/componenets/atoms/Input";
import ProductContainer from "@/componenets/organism/ProductContainer";
import Layout from "@/componenets/templates/Layout";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import Spinner from "@/componenets/atoms/Spinner";
import styled from "styled-components";
import AnimatedSearchIcon from "@/componenets/atoms/AnimatedSearchIcon";

const SearchWrapper = styled.div`
  max-width: 980px;
  width: 100%;
`;

export default function SearchPage() {
  const [term, setTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchProducts = useCallback(
    debounce((nextValue) => {
      axios
        .get("/api/products?term=" + encodeURIComponent(nextValue))
        .then((response) => {
          setProducts(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("There was an issue fetching data: ", error);
        });
    }, 500),
    [setProducts, setIsLoading]
  );
  useEffect(() => {
    if (term) {
      setIsLoading(true);
      searchProducts(term);
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
        <SearchWrapper>
          <Input
            autoFocus
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Wyszukaj produkt ..."
          />
        </SearchWrapper>
        {!isLoading && term !== "" && products.length === 0 && (
          <h2>Brak wyników dla &ldquo;{term}&rdquo;</h2>
        )}
        {isLoading && <Spinner />}
        {!isLoading &&
          (products.length > 0 ? (
            <ProductContainer products={products} />
          ) : (
            <AnimatedSearchIcon style={{ maxWidth: '450px', height: '450px' }} />
          ))}
      </DivCenter>
    </Layout>
  );
}
