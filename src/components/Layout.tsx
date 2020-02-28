import React  from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import Loading from "./Loading";

const Container = styled.div`
  margin: 0 auto;
`;

const Component = (props : any) => {


  return (
    <Container>
      {props.isLoading && <Loading />}
      <Header />
      {props.children}
      <Footer />
    </Container>
  );
};

export default Component;
