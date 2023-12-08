import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import DivCenter from "@/components/atoms/DivCenter";
import Layout from "@/components/templates/Layout";
import SingleBox from "@/components/atoms/SingleBox";
import StyledDescriptionBox from "@/components/atoms/StyledDescriptionBox";
import ProductImages from "@/components/organism/ProductImages";
import IconCart from "@/components/atoms/IconCart";
import Button from "@/components/atoms/Button";
import { CartContext } from "@/components/organism/CartContext";
import React, { useContext, useState } from "react";
import { Category } from "@/models/Category";
import { Alert } from "@/components/atoms/Alert";
import { Setting } from "@/models/Setting";
import Head from "next/head";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 920px;
  width: 100%;
  gap: 50px;
  margin: 50px 5px;
  
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const DescriptionWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

const Price = styled.span`
  font-size: 1.4rem;
`;

const PropertyButton = styled.button`
  padding: 15px;
  margin: 5px;
  border: none;
  border-radius: 15px;
  background-color: ${(props) =>
    props.$isSelected
      ? "var(--main-deep-pink-color)"
      : props.disabled
      ? "var(--no-properties-color)" // Szary kolor dla niedostępnych opcji
      : "var(--main-plum-color)"};
  color: ${(props) =>
    props.$isSelected || props.disabled
      ? "var(--dark-text-color)"
      : "var(--dark-text-color)"};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.disabled
        ? "var(--no-properties-color)"
        : "var(--main-deep-pink-color)"};
    color: var(--dark-text-color);
  }
`;

const PropertyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
`;

const AvailabilityText = styled.span`
  color: ${(props) => (props.$available ? "green" : "red")};
`;

const Title = styled.h1`
    font-size: 2em;
`;

export default function ProductPage({
  product,
  categoryPath,
  availabilityVisible,
  additionalAvailabilityVisible,
}) {
  const { addProduct } = useContext(CartContext);
  const [selectedProperty, setSelectedProperty] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [showDangerAlert, setShowDangerAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertDangerMessage, setAlertDangerMessage] = useState("");
  const alertDuration = 3000;

  const handleAddToCartClick = () => {
    // Sprawdzenie, czy wszystkie właściwości zostały wybrane
    const allPropertiesSelected = product.properties.every((prop) =>
      selectedProperty.hasOwnProperty(prop.name)
    );

    // Sprawdzenie, czy aktualnie wybrana kombinacja jest dostępna
    const isAvailable =
      allPropertiesSelected &&
      product.properties.every((prop) =>
        isCombinationAvailable(prop.name, selectedProperty[prop.name])
      );

    if (isAvailable) {
      addProduct(product._id, selectedProperty);
      setAlertMessage("Produkt został dodany do koszyka.");
      setShowAlert(true);
    } else {
      setAlertDangerMessage(
        "Produkt nie jest dostępny lub nie wybrano wszystkich opcji."
      );
      setShowDangerAlert(true);
    }
  };

  const allPropertiesSelected = product.properties.every((prop) =>
    selectedProperty.hasOwnProperty(prop.name)
  );

  const handlePropertySelection = (propertyName, option) => {
    setSelectedProperty((prev) => ({
      ...prev,
      [propertyName]: option, // Zapisujemy wybraną opcję dla danej właściwości.
    }));
  };

  const renderCategoryPath = () => {
    if (!categoryPath.length) return "Brak kategorii";

    return categoryPath.map((cat, index) => (
      <span key={cat._id}>
        {cat.name}
        {index < categoryPath.length - 1 ? " / " : ""}
      </span>
    ));
  };

  const isCombinationAvailable = (propertyName, value) => {
    // Budowanie pełnej kombinacji na podstawie aktualnie wybranych właściwości
    let currentCombination = Object.values({
      ...selectedProperty,
      [propertyName]: value,
    });

    // Sprawdź, czy istnieje kombinacja z tą dostępnością
    return product.combinations.some(
      (comb) =>
        currentCombination.every((val) => comb.combination.includes(val)) &&
        comb.availability > 0
    );
  };

  const renderCategoryProperties = () => {
    if (product.properties && product.properties.length > 0) {
      return product.properties.map((prop, index) => (
        <div key={index}>
          <p>{prop.name}:</p>
          <PropertyContainer>
            {prop.values.map((value, i) => (
              <PropertyButton
                key={i}
                $isSelected={selectedProperty[prop.name] === value}
                onClick={() =>
                  isCombinationAvailable(prop.name, value)
                    ? handlePropertySelection(prop.name, value)
                    : null
                }
                disabled={!isCombinationAvailable(prop.name, value)}
              >
                {value}
              </PropertyButton>
            ))}
          </PropertyContainer>
        </div>
      ));
    } else if (
      product.properties &&
      product.properties.length === 0 &&
      product.availability
    ) {
      return <div>Brak właściwości dla tego produktu.</div>;
    }
  };

  const sumAvailability = (product) => {
    if (product.properties && product.properties.length > 0) {
      return product.combinations.reduce(
        (total, comb) => total + comb.availability,
        0
      );
    } else {
      // Jeśli nie ma właściwości, zwróć wartość z pola availability
      return product.availability;
    }
  };

  const renderAvailability = () => {
    const renderCombinationAvailability = (combination, availability) => (
      <>
        {additionalAvailabilityVisible && (
          <>
            {Array.isArray(combination) ? combination.join(", ") : combination}{" "}
            -{" "}
            <span>
              <AvailabilityText $available={availability > 0}>
                {availability}
              </AvailabilityText>{" "}
              sztuk
            </span>
          </>
        )}
      </>
    );

    if (product.combinations && product.combinations.length > 0) {
      return (
        <>
          {product.combinations.map((comb, index) => (
            <div key={index}>
              {renderCombinationAvailability(
                comb.combination,
                comb.availability
              )}
            </div>
          ))}
          {availabilityVisible && (
            <div>
              <strong>Ilość w magazynie: </strong>
              <AvailabilityText $available={sumAvailability(product) > 0}>
                {sumAvailability(product) > 0
                  ? sumAvailability(product)
                  : "brak"}
              </AvailabilityText>
            </div>
          )}
        </>
      );
    } else if (product.availability !== undefined) {
      return (
        <div>
          <strong>Ilość w magazynie: </strong>
          <AvailabilityText $available={product.availability > 0}>
            {product.availability > 0 ? product.availability : "brak"}
          </AvailabilityText>
        </div>
      );
    } else {
      return <div>Brak informacji o dostępności.</div>;
    }
  };

  return (
    <>
      <Head>
        <title>{product.name} - Sunset Festival</title>
      </Head>
      <Layout>
        {showAlert && (
          <Alert
            message={alertMessage}
            onClose={() => setShowAlert(false)}
            duration={alertDuration}
            type="success"
          />
        )}
        {showDangerAlert && (
          <Alert
            message={alertDangerMessage}
            onClose={() => setShowDangerAlert(false)}
            duration={alertDuration}
            type="danger"
          />
        )}
        <DivCenter>
          <ColWrapper>
            <SingleBox>
              <ProductImages images={product.images} />
            </SingleBox>
            <Row>
              <Title>{product.name}</Title>
              <div><b>Kategoria:</b> {renderCategoryPath()}</div>
              <div>
                <b>Właściwości:</b>
                <div>{renderCategoryProperties()}</div>
              </div>
              <Row>
                <div>{renderAvailability()}</div>
              </Row>
              <Price><b>Cena:</b> {product.price} zł</Price>
              <Button
                onClick={handleAddToCartClick}
                $size="m"
                $usage="primary"
                disabled={!allPropertiesSelected}
              >
                <IconCart />
                Dodaj do koszyka
              </Button>
            </Row>
          </ColWrapper>
          {product.description && (
            <>

              <div>
                <h3>Opis produktu</h3>
              </div>
              <DescriptionWrapper>
                <StyledDescriptionBox>{product.description}</StyledDescriptionBox>
              </DescriptionWrapper>
            </>
          )}
        </DivCenter>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id).populate("category");
  const categories = await Category.find();
  const availabilitySetting = await Setting.findOne({
    name: "availabilityVisible",
  });
  const isAvailabilityVisible = availabilitySetting
    ? availabilitySetting.value
    : false;
  const additionalAvailabilityVisible = await Setting.findOne({
    name: "additionalAvailabilityVisible",
  });
  const isAdditionalAvailabilityVisible = additionalAvailabilityVisible
    ? additionalAvailabilityVisible.value
    : false;
  const idToCategory = categories.reduce((acc, category) => {
    acc[category._id.toString()] = category;
    return acc;
  }, {});

  const getCategoryPath = (categoryId) => {
    const path = [];
    let currentCategory = idToCategory[categoryId];

    while (currentCategory) {
      path.unshift(currentCategory);
      currentCategory = currentCategory.parent
        ? idToCategory[currentCategory.parent.toString()]
        : null;
    }

    return path;
  };

  const categoryPath = product.category
    ? getCategoryPath(product.category._id.toString())
    : [];
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      categoryPath: JSON.parse(JSON.stringify(categoryPath)),
      availabilityVisible: isAvailabilityVisible,
      additionalAvailabilityVisible: isAdditionalAvailabilityVisible,
    },
  };
}
