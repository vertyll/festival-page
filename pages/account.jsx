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
import FieldInput from "@/componenets/molecules/FieldInput";
import { validateFormValues } from "@/lib/validation/validation";
import ErrorDiv from "@/componenets/atoms/ErrorDiv";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 750px;
  width: 100%;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;

  @media screen and (min-width: 600px) {
    flex-direction: column;
  }
`;

const StyledWishedDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  text-align: left;
  background-color: var(--main-white-smoke-color);
  padding: 10px;
  border-radius: 30px;
  margin: 5px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    margin: 30px;
  }
`;

const StyledOrderDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  text-align: left;
  background-color: var(--main-white-smoke-color);
  padding: 10px;
  border-radius: 30px;
  margin: 5px;

  @media screen and (min-width: 768px) {
    margin: 30px;
    padding: 20px;
  }
`;

const StyledDataDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  text-align: left;
  background-color: var(--main-white-smoke-color);
  padding: 10px;
  border-radius: 30px;
  margin: 5px;

  @media screen and (min-width: 600px) {
    margin: 30px;
    padding: 20px;
  }
`;

const InfoBox = styled.div`
  background-color: var(--light-color);
  padding: 20px 5px;
  border-radius: 30px;

  @media screen and (min-width: 600px) {
    padding: 20px;
  }
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
  const [validationErrors, setValidationErrors] = useState({});

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }
  async function login() {
    await signIn("google");
  }
  function saveAddress() {
    const errors = validateFormValues(
      { name, email, city, postalCode, streetAddress, country },
      ["name", "email", "city", "postalCode", "streetAddress", "country"]
    );
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const data = { name, email, city, streetAddress, postalCode, country };
    axios.put("/api/address", data);
  }
  useEffect(() => {
    if (!session) {
      return;
    }
    setAddressLoaded(false);
    setWishlistLoaded(false);
    setOrderLoaded(false);
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
          setAddressLoaded(true);
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
          <Wrapper>
            <RevealWrapper delay={0}>
              <InfoBox>
                <Tabs
                  tabs={["Zamówienia", "Ulubione", "Konto"]}
                  active={activeTab}
                  onChange={setActiveTab}
                />
                {activeTab === "Zamówienia" && (
                  <>
                    {!orderLoaded && <Spinner />}
                    {orderLoaded && (
                      <StyledOrderDiv
                        style={{
                          visibility: orders.length > 0 ? "visible" : "hidden",
                        }}
                      >
                        {orders.length === 0 && (
                          <p style={{ visibility: "visible" }}>Brak zamówień</p>
                        )}
                        {orders.length > 0 &&
                          orders.map((o) => <SingleOrder key={o._id} {...o} />)}
                      </StyledOrderDiv>
                    )}
                  </>
                )}
                {activeTab === "Ulubione" && (
                  <>
                    {!wishlistLoaded && <Spinner />}
                    {wishlistLoaded && (
                      <StyledWishedDiv
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
                              onRemoveFromWishlist={productRemovedFromWishlist}
                            />
                          ))}
                      </StyledWishedDiv>
                    )}
                  </>
                )}
                {activeTab === "Konto" && (
                  <>
                    {!addressLoaded && <Spinner />}
                    {addressLoaded && session && (
                      <StyledDataDiv>
                        <FieldInput
                          labelText="Imie"
                          type="text"
                          placeholder="Name"
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
                          placeholder="Email"
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
                            placeholder="City"
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
                            placeholder="Postal Code"
                            value={postalCode}
                            name="postalCode"
                            onChange={(e) => setPostalCode(e.target.value)}
                          />
                          {validationErrors["postalCode"] && (
                            <ErrorDiv>
                              {validationErrors["postalCode"]}
                            </ErrorDiv>
                          )}
                        </CityHolder>
                        <FieldInput
                          labelText="Ulica"
                          type="text"
                          placeholder="Street Address"
                          value={streetAddress}
                          name="streetAddress"
                          onChange={(e) => setStreetAddress(e.target.value)}
                        />
                        {validationErrors["streetAddress"] && (
                          <ErrorDiv>
                            {validationErrors["streetAddress"]}
                          </ErrorDiv>
                        )}
                        <FieldInput
                          labelText="Państwo"
                          type="text"
                          placeholder="Country"
                          value={country}
                          name="country"
                          onChange={(e) => setCountry(e.target.value)}
                        />
                        {validationErrors["country"] && (
                          <ErrorDiv>{validationErrors["country"]}</ErrorDiv>
                        )}
                        <Button
                          $usage="primary"
                          onClick={saveAddress}
                          $size="m"
                        >
                          Zapisz
                        </Button>
                      </StyledDataDiv>
                    )}
                    {session && (
                      <Button $usage="primary" onClick={logout} $size="m">
                        Wyloguj
                      </Button>
                    )}
                    {!session && (
                      <Button $usage="primary" $size="m" onClick={login}>
                        Zaloguj się za pomocą Google
                      </Button>
                    )}
                  </>
                )}
              </InfoBox>
            </RevealWrapper>
          </Wrapper>
        </DivCenter>
      </Layout>
    </>
  );
}
