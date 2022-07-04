import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

const createPlaylist = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  const songs = [];
  try {
    const newPlaylist = await prisma.playlist.create({
      data: {
        name: body.playlistName,
        user: {
          connect: { id: body.user.id },
        },
        songs: {
          connect: songs?.map((song) => ({
            id: song.id,
          })),
        },
      },
    });
    console.log(newPlaylist);
    return res.status(200).json({ ...newPlaylist, success: true });
  } catch (err) {
    console.error("Request error", err);
    res.status(500).json({ error: "Error creating playlist", success: false });
  }
};

export default createPlaylist;
