import prisma from "../lib/prisma";
import { validateToken, JwtPayload } from "../lib/auth";
import GradientLayout from "../components/gradientLayout";
import SongTable from "../components/songsTable";

const Description = ({ favorites, username }) => {
  return (
    <p>
      <span style={{ fontWeight: 600 }}>{`${username} • `}</span>
      {`${favorites?.length ?? 0} songs`}
    </p>
  );
};

const Favorites = ({ favorites, username, userId }) => {
  const color = "cyan";
  const image =
    "https://preview.redd.it/rnqa7yhv4il71.jpg?width=1200&format=pjpg&auto=webp&s=3564fc3ee31b98f6425216c99981f3a3d01253bc";

  return (
    <GradientLayout
      color={color}
      isRoundAvatar={false}
      title="Favorited songs"
      subtitle="playlist"
      description={<Description favorites={favorites} username={username} />}
      avatar={image}
    >
      <SongTable songs={favorites} userId={userId} />
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
  const favorites = await prisma.song.findMany({
    where: { isFavorited: +user.id },
    include: {
      artist: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  console.log(favorites);
  const detailedUser = await prisma.user.findUnique({
    where: { id: user.id },
  });
  return {
    props: {
      favorites,
      username: detailedUser.username,
      userId: detailedUser.id,
    },
  };
};

export default Favorites;
