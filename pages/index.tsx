import Head from "next/head";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

// import styles from "../styles/Home.module.css";
import GradientLayout from "../components/gradientLayout";
import prisma from "../lib/prisma";
import { useMe } from "../lib/hooks";

const Home = ({ artists }) => {
  const { user } = useMe();

  return (
    <GradientLayout
      color="brown"
      isRoundAvatar
      subtitle="profile"
      title={user?.username ?? ""}
      description={`${user?.playlistsCount ?? ""} Public Playlists - ${
        user?.followersCount ?? ""
      } Followers`}
      avatar="https://i.scdn.co/image/ab6775700000ee8508d489fbe80dd6c89e0c2b70"
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="30px">
          <Text fontSize="xl" fontWeight="bold">
            Top artists this month
          </Text>
          <Text fontSize="x-small" mt="2px" color="gray.400">
            Only visible to you
          </Text>
        </Box>
        <Flex>
          {artists.map((artist: { id: number; name: string }, idx: number) => (
            <Box
              key={artist.id}
              width="calc(24.29% - 40px)"
              marginLeft={idx === 0 ? "0" : "40px"}
            >
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
                  src="https://i.scdn.co/image/ab6761610000e5ebd6f2323c1971fd5a70cd0255"
                  borderRadius="100%"
                />
                <Box m="20px 0 10px 0">
                  <Text fontSize="sm" fontWeight="bold">
                    {artist.name}
                  </Text>
                  <Text fontSize="x-small" color="gray.400">
                    Artist
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});
  return {
    props: { artists },
  };
};
export default Home;
