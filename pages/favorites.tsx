import prisma from "../lib/prisma";
import { validateToken, JwtPayload } from "../lib/auth";
import GradientLayout from "../components/gradientLayout";
import SongTable from "../components/songsTable";

const Description = ({ favorites, username }) => {
  return (
    <p>
      <span style={{ fontWeight: 600 }}>{`${username} •`}</span>
      {`${favorites?.length ?? 0} songs`}
    </p>
  );
};

const Favorites = ({ favorites, username }) => {
  const color = "yellow";
  const image =
    "https://external-preview.redd.it/CbSyyvYTDe7dGrYAvBQ1U6Ufez7gZMyZB0ksP5SLdSU.jpg?auto=webp&s=bbab6810a650ea79ffb170869bbd240c205bf087";

  return (
    <GradientLayout
      color={color}
      isRoundAvatar={false}
      title="Favorited songs"
      subtitle="playlist"
      description={<Description favorites={favorites} username={username} />}
      avatar={image}
    >
      <SongTable songs={favorites} />
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
    props: { favorites, username: detailedUser.username },
  };
};

export default Favorites;
