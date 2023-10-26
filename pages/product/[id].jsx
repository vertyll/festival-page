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
import { useContext, useState } from "react";
import { Category } from "@/models/Category";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 600px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
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
  padding: 10px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) =>
    props.isSelected
      ? "var(--main-deep-pink-color)"
      : "var(--main-plum-color)"};
  color: ${(props) => (props.isSelected ? "var(--light-text-color)" : "var(--dark-text-color)")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--main-giants-orange-color);
    color: var(--light-text-color);
  }
`;

const StyledDescriptionDiv = styled.div`
  display: flex;
  width: 550px;
  border-radius: 30px;
  background-color: var(--light-color);
  padding: 30px;
`;

export default function ProductPage({ product, categoryPath }) {
  const { addProduct } = useContext(CartContext);
  // W komponencie ProductPage, dodaj następujący stan:
  const [selectedProperty, setSelectedProperty] = useState({});

  const allPropertiesSelected = product.properties.every((prop) =>
    selectedProperty.hasOwnProperty(prop.name)
  );

  const handlePropertySelection = (propertyName, option) => {
    setSelectedProperty((prev) => ({
      ...prev,
      [propertyName]: option, // Tutaj zapisujemy wybraną opcję dla danej właściwości.
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
      return product.properties.map((prop, index) => {
        const options = prop.values.split(",");
        return (
          <div key={index}>
            <strong>{prop.name}: </strong>
            {options.map((option, i) => (
              <PropertyButton
                key={i}
                isSelected={selectedProperty[prop.name] === option}
                onClick={() => handlePropertySelection(prop.name, option)}
              >
                {option}
              </PropertyButton>
            ))}
          </div>
        );
      });
    }
    return <div>Brak właściwości dla tego produktu.</div>;
  };

  return (
    <>
      <Layout>
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
                <div>{renderCategoryProperties()}</div>{" "}
              </div>
              <Price>Cena: {product.price} zł</Price>
              <Button
                onClick={() => {
                  if (allPropertiesSelected) {
                    addProduct(product._id, selectedProperty);
                  } else {
                    alert("Wybierz wszystkie opcje przed dodaniem do koszyka.");
                  }
                }}
                size="m"
                usage="primary"
                disabled={!allPropertiesSelected} // opcjonalnie, można dodać styl dla wyłączonego stanu w CSS
              >
                <IconCart />
                Dodaj do koszyka
              </Button>
            </Row>
          </ColWrapper>
          <StyledDescriptionDiv>
            {product.description}
          </StyledDescriptionDiv>
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
