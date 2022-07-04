import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import { useEffect, useRef, useState } from "react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
import { useStoreActions } from "easy-peasy";
import { formatTime } from "../lib/formatters";

const Player = ({ songs, activeSong, volume }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(
    songs.findIndex((s) => s.id === activeSong?.id)
  );
  const [seek, setSeek] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);

  const soundRef = useRef(null);
  const repeatRef = useRef(repeat);
  const firstRender = useRef(true);

  const changeActiveSong = useStoreActions(
    (state: any) => state.changeActiveSong
  );

  const prevSong = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1;
    });
  };

  const nextSong = () => {
    debugger;
    setIndex((state: number) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);
        if (next === state) return nextSong();
        return next;
      }
      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0);
      soundRef.current?.seek(0);
    } else {
      nextSong();
    }
  };

  const onLoad = () => {
    setDuration(soundRef.current?.duration());
  };

  const onSeek = (e: any[]) => {
    setSeek(e[0]);
    soundRef.current?.seek(e[0]);
  };

  useEffect(() => {
    let timerId: number;

    if (isPlaying && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current?.seek());
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }

    cancelAnimationFrame(timerId);
  }, [isPlaying, isSeeking]);

  useEffect(() => {
    if (firstRender.current && activeSong) {
      firstRender.current = false;
      return;
    }
    if (!firstRender.current && activeSong && !isPlaying) {
      setIsPlaying(true);
    }
  }, [activeSong]);

  // useEffect(() => {
  //   debugger;
  //   if (songs.length && activeSong === null) {
  //     const idx = songs.findIndex((s) => s.isFavorited !== 0);
  //     changeActiveSong(songs[idx]);
  //   }
  // }, [songs]);

  useEffect(() => {
    if (index === -1) setIndex(songs.findIndex((s) => s.id === activeSong?.id));
    else changeActiveSong(songs[index]);
  }, [index, changeActiveSong, songs]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  return (
    <Box>
      <Box>
        {activeSong && (
          <ReactHowler
            src={activeSong?.url}
            playing={isPlaying}
            ref={soundRef}
            onLoad={onLoad}
            onEnd={onEnd}
            volume={volume}
          />
        )}
      </Box>
      <Center>
        <ButtonGroup>
          <IconButton
            outline=""
            variant="link"
            aria-label="Shuffle queue"
            fontSize="20px"
            icon={<MdShuffle />}
            color={shuffle ? "#1dd05d" : "gray.400"}
            _hover={{ color: "gray.100", transition: "all .3s" }}
            onClick={() => setShuffle(!shuffle)}
          />
          <IconButton
            outline=""
            variant="link"
            aria-label="Play previous song in queue"
            fontSize="30px"
            icon={<MdSkipPrevious />}
            color="gray.400"
            sx={{ marginInlineStart: "0 !important" }}
            _hover={{ color: "gray.100", transition: "all .3s" }}
            onClick={prevSong}
          />
          {isPlaying ? (
            <IconButton
              outline=""
              variant="link"
              aria-label="Pause current song in queue"
              fontSize="38px"
              icon={<MdOutlinePauseCircleFilled />}
              color="gray.100"
              sx={{ marginInlineStart: "0 !important" }}
              _hover={{
                transform: "scale(1.1)",
                transition: "all .3s ease-in-out",
              }}
              onClick={() => setIsPlaying(false)}
            />
          ) : (
            <IconButton
              outline=""
              variant="link"
              aria-label="Play current song in queue"
              fontSize="38px"
              icon={<MdOutlinePlayCircleFilled />}
              color="gray.100"
              sx={{ marginInlineStart: "0 !important" }}
              _hover={{
                transform: "scale(1.1)",
                transition: "all .3s ease-in-out",
              }}
              onClick={() => setIsPlaying(true)}
            />
          )}
          <IconButton
            outline=""
            variant="link"
            aria-label="Play next song in queue"
            fontSize="30px"
            icon={<MdSkipNext />}
            color="gray.400"
            sx={{ marginInlineStart: "0 !important" }}
            _hover={{ color: "gray.100", transition: "all .3s" }}
            onClick={nextSong}
          />
          <IconButton
            outline=""
            variant="link"
            aria-label="Repeat current songs in queue"
            fontSize="20px"
            icon={<MdOutlineRepeat />}
            color={repeat ? "#1dd05d" : "gray.400"}
            sx={{ marginInlineStart: "0 !important" }}
            _hover={{ color: "gray.100", transition: "all .3s" }}
            onClick={() => setRepeat(!repeat)}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.400" mt={1}>
        <Flex justify="space-around" align="center">
          <Box flex="2">
            <Text fontSize="12px" textAlign="right">
              {formatTime(seek)[0]}
            </Text>
          </Box>
          <Box flex="8" mx={2}>
            <Center>
              <RangeSlider
                aria-label={["min", "max"]}
                id="player-range"
                step={0.1}
                min={0}
                max={duration ? parseInt(duration.toFixed(2)) : 0}
                value={[seek]}
                onChange={onSeek}
                onChangeStart={() => setIsSeeking(true)}
                onChangeEnd={() => setIsSeeking(false)}
              >
                <RangeSliderTrack bg="gray.600">
                  <RangeSliderFilledTrack bg="gray.100" />
                </RangeSliderTrack>
                <RangeSliderThumb boxSize="10px" index={0} />
              </RangeSlider>
            </Center>
          </Box>
          <Box flex="2">
            <Text fontSize="12px" textAlign="left">
              {formatTime(duration)[0]}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
