import React, { useState } from "react";
import qs from "../../lib/utils/qs";
import styled from "styled-components";
import { media } from "../../styles/ts/media";
const Container = styled.div``;

const Input = styled.input`
  width: 237px;
  height: 35px;
  background: #c4c4c4;
  border-radius: 3px;
  border: none;
  padding: 0.5rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  color: #555555;
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

const Block = styled.div`
  border: 0.5px solid #1b1818;
  box-sizing: border-box;
  border-radius: 4px;
  width: 261px;
  min-height: 150px;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.4rem;
  ${media.phone`
    width: 95vw;
    padding-left:0;
    padding-right: 0;
    border: none;
  `}
`;

const BlockCover = styled.div`
  background: rgba(196, 196, 196, 0.4);
  width: 261px;
  height: 235px;
  color: #000000;
  position: absolute;
  ::before {
    content: "Please Authenticate with your API key";
    font-size: 0.65rem;
    position: absolute;
    top: calc(100% - 55%);
    left: calc(100% - 91%);
    font-weight: bold;
  }
  ${media.phone`
    width: 95vw;
    padding-left:0;
    padding-right: 0;
    border: none;
  `}
`;
const Button = styled.div`
  background-color: #64c7ff;
  width: 100px;
  color: white;
  text-align: center;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 800;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  margin: 0.3rem 0.7rem 0 auto;

  :hover {
    opacity: 0.8;
  }
  :active {
    opacity: 0.6;
  }
`;

const Select = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  display: block;
  width: 95%;
  height: 2rem;
  float: right;
  padding: 0px 1rem;
  line-height: 1.35;
  color: #333;
  background-color: #ffffff;
  background-image: none;
  border: 1px solid #cccccc;
  -ms-word-break: normal;
  word-break: normal;
`;

const Option = styled.option``;

export default ({
  scripts,
  setIsloading
}: {
  scripts: any;
  setIsloading: any;
}) => {
  const [scenes, setScenes]: [any, any] = useState([]);
  const [branches, setBranches]: [any, any] = useState([]);
  const [folders, setFolders]: [any, any] = useState([]);
  const [accessToken, setAccessToken]: [any, any] = useState("");
  const [projectId, setProjectId] = useState("");
  return (
    <>
      <Container>
        <Text>Import Asset </Text>
        <Block>
          <Text>
            API Key (
            <a target="_blank" href="https://playcanvas.com/account">
              GET
            </a>
            )
          </Text>
          <Input
            type="text"
            onChange={e => {
              setAccessToken(e.target.value);
            }}
            defaultValue={accessToken}
            placeholder="API KEY"
          />
          <Text>
            Target Project Id {" ("}
            {projectId && (
              <a
                target="_blank"
                href={`https://playcanvas.com/project/${projectId}`}
              >
                OPEN
              </a>
            )}
            {") "}
          </Text>

          <Input
            type="text"
            defaultValue={projectId}
            onChange={e => {
              setProjectId(e.target.value);
            }}
            placeholder="Project Id"
          />
          <Button
            onClick={async () => {
              setIsloading(true);
              const [scenesRes, branchesRes] = await Promise.all([
                fetch(qs(`/api/scenes`, { accessToken, projectId })),
                fetch(qs(`/api/branches`, { accessToken, projectId }))
              ]);
              setIsloading(false);

              const scenes = await scenesRes.json();
              setScenes(scenes);

              const branches = await branchesRes.json();
              setBranches(branches);

              if (branches.length) {
                const AssetsRes = await fetch(
                  qs(`/api/listAssets`, {
                    accessToken,
                    projectId,
                    branchId: branches[0].id
                  })
                );
                const assets = await AssetsRes.json();
                setFolders(assets);
              }
            }}
          >
            auth
          </Button>
        </Block>
        <Block>
          {!scenes.length && !branches.length && <BlockCover></BlockCover>}
          <Text>Branch</Text>
          <Select>
            {Array.isArray(branches) &&
              branches.map((branch: any) => (
                <Option key={branch.id} value={branch.name}>
                  {branch.name}
                </Option>
              ))}
          </Select>
          <Text>Scene</Text>
          <Select>
            {Array.isArray(scenes) &&
              scenes.map((scene: any) => (
                <Option key={scene.id}>{scene.name}</Option>
              ))}
          </Select>
          <Text>Upload to</Text>

          <Select>
            {folders
              .filter((folder: any) => folder.type === "folder")
              .map((folder: any) => (
                <Option key={folder.id} value={folder.name}>
                  {folder.name}
                </Option>
              ))}
          </Select>
          <Button
            onClick={async () => {
              setIsloading(true);

              for (let script of scripts) {
                const body = JSON.stringify({
                  accessToken,
                  projectId,
                  branchId: branches[0].id,
                  scenes: scenes[0].id,
                  parent: String(folders[0].id),
                  name: script.name,
                  script: script.script
                });
                const response = await fetch(`/api/upload`, {
                  method: "post",
                  body: body
                });
                await response.json();
              }
              setIsloading(false);
            }}
          >
            Import
          </Button>
        </Block>
      </Container>
    </>
  );
};
