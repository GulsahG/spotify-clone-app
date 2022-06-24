import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

const handleFavorite = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  try {
    const updatedSong = await prisma.song.update({
      where: {
        id: body.songId,
      },
      data: {
        isFavorited: body.favState ? 0 : body.userId,
      },
    })
    console.log(updatedSong);
    return res.status(200).json({updatedSong});
  } catch (err) {
    console.error("Request error", err);
    res.status(500).json({ error: "Error creating question", success:false });
  }
};

export default handleFavorite;
