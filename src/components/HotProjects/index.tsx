import React from "react";
import { Project } from "../../../types/data";
import ProjectComponent from "./Project";

const Component = (props: any) => {
  const { projects } = props;
  return projects.map((project: Project) => {
    return <ProjectComponent project={project} key={project.id} />;
  });
};

export default Component;
