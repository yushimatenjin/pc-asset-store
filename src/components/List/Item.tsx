import React, { useState } from "react";
import { File } from "../../../types/data";
import styled from "styled-components";

const Container = styled.div``;

const ScriptBlock = styled.div`
  width: 237px;
  height: 35px;
  border-radius: 3px;
  padding: 0.5rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  color: #555555;
  border: 1px solid #999;
  margin-top: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Script = styled.div`
  padding-top: 1rem;
  padding-bottom: 2rem;
  font-weight: 400;
  font-size: 0.8rem;
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

export default ({ script }: { script: File }) => {
  const [visible, setVisible] = useState(true);
  return (
    <Container key={script.name}>
      <Text>js</Text>
      <ScriptBlock
        style={{
          fontSize: "120%"
        }}
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {script.name} ⇨
      </ScriptBlock>
      {visible !== true ? <Script> {script.script}</Script> : null}
    </Container>
  );
};
