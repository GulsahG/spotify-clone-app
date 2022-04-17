import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

const GradientLayout = ({
  color,
  children,
  avatar,
  subtitle,
  title,
  description,
  isRoundAvatar,
}) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 10%, ${color}.700 20%, ${color}.800 30%, rgba(0,0,0,0.95) 65%)`}
    >
      <Flex p="40px" align="end">
        <Box padding="20px">
          <Image
            src={avatar}
            alt="User avatar image"
            boxSize="200px"
            boxShadow="2xl"
            borderRadius={isRoundAvatar ? "100%" : "3px"}
          />
        </Box>
        <Box padding="20px" lineHeight="40px" color="white">
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="7xl" fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="x-small">{description}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default GradientLayout;
