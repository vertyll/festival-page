/* eslint-disable react-hooks/exhaustive-deps */
import DivCenter from "@/components/atoms/DivCenter";
import Input from "@/components/atoms/Input";
import ProductContainer from "@/components/organism/ProductContainer";
import Layout from "@/components/templates/Layout";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import Spinner from "@/components/atoms/Spinner";
import styled from "styled-components";
import AnimatedSearchIcon from "@/components/atoms/AnimatedSearchIcon";
import Head from "next/head";

const SearchWrapper = styled.div`
  margin-top: 50px;
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
    <>
      <Head>
        <title>Wyszukiwanie produktu - Sunset Festival</title>
      </Head>
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
          {!isLoading && term !== "" && products.length === 0 && <h2>Brak wyników dla &ldquo;{term}&rdquo;</h2>}
          {isLoading && <Spinner />}
          {!isLoading &&
            (products.length > 0 ? (
              <ProductContainer products={products} />
            ) : (
              <AnimatedSearchIcon style={{ maxWidth: "450px", height: "450px" }} />
            ))}
        </DivCenter>
      </Layout>
    </>
  );
}
