import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import DivCenter from "@/componenets/atoms/DivCenter";
import Layout from "@/componenets/templates/Layout";
import Title from "@/componenets/atoms/Title";
import SingleBox from "@/componenets/atoms/SingleBox";
import ProductImages from "@/componenets/organism/ProductImages";
import IconCart from "@/componenets/atoms/IconCart";
import Button from "@/componenets/atoms/Button";
import { CartContext } from "@/componenets/organism/CartContext";
import React, { useContext, useState } from "react";
import { Category } from "@/models/Category";
import { Alert } from "@/componenets/atoms/Alert";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 920px;
  width: 100%;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 5px;
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
  border-radius: 30px;
  background-color: ${(props) =>
    props.$isSelected
      ? "var(--main-deep-pink-color)"
      : "var(--main-plum-color)"};
  color: ${(props) =>
    props.$isSelected ? "var(--light-text-color)" : "var(--dark-text-color)"};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--main-deep-pink-color);
    color: var(--light-text-color);
  }
`;

const StyledDescriptionDiv = styled.div`
  display: flex;
  max-width: 850px;
  border-radius: 30px;
  background-color: var(--light-color);
  box-shadow: var(--default-box-shadow);
  padding: 30px;
`;

const PropertyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
`;

const AvailabilityText = styled.span`
  color: ${(props) => (props.$available ? "green" : "red")};
`;

export default function ProductPage({ product, categoryPath }) {
  const { addProduct } = useContext(CartContext);
  const [selectedProperty, setSelectedProperty] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [showDangerAlert, setShowDangerAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertDangerMessage, setAlertDangerMessage] = useState("");
  const alertDuration = 3000;

  const handleAddToCartClick = () => {
    const isAvailable =
      product.properties.length > 0
        ? sumAvailability(product.properties) > 0
        : product.availability > 0;

    if (allPropertiesSelected && isAvailable) {
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

  const renderCategoryProperties = () => {
    if (product.properties && product.properties.length > 0) {
      return product.properties.map((prop, index) => (
        <div key={index}>
          <strong>{prop.name}: </strong>
          <PropertyContainer>
            {prop.values.map((value, i) => (
              <PropertyButton
                key={i}
                $isSelected={selectedProperty[prop.name] === value}
                onClick={() =>
                  prop.availability[value] > 0
                    ? handlePropertySelection(prop.name, value)
                    : null
                }
                disabled={prop.availability[value] <= 0}
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

  const sumAvailability = (properties) => {
    return properties.reduce((total, prop) => {
      return (
        total +
        Object.values(prop.availability).reduce(
          (subTotal, amount) => subTotal + Number(amount),
          0
        )
      );
    }, 0);
  };

  const renderAvailability = () => {
    // Jeśli produkt ma właściwości, wyświetl dostępność dla każdej z nich oraz ogólną dostępność
    if (product.properties && product.properties.length > 0) {
      const totalAvailability = sumAvailability(product.properties);

      return (
        <>
          {product.properties.map((prop, index) => (
            <div key={index}>
              {/* <strong>Ilość w magazynie dla {prop.name}: </strong> */}
              {Object.entries(prop.availability).map(([value, amount], i) => (
                <React.Fragment key={i}>
                  <AvailabilityText $available={amount > 0}>
                    {/* {value}: {amount > 0 ? amount : "brak"} */}
                  </AvailabilityText>
                  <span> </span> {/* Dodanie spacji */}
                </React.Fragment>
              ))}
            </div>
          ))}
          <div>
            <strong>Ilość w magazynie: </strong>
            <AvailabilityText $available={totalAvailability > 0}>
              {totalAvailability > 0 ? totalAvailability : "brak"}
            </AvailabilityText>
          </div>
        </>
      );
    }
    // Jeśli produkt nie ma właściwości, wyświetl ogólną dostępność
    else if (product.availability !== undefined) {
      return (
        <div>
          <strong>Ilość w magazynie: </strong>
          <AvailabilityText $available={product.availability > 0}>
            {product.availability > 0 ? product.availability : "brak"}
          </AvailabilityText>
        </div>
      );
    }
  };

  return (
    <>
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
              <div>Kategoria: {renderCategoryPath()}</div>
              <div>
                Właściwości:
                <div>{renderCategoryProperties()}</div>
              </div>
              <div>{renderAvailability()}</div>
              <Price>Cena: {product.price} zł</Price>
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
              <StyledDescriptionDiv>{product.description}</StyledDescriptionDiv>
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
    },
  };
}
