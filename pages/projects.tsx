import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import styled from "styled-components";
import ApiForm from "../src/components/Form/API";
import ScriptList from "../src/components/List/ScriptList";
import { db } from "../src/lib/utils/firebase";
import { Files, Project } from "../types/data";
import Layout from "../src/components/Layout";
import { media } from "../src/styles/ts/media";

const Container = styled.div`
  flex: 1;
  display: flex;
  padding: 2rem;
  justify-content: center;
  ${media.phone`
    padding: 0;
    flex-direction: column;
  `}
`;

const Content = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  padding: 1rem;
  margin-right: 2rem;
  width: 50vw;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
  min-width: 480px;
  ${media.phone`
min-width: 100%;
box-shadow: none;
`}
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 480px;
  border-radius: 10px;
`;
const SideBar = styled.div`
  align-items: center;
  ${media.phone`
  max-width: 100vw;
  width: 100vw;
  `}
`;
const initialState: Project = {
  id: "",
  imageUrl: "",
  title: "",
  description: "",
  url: "",
  files: [
    {
      name: "",
      script: ""
    }
  ]
};

const Block = styled.div`
  border: 0.5px solid #1b1818;
  box-sizing: border-box;
  border-radius: 4px;
  min-height: 150px;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.4rem;
  width: 261px;
  ${media.phone`
    width: 95vw;
    padding-left:0;
    padding-right: 0;
    border: none;
  `}
`;

const Text = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 2rem;
  display: flex;
  align-items: flex-end;
  color: #959191;
  margin-right: auto;
`;

const Title = styled.div`
  font-size: 1.8rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;
const Description = styled.div``;
const Page: NextPage = (props: any) => {
  const [project, setProject] = useState<Project>(initialState);
  const { title, description, url, files } = project;
  const { query } = props;
  const { id } = query;
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    const f = async () => {
      const projectRef = db.collection("projects").doc(id);
      const project = (await projectRef
        .get()
        .then(doc => doc.data())) as Project;
      const files = await projectRef
        .collection("files")
        .get()
        .then(querySnapShoot => {
          const docs = querySnapShoot.docs;
          return docs.map(doc => doc.data()) as Files;
        });

      if (!project || !files) return;
      setProject(Object.assign(project, { files }));
    };
    f();
  }, []);

  return (
    <Layout isLoading={isLoading}>
      <Container>
        <Content>
          <Iframe src={url}></Iframe>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Content>
        <SideBar>
          <ApiForm scripts={files} setIsloading={setIsloading} />
          {Array.isArray(files) && files.length > 0 && (
            <>
              <Text>Scripts</Text>
              <Block className="scripts">
                <ScriptList scripts={files} />
              </Block>
            </>
          )}
        </SideBar>
      </Container>
    </Layout>
  );
};
Page.getInitialProps = async ({ query }) => {
  return { query };
};

export default Page;
