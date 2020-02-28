import React from "react";
import { Project } from "../../../types/data";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.a`
  background-color: #ffffff;
  background-size: contain;
  padding: 2rem;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  :hover {
    opacity: 0.8;
  }
  :active {
    opacity: 0.6;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 90%;
  filter: blur(0.5px);
`;

const Infomartion = styled.div`
  height: 2rem;
  color: #8c4a4a;
  margin-top: 1rem;
  overflow: hidden;
`;

const Title = styled.span`
  padding: 1.2rem;
  padding-left: 0;
  font-weight: bold;
`;

const Component = ({ project }: { project: Project }) => {
  const { id, imageUrl, title } = project;
  return (
    <Link href={{ pathname: "projects", query: { id } }}>
      <Container>
        <Photo src={imageUrl} />
        <Infomartion>
          <Title>{title}</Title>
        </Infomartion>
      </Container>
    </Link>
  );
};

export default Component;
