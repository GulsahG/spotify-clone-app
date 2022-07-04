import { useState } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const CreateForm = ({ user }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    handlePlaylistCreate();
    setIsLoading(false);
  };

  const handlePlaylistCreate = async () => {
    const body = {
      user,
      playlistName: playlistName ? playlistName : "new playlist",
    };
    try {
      const response = await fetch("/api/createPlaylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status !== 200) {
        alert("something went wrong");
      } else {
        console.log("created new playlist!");
        router.push("/library");
      }
    } catch (error) {
      alert(`there was an error handling playlist creation, ${error}`);
    }
  };

  return (
    <Box width="40%" minW="400px" m="0 auto" pb={6} color="white">
      <Flex align="center" justify="center" w="100%">
        <Box borderRadius="6px" w="100%">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel htmlFor="name" mb={2}>
                Playlist name
              </FormLabel>
              <Input
                placeholder="new playlist"
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
              />
              <FormHelperText>
                Be careful, you can't change the name later!
              </FormHelperText>
            </FormControl>
            {/* <Checkbox
              my={4}
              colorScheme="red"
              isChecked={isFavorite}
              onChange={() => setIsFavorite(!isFavorite)}
            >
              Favorite?
            </Checkbox> */}
            <Button
              type="submit"
              bg="green.500"
              my={4}
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
