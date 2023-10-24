/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/componenets/organism/CartContext";
import axios from "axios";
import Layout from "@/componenets/templates/Layout";
import DivCenter from "@/componenets/atoms/DivCenter";
import Button from "@/componenets/atoms/Button";
import Table from "@/componenets/atoms/Table";
import Title from "@/componenets/atoms/Title";
import FieldInput from "@/componenets/molecules/FieldInput";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  margin-top: 50px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 30px;
  padding: 30px;
`;

const ProductImage = styled.div`
  width: 70px;
  height: 100px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;

  img {
    max-width: 100%;
    max-height: 70px;
  }

  @media screen and (min-width: 768px) {
    padding: 5px;
    width: 100px;
    height: 100px;

    img {
      max-width: 100%;
      max-height: 70px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;

  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, [clearCart]);
  function quanitityAdd(id) {
    addProduct(id);
  }
  function quantitySub(id) {
    removeProduct(id);
  }
  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <>
        <Layout>
          <DivCenter>
            <Wrapper>
              <Box>
                <h1>Dziękujemy za złożone zamówienie</h1>
                <p>
                  Wyślemy tobie powiadomienie email, kiedy twoje zamówienie
                  będzie gotowe
                </p>
              </Box>
            </Wrapper>
          </DivCenter>
        </Layout>
      </>
    );
  }
  return (
    <>
      <Layout>
        <DivCenter>
          <Wrapper>
            <Box>
              <Title>Koszyk</Title>
              {!cartProducts?.length && (
                <div>
                  <h1>Twój koszyk jest pusty</h1>
                  <p>Zapraszamy do zakupów, kupuj szybko i wygodnie</p>
                </div>
              )}
              {products?.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Podgląd</th>
                      <th>Nazwa</th>
                      <th>Ilość</th>
                      <th>Cena</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>
                          <ProductImage>
                            <img
                              src={product.images[0]}
                              alt="zdjęcie produktu"
                            />
                          </ProductImage>
                        </td>
                        <td>{product.name}</td>
                        <td>
                          <Button
                            size="s"
                            usage="quantity"
                            onClick={() => quantitySub(product._id)}
                          >
                            -
                          </Button>
                          <QuantityLabel>
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </QuantityLabel>
                          <Button
                            size="s"
                            usage="quantity"
                            onClick={() => quanitityAdd(product._id)}
                          >
                            +
                          </Button>
                        </td>
                        <td>
                          {cartProducts.filter((id) => id === product._id)
                            .length * product.price}{" "}
                          zł
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={3}>Razem:</td>
                      <td>{total} zł</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Box>
            {!!cartProducts?.length && (
              <Box>
                <Title>Informacje o płatności</Title>
                <FieldInput
                  labelText="Imie"
                  type="text"
                  placeholder="Imie"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
                <FieldInput
                  labelText="Email"
                  type="text"
                  placeholder="Adres email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <CityHolder>
                  <FieldInput
                    labelText="Miasto"
                    type="text"
                    placeholder="Miasto"
                    value={city}
                    name="city"
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <FieldInput
                    labelText="Kod pocztowy"
                    type="text"
                    placeholder="Kod pocztowy"
                    value={postalCode}
                    name="postalCode"
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </CityHolder>
                <FieldInput
                  labelText="Ulica"
                  type="text"
                  placeholder="Ulica"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={(e) => setStreetAddress(e.target.value)}
                />
                <FieldInput
                  labelText="Państwo"
                  type="text"
                  placeholder="Państwo"
                  value={country}
                  name="country"
                  onChange={(e) => setCountry(e.target.value)}
                />
                <Button size="m" usage="primary" onClick={goToPayment}>
                  Zapłać
                </Button>
              </Box>
            )}
          </Wrapper>
        </DivCenter>
      </Layout>
    </>
  );
}
