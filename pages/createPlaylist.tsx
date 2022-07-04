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

  return (
    <GradientLayout
      color="gray"
      isRoundAvatar={false}
      subtitle=""
      title={"Create Playlist"}
      avatar=""
      description=""
    >
      <CreateForm />
      <Box color="white" paddingX="40px">
        <Box marginBottom="30px">
          <Text fontSize="xl" fontWeight="bold">
            Current Playlists
          </Text>
        </Box>
        <Flex flexWrap="wrap" justify="flex-start">
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

export const getServerSideProps = async () => {
  const playlists = await prisma.playlist.findMany({});
  return {
    props: { playlists },
  };
};
export default CreatePlaylist;
