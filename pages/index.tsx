import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import styled from "styled-components";
import { media } from "../src/styles/ts/media";
import HotProjects from "../src/components/HotProjects";
import SIZE from "../src/styles/ts/size";
import { db } from "./../src/lib/utils/firebase";
import { Projects } from "../types/data";
import Layout from "../src/components/Layout";
const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  ${media.phone`
    flex-direction: column;
  `}
`;

const Content = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  padding: 1rem;
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
  width: 50vw;
  min-width: 480px;

  ${media.phone`
width: 100%;
min-width: auto;
padding-left: 0;
padding-right: 0;
margin: 0;
`}
`;

const Tags = styled.div`
  display: flex;
  align-items: center;
`;

const Tag = styled.span`
  padding-left: 1rem;
  padding-right: 1rem;
  background: gray;
  border-radius: 1rem;
  margin: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  color: #ffffff;
`;

const List = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, 50%);
  grid-auto-rows: ${SIZE.RECT_HEIGHT}px;
  grid-gap: 1rem;
  ${media.phone`
  grid-template-columns: repeat(1, 1fr);
  `}
`;

const Page: NextPage = () => {
  const [projects, setProjects] = useState<Projects>([]);
  useEffect(() => {
    const f = async () => {
      await db
        .collection("projects")
        .get()
        .then(querySnapshot => {
          const projects = querySnapshot.docs.map(doc => {
            return Object.assign(doc.data(), { id: doc.id });
          }) as Projects;
          if (!projects) return;
          setProjects(projects);
        });
    };
    f();
  }, []);
  return (
    <Layout>
      <Container className="main">
        <Content>
          <List>
            <HotProjects projects={projects} />
          </List>
        </Content>
      </Container>
    </Layout>
  );
};

export default Page;
