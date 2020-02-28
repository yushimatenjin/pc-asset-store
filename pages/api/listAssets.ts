import PlayCanvas from "playcanvas-node";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    accessToken,
    projectId,
    branchId
  }: { accessToken: string; projectId: string, branchId: string } = req.query as any;
  if (!accessToken || !projectId || !branchId) {
    return res.json({
      Error: "Request parameter is Invalid"
    });
  }
  try {
    const playcanvas = new PlayCanvas({
      accessToken,
      projectId: Number(projectId),
      branchId: branchId
    });
    const assets = await playcanvas.getListAssets();
    return res.json(assets);
  } catch (e) {
    return res.json({
      Error: "Error"
    });
  }
};
