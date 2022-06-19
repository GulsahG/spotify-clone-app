import { Box, Flex, Text } from "@chakra-ui/layout";
import Player from "./player";
import { useStoreState } from "easy-peasy";

const PlayerBar = () => {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useStoreState((state: any) => state.activeSong);
  return (
    <Box height="90px" width="100vw" bg="blackAlpha.700" paddingX="20px">
      <Flex height="100%" align="center" justify="center">
        {activeSong && (
          <Box flex="5" fontSize="16px" lineHeight="shorter">
            <Text fontWeight="600">{activeSong.name}</Text>
            <Text color="gray.400" fontSize="14px">
              {activeSong.artist?.name}
            </Text>
          </Box>
        )}
        <Box flex="12" textAlign="center">
          <Player songs={songs} activeSong={activeSong} />
        </Box>
        <Box flex="5" textAlign="end">
          Player Buttons
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
