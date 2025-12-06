/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import { useContext, useEffect, useState, useMemo, useRef, useSyncExternalStore } from "react";
import { CartContext } from "@/components/organism/CartContext";
import axios from "axios";
import Layout from "@/components/templates/Layout";
import DivCenter from "@/components/atoms/DivCenter";
import Button from "@/components/atoms/Button";
import Table from "@/components/atoms/Table";
import FieldInput from "@/components/molecules/FieldInput";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { validateFormValues } from "@/utils/validation/validation";
import ErrorDiv from "@/components/atoms/ErrorDiv";
import IconCreditCart from "@/components/atoms/IconCreditCart";
import AnimatedThanksImage from "@/components/atoms/AnimatedThanksImage";
import AnimatedCartIcon from "@/components/atoms/AnimatedCartIcon";
import Head from "next/head";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  max-width: 1000px;
  width: 100%;
  margin-top: 50px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
    gap: 50px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-weight: bold;
  font-size: 2.5;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-height: 150px;
  }
`;

const MarginTopWrapper = styled.div`
  margin-top: 50px;
`;

const Box = styled.div`
  background-color: var(--main-white-smoke-color);
  border-radius: 20px;
  padding: 30px;
  box-shadow: var(--default-box-shadow);

  input {
    background-color: var(--light-color);
  }
`;

const ProductImage = styled.div`
  width: 70px;
  height: 100px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;

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

// Stała pusta tablica dla SSR - musi być poza komponentem aby była cachowana
const EMPTY_CART = [];

export default function CartPage() {
  const { data: session } = useSession();
  const { cartProducts, addProduct, removeProduct, clearCart, finalizePurchase } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [shippingPrice, setShippingPrice] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const hasProcessedSuccess = useRef(false);

  // Użyj useSyncExternalStore dla bezpiecznej hydratacji cartProducts
  const clientCartProducts = useSyncExternalStore(
    () => () => {}, // subscribe - nie potrzebujemy subskrypcji bo Context już to robi
    () => cartProducts, // getSnapshot dla klienta
    () => EMPTY_CART // getServerSnapshot dla SSR - używamy cachowanej stałej
  );

  // Obliczanie totalPrice za pomocą useMemo zamiast useEffect
  const totalPrice = useMemo(() => {
    return clientCartProducts.reduce((sum, cartItem) => {
      const product = products.find((p) => p._id === cartItem.productId);
      return product ? sum + cartItem.quantity * product.price : sum;
    }, 0);
  }, [clientCartProducts, products]);

  const router = useRouter();

  useEffect(() => {
    if (clientCartProducts.length > 0) {
      axios
        .post("/api/cart", { ids: clientCartProducts })
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [clientCartProducts]);

  useEffect(() => {
    axios.get("/api/settings?name=shippingPrice").then((response) => {
      setShippingPrice(response.data.value);
    });
  }, []);

  useEffect(() => {
    if (router.isReady && router.query.success && !hasProcessedSuccess.current) {
      hasProcessedSuccess.current = true;
      Promise.resolve().then(() => {
        setIsSuccess(true);
        clearCart();
      });
    }
  }, [router.isReady, router.query.success, clearCart]);
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
          console.error("Brak danych zwróconych z /api/address");
        }
      })
      .catch((error) => {
        console.error("Wystąpił błąd podczas pobierania danych adresowych:", error);
      });
  }, [session]);

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
    const errors = validateFormValues({ name, email, city, postalCode, streetAddress, country }, [
      "name",
      "email",
      "city",
      "postalCode",
      "streetAddress",
      "country",
    ]);
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
      cartProducts: clientCartProducts,
    });

    if (response.data.url) {
      await finalizePurchase();
      window.location = response.data.url;
    }
  }

  if (isSuccess) {
    return (
      <>
        <Head>
          <title>Koszyk - Sunset Festival</title>
        </Head>
        <Layout>
          <DivCenter>
            <MarginTopWrapper>
              <Box>
                <h1>Dziękujemy za złożone zamówienie</h1>
                <p>Wyślemy Ci powiadomienie email, kiedy twoje zamówienie będzie gotowe</p>
                <AnimatedThanksImage style={{ maxWidth: "200px", height: "200px" }} />
                <Button $usage="primary" $size="m" onClick={goToShop}>
                  Wróć do sklepu &#8617;
                </Button>
              </Box>
            </MarginTopWrapper>
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
              {!clientCartProducts?.length && (
                <div>
                  <h2>Twój koszyk jest pusty</h2>
                  <p>Zapraszamy do zakupów, kupuj szybko i wygodnie</p>
                  <Button $usage="primary" $size="m" onClick={goToShop}>
                    Wróć do sklepu &#8617;
                  </Button>
                </div>
              )}
              {products?.length > 0 && clientCartProducts?.length > 0 && (
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
                    {clientCartProducts.map((cartItem) => {
                      // Używaj uniqueKey z cartItem do znalezienia pełnych danych produktu
                      const fullProductData = products.find((product) => product._id === cartItem.productId);

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

                      const selectedPropertiesString = Object.entries(cartItem.selectedProperties)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(", ");

                      return (
                        <tr key={cartItem.uniqueKey}>
                          <td>
                            <ProductImage>
                              <img
                                src={fullProductData.images[0] || "/images/no-image-found.webp"}
                                alt={fullProductData.name}
                              />
                            </ProductImage>
                          </td>
                          <td>
                            {fullProductData.name}
                            <SelectedPropertiesDiv>{selectedPropertiesString}</SelectedPropertiesDiv>
                          </td>
                          <td>
                            <Button $size="s" $usage="quantity" onClick={() => quantitySub(cartItem)}>
                              -
                            </Button>
                            <QuantityLabel>{cartItem.quantity}</QuantityLabel>
                            <Button $size="s" $usage="quantity" onClick={() => quantityAdd(cartItem)}>
                              +
                            </Button>
                          </td>
                          <td>{cartItem.quantity * fullProductData.price} zł</td>
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
            {!clientCartProducts?.length && (
              <Box>
                <ImageWrapper>
                  <AnimatedCartIcon />
                </ImageWrapper>
              </Box>
            )}
            {!!clientCartProducts?.length && (
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
                {validationErrors["name"] && <ErrorDiv>{validationErrors["name"]}</ErrorDiv>}
                <FieldInput
                  labelText="Email"
                  type="text"
                  placeholder="Adres email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {validationErrors["email"] && <ErrorDiv>{validationErrors["email"]}</ErrorDiv>}
                <CityHolder>
                  <FieldInput
                    labelText="Miasto"
                    type="text"
                    placeholder="Miasto"
                    value={city}
                    name="city"
                    onChange={(e) => setCity(e.target.value)}
                  />
                  {validationErrors["city"] && <ErrorDiv>{validationErrors["city"]}</ErrorDiv>}
                  <FieldInput
                    labelText="Kod pocztowy"
                    type="text"
                    placeholder="Kod pocztowy"
                    value={postalCode}
                    name="postalCode"
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                  {validationErrors["postalCode"] && <ErrorDiv>{validationErrors["postalCode"]}</ErrorDiv>}
                </CityHolder>
                <FieldInput
                  labelText="Ulica"
                  type="text"
                  placeholder="Ulica"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={(e) => setStreetAddress(e.target.value)}
                />
                {validationErrors["streetAddress"] && <ErrorDiv>{validationErrors["streetAddress"]}</ErrorDiv>}
                <FieldInput
                  labelText="Państwo"
                  type="text"
                  placeholder="Państwo"
                  value={country}
                  name="country"
                  onChange={(e) => setCountry(e.target.value)}
                />
                {validationErrors["country"] && <ErrorDiv>{validationErrors["country"]}</ErrorDiv>}
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
