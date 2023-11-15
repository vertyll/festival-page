import styled from "styled-components";
import Footer from "../organism/Footer";
import Header from "../organism/Header";

const StyledDiv = styled.div`
  min-height: 80vh;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <StyledDiv>{children}</StyledDiv>
      <Footer />
    </>
  );
}
