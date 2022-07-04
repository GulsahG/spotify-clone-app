import { useState } from "react";
import { Box, Flex, Input, Button, Checkbox } from "@chakra-ui/react";
import { useRouter } from "next/router";
// import { useSWRConfig } from "swr";
import NextImage from "next/image";

const CreateForm = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    setIsLoading(false);
    router.push("/library");
  };

  return (
    <Box width="30%" minW="350px" pb={10} pl={10} color="white">
      <Flex align="center" justify="center">
        <Box borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="name"
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
            />
            <Checkbox my={4} colorScheme="red">
              Favorite?
            </Checkbox>
            <Button
              type="submit"
              bg="green.500"
              mt={8}
              mb={4}
              float="right"
              _hover={{ backgroundColor: "green.400" }}
              isLoading={isLoading}
            >
              Create
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default CreateForm;
