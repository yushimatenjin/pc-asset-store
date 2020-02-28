export type File = {
  name: string;
  script: string;
};

export type Files = Array<File | []>;

export type Project = {
  id: string;
  imageUrl: string;
  title: string;
  url?: string;
  description: string;
  files?: Files;
};

export type Projects = Array<Project>;
