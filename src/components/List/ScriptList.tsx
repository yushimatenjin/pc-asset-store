import * as React from "react";
import Item from "./Item";
import { File } from "../../../types/data";

const ScriptsList = ({ scripts }: { scripts: any }) => {
  if (!scripts || !scripts.length) {
    return null;
  }

  return scripts.map((script: File) => (
    <Item key={script.name} script={script} />
  ));
};

export default ScriptsList;
