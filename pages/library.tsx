import { Box, Flex, Text, LinkBox, LinkOverlay } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import NextLink from "next/link";
import { validateToken, JwtPayload } from "../lib/auth";

// import styles from "../styles/Home.module.css";
import GradientLayout from "../components/gradientLayout";
import prisma from "../lib/prisma";
import { useMe } from "../lib/hooks";

const Library = ({ playlists, favsLength }) => {
  const { user } = useMe();

  return (
    <GradientLayout
      color="gray"
      isRoundAvatar={false}
      subtitle=""
      title={"My Library"}
      avatar=""
      description=""
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="30px">
          <Text fontSize="xl" fontWeight="bold">
            Playlists
          </Text>
        </Box>
        <Flex flexWrap="wrap" justify="flex-start">
          <LinkBox width="calc(20% - 40px)" mx="20px">
            <NextLink href="/favorites" passHref>
              <LinkOverlay>
                <Box
                  width="100%"
                  //   bg="rgba(0,0,0,0.5)"
                  //   _hover={{
                  //     bg: "rgba(255,255,255,0.05)",
                  //     transition: "all .3s",
                  //   //   }}
                  //   padding="15px"
                >
                  <Image src="https://preview.redd.it/rnqa7yhv4il71.jpg?width=1200&format=pjpg&auto=webp&s=3564fc3ee31b98f6425216c99981f3a3d01253bc" />
                  <Box m="20px 0 10px 0">
                    <Text fontSize="sm" fontWeight="bold">
                      {`${favsLength} favorited songs`}
                    </Text>
                    <Text fontSize="x-small" color="gray.400">
                      {`- ${user?.username}`}
                    </Text>
                  </Box>
                </Box>
              </LinkOverlay>
            </NextLink>
          </LinkBox>
          {playlists?.map(
            (playlist: { id: number; name: string }, idx: number) => (
              <LinkBox key={playlist.id} width="calc(20% - 40px)" mx="20px">
                <NextLink
                  href={{
                    pathname: "/playlist/[id]",
                    query: { id: playlist.id },
                  }}
                  passHref
                >
                  <LinkOverlay>
                    <Box
                      width="100%"
                      bg="rgba(0,0,0,0.5)"
                      _hover={{
                        bg: "rgba(255,255,255,0.05)",
                        transition: "all .3s",
                      }}
                      borderRadius="4px"
                      padding="15px"
                    >
                      <Image
                        src={`https://picsum.photos/400?random=${idx}`}
                        borderRadius="100%"
                      />
                      <Box m="20px 0 10px 0">
                        <Text fontSize="sm" fontWeight="bold">
                          {playlist.name}
                        </Text>
                        <Text fontSize="x-small" color="gray.400">
                          {`- ${user?.username}`}
                        </Text>
                      </Box>
                    </Box>
                  </LinkOverlay>
                </NextLink>
              </LinkBox>
            )
          )}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ req }) => {
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
  const playlists = await prisma.playlist.findMany({});
  return {
    props: { playlists, favsLength: favorites?.length },
  };
};
export default Library;
