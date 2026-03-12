import React, { useState } from "react";
import styled from "styled-components";
import Title from "../atoms/Title";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Link from "next/link";
import ErrorDiv from "../atoms/ErrorDiv";
import { Alert } from "../atoms/Alert";
import axios from "axios";

const NewsletterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: var(--newsletter-color);
  margin: 200px 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: var(--dark-text-color);
  font-weight: bold;
  margin-bottom: 60px;

  &:hover {
    filter: brightness(0.85);
  }
`;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("default");
  const [showAlert, setShowAlert] = useState(false);
  const alertDuration = 3000;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/newsletter", { email });
      if (response.data?.message) {
        setAlertMessage(response.data.message);
        setAlertType("danger");
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage("Wystąpił błąd. Spróbuj ponownie później.");
      setAlertType("danger");
      setShowAlert(true);
    }
    setValidationErrors({});
    setEmail("");
  };

  return (
    <NewsletterContainer>
      <Title style={{ marginTop: "10px" }}>Zapisz się do newslettera</Title>
      <p>i otrzymuj najnowsze informacje od Sunset Festival!</p>
      <StyledLink href="/privacypolicy">Polityka prywatności</StyledLink>
      <form onSubmit={handleSubmit}>
        <Wrapper>
          <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="wpisz email..." />
          <div>
            <Button type="submit" $usage="primary" $size="m">
              Subskrybuj
            </Button>
          </div>
        </Wrapper>
        {validationErrors["email"] && <ErrorDiv>{validationErrors["email"]}</ErrorDiv>}
      </form>
      {showAlert && (
        <Alert message={alertMessage} duration={alertDuration} onClose={() => setShowAlert(false)} type={alertType} />
      )}
    </NewsletterContainer>
  );
}
