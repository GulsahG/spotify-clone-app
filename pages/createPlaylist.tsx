import { Box, Flex, Text, LinkBox, LinkOverlay } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import NextLink from "next/link";

// import styles from "../styles/Home.module.css";
import GradientLayout from "../components/gradientLayout";
import prisma from "../lib/prisma";
import { useMe } from "../lib/hooks";

import CreateForm from "../components/createPlaylistForm";

const CreatePlaylist = ({ playlists }) => {
  const { user } = useMe();

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
      "https://i.pinimg.com/736x/8d/76/65/8d7665995e979124180ee264e4ac10f5.jpg",
    ];

    return images[id] || images[Math.floor(Math.random() * images.length)];
  };

  return (
    <GradientLayout
      color="blackAlpha"
      isRoundAvatar={false}
      subtitle=""
      title={"Create Playlist"}
      avatar=""
      description=""
    >
      <CreateForm user={user} />
      <Box color="white" paddingX="40px">
        <Box marginBottom="30px">
          <Text fontSize="xl" fontWeight="bold">
            Current Playlists
          </Text>
        </Box>
        <Flex flexWrap="wrap" justify="flex-start">
          {playlists?.map(
            (playlist: { id: number; name: string }, idx: number) => (
              <LinkBox
                key={playlist.id}
                width="calc(20% - 40px)"
                mx="20px"
                bg="rgba(0,0,0,0.5)"
                _hover={{
                  bg: "rgba(255,255,255,0.05)",
                  transition: "all .3s",
                }}
                mb={4}
                borderRadius="4px"
              >
                <NextLink
                  href={{
                    pathname: "/playlist/[id]",
                    query: { id: playlist.id },
                  }}
                  passHref
                >
                  <LinkOverlay>
                    <Box width="100%">
                      <Image
                        src={getBGImage(idx)}
                        boxSize="200px"
                        objectFit="cover"
                        m="0 auto"
                        pt={3}
                        borderRadius="4px"
                      />
                      <Box m="20px 0 10px 20px">
                        <Text fontSize="sm" fontWeight="bold">
                          {playlist.name}
                        </Text>
                        <Text fontSize="x-small" color="gray.400" pb={6}>
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
  const playlists = await prisma.playlist.findMany({});
  return {
    props: { playlists },
  };
};
export default CreatePlaylist;
