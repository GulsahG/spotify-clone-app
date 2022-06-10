import { Box } from "@chakra-ui/layout";
import Sidebar from "./sidebar";
import PlayerBar from "./playerBar";

const PlayerLayout = ({ children }) => {
  return (
    <Box w="100vw" h="100vh">
      <Box position="absolute" top="0" width="250px" left="0">
        <Sidebar />
      </Box>
      <Box marginLeft="250px" marginBottom="90px">
        <Box height="calc(100vh - 90px)">{children}</Box>
      </Box>
      <Box position="absolute" left="0" bottom="0">
        <PlayerBar />
      </Box>
    </Box>
  );
};

export default PlayerLayout;
