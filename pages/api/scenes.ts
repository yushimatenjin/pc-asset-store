import PlayCanvas from "playcanvas-node";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    accessToken,
    projectId
  }: { accessToken: string; projectId: string } = req.query as any;
  if (!accessToken || !projectId) {
    return res.json({
      Error: "Request parameter is Invalid"
    });
  }
  try {
    const playcanvas = new PlayCanvas({
      accessToken,
      projectId: Number(projectId)
    });
    const scenes = await playcanvas.listScenes();
    return res.json(scenes);
  } catch (e) {
    return res.json({
      Error: "Error"
    });
  }
};
