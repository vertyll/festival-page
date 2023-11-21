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
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { validateFormValues } from "@/utils/validation/validation";
import ErrorDiv from "@/componenets/atoms/ErrorDiv";
import IconCreditCart from "@/componenets/atoms/IconCreditCart";
import AnimatedThanksImage from "@/componenets/atoms/AnimatedThanksImage";
import AnimatedCartIcon from "@/componenets/atoms/AnimatedCartIcon";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  max-width: 1000px;
  width: 100%;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
    gap: 50px;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-height: 150px;
  }
`;

const Box = styled.div`
  background-color: var(--light-color);
  border-radius: 30px;
  padding: 30px;
  box-shadow: var(--default-box-shadow);
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
  flex-direction: column;
  gap: 5px;
`;

const SelectedPropertiesDiv = styled.div`
  color: var(--gray-color);
  font-weight: bold;
  font-size: 0.9em;
`;

export default function CartPage() {
  const { data: session } = useSession();
  const {
    cartProducts,
    addProduct,
    removeProduct,
    clearCart,
    finalizePurchase,
  } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [shippingPrice, setShippingPrice] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const router = useRouter();
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios
        .post("/api/cart", { ids: cartProducts })
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    axios.get("/api/settings?name=shippingPrice").then((response) => {
      setShippingPrice(response.data.value);
    });
  }, []); // Pusta tablica zależności, aby żądanie wykonało się tylko raz przy montowaniu komponentu
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, [clearCart]);
  useEffect(() => {
    if (!session) {
      return;
    }
    axios
      .get("/api/address")
      .then((response) => {
        if (response.data) {
          setName(response.data.name || "");
          setEmail(response.data.email || "");
          setCity(response.data.city || "");
          setPostalCode(response.data.postalCode || "");
          setStreetAddress(response.data.streetAddress || "");
          setCountry(response.data.country || "");
        } else {
          console.error("No data returned from /api/address");
        }
      })
      .catch((error) => {
        console.error("An error occurred while fetching address data:", error);
      });
  }, [session]);
  useEffect(() => {
    let newTotal = 0;
    cartProducts.forEach((cartItem) => {
      const product = products.find((p) => p._id === cartItem.productId);
      if (product) {
        newTotal += cartItem.quantity * product.price;
      }
    });
    setTotalPrice(newTotal);
  }, [cartProducts, products]);

  function quantityAdd(cartItem) {
    addProduct(cartItem.productId, cartItem.selectedProperties);
  }

  function quantitySub(cartItem) {
    removeProduct(cartItem.productId, cartItem.selectedProperties);
  }

  function goToShop() {
    router.push("/products");
  }

  async function goToPayment() {
    const errors = validateFormValues(
      { name, email, city, postalCode, streetAddress, country },
      ["name", "email", "city", "postalCode", "streetAddress", "country"]
    );
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

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
      // Tutaj możesz wywołać finalizePurchase
      await finalizePurchase();
      window.location = response.data.url;
    }
  }

  if (isSuccess) {
    return (
      <>
        <Layout>
          <DivCenter>
            <Box>
              <h1>Dziękujemy za złożone zamówienie</h1>
              <p>
                Wyślemy Ci powiadomienie email, kiedy twoje zamówienie będzie
                gotowe
              </p>
              <AnimatedThanksImage
                style={{ maxWidth: "200px", height: "200px" }}
              />
              <Button $usage="primary" $size="m" onClick={goToShop}>
                Wróć do sklepu &#8617;
              </Button>
            </Box>
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
                  <Button $usage="primary" $size="m" onClick={goToShop}>
                    Wróć do sklepu &#8617;
                  </Button>
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
                    {cartProducts.map((cartItem) => {
                      // Używaj uniqueKey z cartItem do znalezienia pełnych danych produktu
                      const fullProductData = products.find(
                        (product) => product._id === cartItem.productId
                      );

                      // Jeśli nie znaleziono pełnych danych produktu, nie renderuj wiersza
                      if (!fullProductData) {
                        console.log(
                          "Nie znaleziono produktu dla productId:",
                          cartItem.productId,
                          "z selectedProperties:",
                          cartItem.selectedProperties
                        );
                        return null;
                      }

                      const selectedPropertiesString = Object.entries(
                        cartItem.selectedProperties
                      )
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(", ");

                      return (
                        <tr key={cartItem.uniqueKey}>
                          <td>
                            <ProductImage>
                              <img
                                src={fullProductData.images[0]}
                                alt={fullProductData.name}
                              />
                            </ProductImage>
                          </td>
                          <td>
                            {fullProductData.name}
                            <SelectedPropertiesDiv>
                              {selectedPropertiesString}
                            </SelectedPropertiesDiv>
                          </td>
                          <td>
                            <Button
                              $size="s"
                              $usage="quantity"
                              onClick={() => quantitySub(cartItem)}
                            >
                              -
                            </Button>
                            <QuantityLabel>{cartItem.quantity}</QuantityLabel>
                            <Button
                              $size="s"
                              $usage="quantity"
                              onClick={() => quantityAdd(cartItem)}
                            >
                              +
                            </Button>
                          </td>
                          <td>
                            {cartItem.quantity * fullProductData.price} zł
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td colSpan={3}>Dostawa:</td>
                      <td>{shippingPrice} zł</td>
                    </tr>
                    <tr>
                      <td colSpan={3}>Razem:</td>
                      <td>{Number(totalPrice) + Number(shippingPrice)} zł</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Box>
            {!cartProducts?.length && (
              <Box>
                <ImageWrapper>
                  <AnimatedCartIcon />
                </ImageWrapper>
              </Box>
            )}
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
                {validationErrors["name"] && (
                  <ErrorDiv>{validationErrors["name"]}</ErrorDiv>
                )}
                <FieldInput
                  labelText="Email"
                  type="text"
                  placeholder="Adres email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {validationErrors["email"] && (
                  <ErrorDiv>{validationErrors["email"]}</ErrorDiv>
                )}
                <CityHolder>
                  <FieldInput
                    labelText="Miasto"
                    type="text"
                    placeholder="Miasto"
                    value={city}
                    name="city"
                    onChange={(e) => setCity(e.target.value)}
                  />
                  {validationErrors["city"] && (
                    <ErrorDiv>{validationErrors["city"]}</ErrorDiv>
                  )}
                  <FieldInput
                    labelText="Kod pocztowy"
                    type="text"
                    placeholder="Kod pocztowy"
                    value={postalCode}
                    name="postalCode"
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                  {validationErrors["postalCode"] && (
                    <ErrorDiv>{validationErrors["postalCode"]}</ErrorDiv>
                  )}
                </CityHolder>
                <FieldInput
                  labelText="Ulica"
                  type="text"
                  placeholder="Ulica"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={(e) => setStreetAddress(e.target.value)}
                />
                {validationErrors["streetAddress"] && (
                  <ErrorDiv>{validationErrors["streetAddress"]}</ErrorDiv>
                )}
                <FieldInput
                  labelText="Państwo"
                  type="text"
                  placeholder="Państwo"
                  value={country}
                  name="country"
                  onChange={(e) => setCountry(e.target.value)}
                />
                {validationErrors["country"] && (
                  <ErrorDiv>{validationErrors["country"]}</ErrorDiv>
                )}
                <Button $size="m" $usage="primary" onClick={goToPayment}>
                  <IconCreditCart />
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
