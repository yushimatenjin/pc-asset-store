import PlayCanvas from "playcanvas-node";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    accessToken,
    projectId,
    branchId,
    scenes,
    parent,
    name,
    script
  }: {
    accessToken: string;
    projectId: string;
    branchId: string;
    scenes: string;
    parent: string;
    name: string;
    script: string;
  } = JSON.parse( req.body) as any;
  console.log(accessToken,projectId, scenes, branchId)
  if (!accessToken || !projectId || !scenes || !branchId) {
    return res.json({
      Error: "Request parameter is Invalid"
    });
  }
  try {
    const playcanvas = new PlayCanvas({
      accessToken,
      projectId: Number(projectId),
      branchId: branchId,
      scenes: [Number(scenes)]
    });

    const options: any = {
      name: name,
      script: script,
    };

    if (parent) {
      //options.parent = parent;
    }
   const result =  await playcanvas.uploadScript(options);
    return res.json({
      result
    })
  } catch (e) {
    console.log(e)
    return res.json({
      Error: "Error"
    });
  }
};
