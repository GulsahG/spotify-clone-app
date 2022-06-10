import { Box, Flex, Text } from "@chakra-ui/layout";

const PlayerBar = () => {
  return (
    <Box height="90px" width="100vw" bg="gray.900" paddingX="20px">
      <Flex height="100%" align="center" justify="center">
        <Box flex="3" fontSize="16px" lineHeight="shorter">
          <Text fontWeight="600">Heebiejeebies</Text>
          <Text color="gray.400" fontSize="14px">
            Amine
          </Text>
        </Box>
        <Box flex="12" textAlign="center">
          Player Controls
        </Box>
        <Box flex="5" textAlign="end">
          Player Buttons
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
