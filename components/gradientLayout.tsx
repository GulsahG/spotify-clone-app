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
      bgGradient={`linear(${color}.500 0%, ${color}.600 10%, ${color}.700 20%, ${color}.800 25%, ${color}.900 40%, rgba(0,0,0,0.95) 65%)`}
    >
      <Flex bg={`${color}.800`} p="40px 40px 25px 40px" align="end">
        {avatar && (
          <Box padding="20px">
            <Image
              src={avatar}
              alt="User avatar image"
              boxSize="200px"
              objectFit="cover"
              boxShadow="2xl"
              borderRadius={isRoundAvatar ? "100%" : "3px"}
            />
          </Box>
        )}
        <Box padding="20px" lineHeight="40px" color="white">
          <Text
            mb="15px"
            fontSize="x-small"
            fontWeight="bold"
            casing="uppercase"
          >
            {subtitle}
          </Text>
          <Text mb="20px" fontSize="7xl" fontWeight="bold">
            {title}
          </Text>
          <Text mt="10px" fontSize="x-small">
            {description}
          </Text>
        </Box>
      </Flex>
      <Box paddingY="50px">{children}</Box>
    </Box>
  );
};

export default GradientLayout;
