import prisma from "../../lib/prisma";
import { validateToken, JwtPayload } from "../../lib/auth";
// import playlist from "../api/playlist";
import GradientLayout from "../../components/gradientLayout";
import SongTable from "../../components/songsTable";
import { formatTime } from "../../lib/formatters";

const getBGColor = (id: number) => {
  const colors = [
    "pink",
    "purple",
    "cyan",
    "green",
    "red",
    "blue",
    "teal",
    "red",
    "gray",
    "red",
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const getBGImage = (id: number) => {
  const images = [
    "https://i.pinimg.com/736x/83/25/24/83252480422984a7d48949bc1989841a.jpg",
    "https://i.pinimg.com/736x/e0/61/36/e06136f1870f119c5384d865a20c499e.jpg",
    "https://i.pinimg.com/564x/c7/aa/d8/c7aad811e0cc709f4a915fa02456b8a8.jpg",
    "https://i.pinimg.com/564x/c9/bf/d0/c9bfd0f31003461edf84cba50b472ac3.jpg",
    "https://i.pinimg.com/564x/bb/4a/e5/bb4ae5678eb217085e8379a26c1f6caa.jpg",
    "https://i.pinimg.com/564x/a5/dd/68/a5dd68a04341aca8e7085dd93e4b7f67.jpg",
    "https://i.pinimg.com/564x/72/7b/99/727b9995cd3d215f5a5ee495dc5a6aff.jpg",
    "https://i.pinimg.com/564x/22/ed/c5/22edc5e485ff91f9c33eb5ba9e329bd6.jpg",
    "https://i.pinimg.com/564x/fd/ef/bb/fdefbb0e702a2ea9934a059927a1af3f.jpg",
    "https://i.pinimg.com/736x/95/00/33/950033b0ab4734dcda897861a3443e3a.jpg",
  ];

  return images[id - 1] || images[Math.floor(Math.random() * images.length)];
};

const Description = ({ playlist, username }) => {
  let playlistDuration = playlist.songs?.reduce(
    (acc: any, song: { duration: number }) => acc + song.duration,
    0
  );
  playlistDuration = formatTime(playlistDuration)[1];
  return (
    <p>
      <span style={{ fontWeight: 600 }}>
        {`${username} • ${playlist.songs.length} songs, `}
      </span>
      {`${
        playlistDuration[0]
          ? `${playlistDuration[0]} hr ${playlistDuration[1]} min`
          : `${playlistDuration[1] ? `${playlistDuration[1]} min ` : ""}
          ${playlistDuration[2]} sec`
      }`}
    </p>
  );
};

const Playlist = ({ playlist, username, userId }) => {
  const color = getBGColor(playlist.id);
  const image = getBGImage(playlist.id);

  return (
    <GradientLayout
      color={color}
      isRoundAvatar={false}
      title={playlist.name}
      subtitle="playlist"
      description={<Description playlist={playlist} username={username} />}
      avatar={image}
    >
      <SongTable songs={playlist.songs} userId={userId} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let user: JwtPayload;
  try {
    user = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  } catch (err) {
    console.error(err);
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }
  const [playlist] = await prisma.playlist.findMany({
    where: { id: +query.id, userId: user.id },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
  const detailedUser = await prisma.user.findUnique({
    where: { id: user.id },
  });
  return {
    props: {
      playlist,
      username: detailedUser.username,
      userId: detailedUser.id,
    },
  };
};

export default Playlist;
