import { Box, Text } from "@chakra-ui/layout";
import { Table, Thead, Td, Tr, Tbody, Th, IconButton } from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { formatTime, formatDate } from "../lib/formatters";
import { useStoreActions } from "easy-peasy";

const SongTable = ({ songs }) => {
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs);
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);

  const handlePlay = (activeSong = null) => {
    setActiveSong(activeSong ?? songs[0]);
    playSongs(songs);
  };

  return (
    <Box bg="transparent">
      <Box p="10px" mb="20px" ml="50px" mt="-25px">
        <IconButton
          aria-label="Play the current playlist's songs"
          icon={<BsFillPlayFill fontSize="35px" color="black" />}
          bg="#1dd05d"
          _hover={{ transform: "scale(1.1)" }}
          _active={{ bg: "#1dd05d" }}
          size="lg"
          isRound
          onClick={() => handlePlay()}
        />
        <Table variant="unstyled" mt="15px">
          <Thead
            borderBottom="1px solid rgba(255, 255, 255, 0.2)"
            color="gray.400"
          >
            <Tr>
              <Th fontWeight="light" width="20px">
                #
              </Th>
              <Th fontWeight="light" paddingInlineStart={0}>
                TITLE
              </Th>
              {/* <Th fontWeight="light">ALBUM</Th> */}
              <Th fontWeight="light">DATE ADDED</Th>
              <Th fontWeight="light" paddingInlineStart={10}>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody fontSize="16px">
            {songs.map(
              (
                song: {
                  id: number;
                  name: string;
                  artist: { name: string };
                  createdAt: Date;
                  duration: number;
                },
                idx: number
              ) => (
                <Tr
                  key={song.id}
                  sx={{
                    transition: "all .3s",
                  }}
                  _hover={{ background: "rgba(255, 255, 255, 0.1)" }}
                  cursor="pointer"
                  onDoubleClick={() => handlePlay(song)}
                >
                  <Td color="gray.400" width="20px">
                    {idx + 1}
                  </Td>

                  <Td paddingInlineStart={0}>
                    <Box>
                      <Text fontWeight="500"> {song.name}</Text>
                      <Text color="gray.400" fontSize="14px">
                        {song.artist?.name ?? ""}
                      </Text>
                    </Box>
                  </Td>

                  {/* <Td>{song.album}</Td> */}
                  <Td color="gray.400">{formatDate(song.createdAt)}</Td>
                  <Td color="gray.400">{formatTime(song.duration)[0]}</Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SongTable;
