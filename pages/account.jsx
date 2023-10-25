import { signIn, signOut, useSession } from "next-auth/react";
import styled from "styled-components";
import { RevealWrapper } from "next-reveal";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/componenets/templates/Layout";
import DivCenter from "@/componenets/atoms/DivCenter";
import Button from "@/componenets/atoms/Button";
import ProductBox from "@/componenets/organism/ProductBox";
import Tabs from "@/componenets/organism/Tabs";
import SingleOrder from "@/componenets/organism/SingleOrder";
import Spinner from "@/componenets/atoms/Spinner";
import SingleBox from "@/componenets/atoms/SingleBox";
import FieldInput from "@/componenets/molecules/FieldInput";

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 50px;
  margin: 50px 0;
  p {
    margin: 5px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 50px;
  text-align: left;
  background-color: var(--main-white-smoke-color);
  padding: 20px;
  border-radius: 30px;
`;

const StyledOrderDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  text-align: left;
  background-color: var(--main-white-smoke-color);
  padding: 20px;
  border-radius: 30px;

`;

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishlistLoaded, setWishlistLoaded] = useState(true);
  const [orderLoaded, setOrderLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Orders");
  const [orders, setOrders] = useState([]);

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }
  async function login() {
    await signIn("google");
  }
  function saveAddress() {
    const data = { name, email, city, streetAddress, postalCode, country };
    axios.put("/api/address", data);
  }
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

    axios.get("/api/wishlist").then((response) => {
      setWishedProducts(response.data.map((wp) => wp.product));
      setWishlistLoaded(true);
    });
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
      setOrderLoaded(true);
    });
  }, [session]);

  function productRemovedFromWishlist(idToRemove) {
    setWishedProducts((products) => {
      return [...products.filter((p) => p._id.toString() !== idToRemove)];
    });
  }
  return (
    <>
      <Layout>
        <DivCenter>
          <ColsWrapper>
            <div>
              <RevealWrapper delay={0}>
                <SingleBox>
                  <Tabs
                    tabs={["Zamówienia", "Ulubione"]}
                    active={activeTab}
                    onChange={setActiveTab}
                  />
                  {activeTab === "Zamówienia" && (
                    <>
                      {!orderLoaded && <Spinner fullWidth={true} />}
                      {orderLoaded && (
                        <StyledOrderDiv
                          style={{
                            visibility:
                              orders.length > 0 ? "visible" : "hidden",
                          }}
                        >
                          {orders.length === 0 && (
                            <p style={{ visibility: "visible" }}>
                              Brak zamówień
                            </p>
                          )}
                          {orders.length > 0 &&
                            orders.map((o) => (
                              <SingleOrder key={o._id} {...o} />
                            ))}
                        </StyledOrderDiv>
                      )}
                    </>
                  )}
                  {activeTab === "Ulubione" && (
                    <>
                      {!wishlistLoaded && <Spinner fullWidth={true} />}
                      {wishlistLoaded && (
                        <WishedProductsGrid
                          style={{
                            visibility:
                              wishedProducts.length > 0 ? "visible" : "hidden",
                          }}
                        >
                          {wishedProducts.length === 0 && (
                            <p style={{ visibility: "visible" }}>
                              Brak polubionych produktów
                            </p>
                          )}
                          {wishedProducts.length > 0 &&
                            wishedProducts.map((wp) => (
                              <ProductBox
                                key={wp._id}
                                {...wp}
                                wished={true}
                                onRemoveFromWishlist={
                                  productRemovedFromWishlist
                                }
                              />
                            ))}
                        </WishedProductsGrid>
                      )}
                    </>
                  )}
                </SingleBox>
              </RevealWrapper>
            </div>
            <div>
              <RevealWrapper delay={100}>
                <SingleBox>
                  <h2>{session ? "Dane konta" : "Logowanie"}</h2>
                  {!addressLoaded && <Spinner fullWidth={true} />}
                  {addressLoaded && session && (
                    <>
                      <FieldInput
                        labelText="Imie"
                        type="text"
                        placeholder="Name"
                        value={name}
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <FieldInput
                        labelText="Email"
                        type="text"
                        placeholder="Email"
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <CityHolder>
                        <FieldInput
                          labelText="Miasto"
                          type="text"
                          placeholder="City"
                          value={city}
                          name="city"
                          onChange={(e) => setCity(e.target.value)}
                        />
                        <FieldInput
                          labelText="Kod pocztowy"
                          type="text"
                          placeholder="Postal Code"
                          value={postalCode}
                          name="postalCode"
                          onChange={(e) => setPostalCode(e.target.value)}
                        />
                      </CityHolder>
                      <FieldInput
                        labelText="Ulica"
                        type="text"
                        placeholder="Street Address"
                        value={streetAddress}
                        name="streetAddress"
                        onChange={(e) => setStreetAddress(e.target.value)}
                      />
                      <FieldInput
                        labelText="Państwo"
                        type="text"
                        placeholder="Country"
                        value={country}
                        name="country"
                        onChange={(e) => setCountry(e.target.value)}
                      />
                      <Button usage="primary" onClick={saveAddress} size="m">
                        Zapisz
                      </Button>
                      <hr />
                    </>
                  )}
                  {session && (
                    <Button usage="primary" onClick={logout} size="m">
                      Wyloguj
                    </Button>
                  )}
                  {!session && (
                    <Button usage="primary" size="m" onClick={login}>
                      Zaloguj się za pomocą Google
                    </Button>
                  )}
                </SingleBox>
              </RevealWrapper>
            </div>
          </ColsWrapper>
        </DivCenter>
      </Layout>
    </>
  );
}
