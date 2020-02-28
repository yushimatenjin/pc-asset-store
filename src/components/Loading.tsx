import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CircleComponent from "react-circle";

const Container = styled.div`
  flex: 1;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: #ffffff50;
`;

const Circle = styled(CircleComponent)``;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const Component = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const f = async () => {
      await delay(500);
      if (progress >= 100) {
        setProgress(0);
      } else {
        setProgress(progress + 50);
      }
    };
    f();
  }, [progress]);
  return (
    <Container>
      <Circle animate={true} showPercentage={false} progress={progress} />
    </Container>
  );
};

export default Component;
