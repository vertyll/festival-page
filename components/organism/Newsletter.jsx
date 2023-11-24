import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Title from "../atoms/Title";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Link from "next/link";
import { validateFormValues } from "@/utils/validation/validation";
import ErrorDiv from "../atoms/ErrorDiv";
import { Alert } from "../atoms/Alert";

const NewsletterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: var(--newsletter-color);
  margin: 200px 0px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: var(--gray-color);
  font-weight: bold;
  margin-bottom: 60px;

  &:hover {
    filter: brightness(0.85);
  }
`;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [showDangerAlert, setShowDangerAlert] = useState(false);
  const [alertDangerMessage, setAlertDangerMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const alertDuration = 3000;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateFormValues({ email }, ["email"]);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const response = await axios.post("/api/newsletter", { email });

      if (response.status === 200) {
        setEmail("");
        setAlertMessage("Pomyślnie zapisano się do newslettera.");
        setShowAlert(true);
        setShowDangerAlert(false);
      } else if (response.status === 409) {
        setAlertDangerMessage("Ten adres email jest już zapisany na listę.");
        setShowDangerAlert(true);
        setShowAlert(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setAlertDangerMessage("Ten adres email jest już zapisany na listę.");
        setShowDangerAlert(true);
        setShowAlert(false);
      } else {
        setAlertDangerMessage("Wystąpił błąd. Spróbuj ponownie później.");
        setShowDangerAlert(true);
        setShowAlert(false);
      }
    }
  };

  return (
    <NewsletterContainer>
      <Title>Zapisz się do newslettera</Title>
      <p>i otrzymuj najnowsze informacje od Sunset Festival!</p>
      <StyledLink href="/privacypolicy">Polityka prywatności</StyledLink>
      <form onSubmit={handleSubmit}>
        <Wrapper>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="wpisz email..."
          />
          <div>
            <Button type="submit" $usage="primary" $size="m">
              Subskrybuj
            </Button>
          </div>
        </Wrapper>
        {validationErrors["email"] && (
          <ErrorDiv>{validationErrors["email"]}</ErrorDiv>
        )}
      </form>
      {showAlert && (
        <Alert
          message={alertMessage}
          duration={alertDuration}
          onClose={() => setShowAlert(false)}
          type="success"
        />
      )}
      {showDangerAlert && (
        <Alert
          message={alertDangerMessage}
          duration={alertDuration}
          onClose={() => setShowDangerAlert(false)}
          type="danger"
        />
      )}
    </NewsletterContainer>
  );
}
