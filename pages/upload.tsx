import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../src/components/Layout";
import { db, storage } from "../src/lib/utils/firebase";
import { v4 as uuidv4 } from "uuid";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = styled.div`
  padding: 3rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  &::before {
    content: "";
    clear: both;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
`;

const Button = styled.div`
  padding: 2rem;
  background-color: #7492ff;
  color: #ffffff;
  border-radius: 0.2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  width: 30vw;
  text-align: center;
  font-weight: bold;
`;

const Label = styled.span``;

const Script = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Column = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding-bottom: 1rem;
`;

const ScriptButton = styled.div`
  padding: 1rem;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  background-color: #ff7485;
  color: #ffffff;
  border-radius: 0.3rem;
  :hover {
    background-color: #ff748580;
  }
`;

const Modal = styled.div`
  width: 50vw;
  height: 100vw;
  background-color: #ffffff;
  position: absolute;
  padding: 2rem;

  .scriptName {
    display: flex;
    flex-direction: column;
  }
  .script {
  }
`;

const FleName = styled.span`
  padding: 0.4rem;
`;

const Name = styled.span``;

const FileTextArea = styled.textarea`
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 2px solid #0a0;
  border-radius: 0.67em;
  background-color: snow;
  width: 20em;
  height: 120px;
  font-size: 1em;
  line-height: 1.2;
  width: 100%;
`;

const fileInitialState = {
  name: "",
  script: ""
};

const AddedFiles = styled.div`
  margin: 0.2rem;
`;

const Page = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iframe, setIframe] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [files, setFiles]: [any, any] = useState([]);
  const [file, setFile] = useState(fileInitialState);
  const [addedName, setAddedName] = useState("");
  const [addedScript, setAddedScript] = useState("");
  const [isModal, setIsModal] = useState(false);
  return (
    <Layout>
      <Container>
        {isModal && (
          <Modal>
            <div className="scriptName">
              <FleName>Name</FleName>
              <input
                defaultValue={addedName}
                onChange={e => setAddedName(e.target.value)}
                type="text"
              />
            </div>
            <div className="script">
              <FileTextArea
                defaultValue={addedScript}
                onChange={e => setAddedScript(e.target.value)}
              ></FileTextArea>
            </div>
            <ScriptButton
              className="add"
              onClick={() => {
                if (!addedName || !addedScript) {
                  alert("Name required");
                  return;
                }
                setFiles(
                  files.concat({
                    name: addedName,
                    script: addedScript
                  })
                );
                setAddedName("");
                setAddedScript("");
                setFile(fileInitialState);
                setIsModal(false);
              }}
            >
              Add Script
            </ScriptButton>
          </Modal>
        )}
        <Form className="project">
          <Column>
            <Label>Project Id</Label>
            <Input
              onChange={e => {
                setId(e.target.value);
              }}
              placeholder={"636348"}
              className="id"
              type="text"
            />
          </Column>
          <Column>
            <Label>Asset Name</Label>
            <Input
              onChange={e => setName(e.target.value)}
              placeholder={"CoinDozer-Project"}
              className="name"
              type="text"
            />
          </Column>

          <Column>
            <Label>Thumbnail</Label>
            <Input
              onChange={e => setImageUrl(e.target.value)}
              className="imageUrl"
              type="text"
              defaultValue={imageUrl}
            />

            <Input
              type="file"
              onChange={async e => {
                const files = e.target.files;
                if (files) {
                  const file = files[0];
                  const storageRef = storage().ref();
                  const imageRef = storageRef.child(`images/${uuidv4()}`);
                  await imageRef.put(file);
                  const url = await imageRef.getDownloadURL();
                  setImageUrl(url);
                  console.log("Change Url !");
                }
              }}
            />
          </Column>

          <Column>
            <Label>Description</Label>
            <TextArea
              onChange={e => setDescription(e.target.value)}
              rows={4}
            ></TextArea>
          </Column>
          <Column>
            <Label>Embedded URL</Label>
            <Input
              onChange={e => setIframe(e.target.value)}
              placeholder={"https://playcanv.as/p/m9PPjO70/"}
              className="iframe"
              type="text"
            />
          </Column>
          <Column>
            <Label>Scripts</Label>
            <Script className="scripts">
              <ScriptButton
                onClick={() => {
                  setIsModal(!isModal);
                }}
              >
                Add Script
              </ScriptButton>

              <div>
                {files.length === 0 ? (
                  <div></div>
                ) : (
                  files.map((file: any) => {
                    return (
                      <AddedFiles key={file.name} className="file">
                        <Name>{file.name}</Name>
                      </AddedFiles>
                    );
                  })
                )}
              </div>
            </Script>
          </Column>
          <Button
            className="button"
            onClick={async () => {
              const data = {
                title: name,
                description,
                url: iframe,
                imageUrl: imageUrl
              };
              console.log(data);
              if (window.confirm("Are you sure want to upload?")) {
                const projectRef = db.collection("projects");
                const doc = await projectRef.add(data);
                for (let file of files) {
                  await projectRef
                    .doc(doc.id)
                    .collection("files")
                    .add(file);
                }

                alert("Uploaded");
              }
            }}
          >
            Upload
          </Button>
        </Form>
      </Container>
    </Layout>
  );
};

export default Page;
