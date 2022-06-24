import { Box, Text } from "@chakra-ui/layout";
import { Table, Thead, Td, Tr, Tbody, Th, IconButton } from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle, AiOutlineHeart } from "react-icons/ai";
import { formatTime, formatDate } from "../lib/formatters";
import { useStoreActions } from "easy-peasy";
// import { usePlaylistSongs } from "../lib/hooks";
// import { useSWRConfig } from "swr";
import { useRouter } from 'next/router'
// import { useEffect, useState } from "react";

const SongTable = ({ songs, userId }) => {
  const router = useRouter()
  // const { playlists, isLoading, isError } = usePlaylistSongs();
  // const { mutate } = useSWRConfig();

  // const [songsState, setSongsState] = useState(songs);
  // const [mutatedSongs, setMutatedSongs] = useState([]);

  const playSongs = useStoreActions((store: any) => store.changeActiveSongs);
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);

  const handlePlay = (activeSong = null) => {
    setActiveSong(activeSong ?? songs[0]);
    playSongs(songs);
  };

  const handleFavorite = async (userId: number, songId: number, favState: number) => {
    // debugger;
    // not working as expected
    const selectedSong = songs.findIndex(s => s.id === songId);
    songs[selectedSong].isFavorited = songs[selectedSong].isFavorited === userId ? 0 : userId;
    const body = { userId, songId, favState };
    try {
      const response = await fetch("/api/handleFavorite", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
    });
    if (response.status !== 200){
      console.log("something went wrong");
      //set an error banner here
    } else {
      console.log("setted favorite state successfully !!!")
      // mutate('/api/playlistSongs', false)
      //set a success banner here
    }
    //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log("there was an error handling", error);
    }
  };

  // useEffect(() => {
  //   if(playlists && !isLoading && !isError) {
  //     const playlist = playlists?.find(playlist => playlist.id === +router.query.id)
  //     setMutatedSongs(playlist.songs);
  //   }
  // }, [playlists, isLoading, isError])

  // useEffect(() => {
  //   if(songsState.length && JSON.stringify(songsState) !== JSON.stringify(songs)) {
  //     debugger;
  //     setSongsState(mutatedSongs)
  //   }
  // }, [mutatedSongs])

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
              <Th fontWeight="light" paddingInlineStart={20}>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody fontSize="16px">
            {songs?.map(
              (
                song: {
                  id: number;
                  name: string;
                  artist: { name: string };
                  createdAt: Date;
                  duration: number;
                  isFavorited: number;
                },
                idx: number
              ) => (
                <Tr
                  key={song?.id}
                  sx={{
                    transition: "all .3s",
                  }}
                  _hover={{
                    background: "rgba(255, 255, 255, 0.1)",
                    "&>td>button": { opacity: "1" },
                  }}
                  cursor="pointer"
                  onDoubleClick={() => handlePlay(song)}
                >
                  <Td color="gray.400" width="20px">
                    {idx + 1}
                  </Td>

                  <Td paddingInlineStart={0}>
                    <Box>
                      <Text fontWeight="500"> {song?.name}</Text>
                      <Text color="gray.400" fontSize="14px">
                        {song?.artist?.name ?? ""}
                      </Text>
                    </Box>
                  </Td>

                  {/* <Td>{song?.album}</Td> */}
                  <Td color="gray.400">{formatDate(song?.createdAt)}</Td>
                  <Td color="gray.400">
                    <IconButton
                      aria-label="Favorite song"
                      icon={<AiOutlineHeart fontSize="18px" />}
                      size="xs"
                      bg="none"
                      color={
                        song?.isFavorited === userId ? "#1dd05d" : "gray.400"
                      }
                      opacity={song?.isFavorited === userId ? "1" :  "0"}
                      mb={1}
                      mr={4}
                      _hover={{
                        bg: "none",
                        color: "gray.100",
                      }}
                      _focus={{ bg: "none" }}
                      _active={{ bg: "none" }}
                      onClick={() => handleFavorite(userId, song?.id, song?.isFavorited)}
                    ></IconButton>
                    {formatTime(song?.duration)[0]}
                  </Td>
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
