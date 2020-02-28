import * as React from "react";
import styled from "styled-components";
import { black, white } from "./../styles/ts/colors";
const Container = styled.footer`
  width: 100%;
  color: ${white};
  background-color: ${black};
  position: fixed;
  bottom: 0;
  .copyright {
    text-align: center;
    padding: 1rem;
  }
`;

const Footer: React.FunctionComponent = () => (
  <Container>
    <p className="copyright">pc-asset-store @GitHub</p>
  </Container>
);
export default Footer;
