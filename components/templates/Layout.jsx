import styled from "styled-components";
import Footer from "../organism/Footer";
import Header from "../organism/Header";
import { AnimatedPage } from "../atoms/AnimatedPage";
import { pageTransition, pageVariants } from "@/utils/animations";
import Newsletter from "../organism/Newsletter";

const StyledDiv = styled.div`
  min-height: 80vh;
  margin-bottom: 50px;
`;

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <AnimatedPage
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <StyledDiv>{children}</StyledDiv>
      </AnimatedPage>
      <Newsletter />
      <Footer />
    </>
  );
}
