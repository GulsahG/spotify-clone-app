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

const Player = () => {
  return (
    <Box>
      <Box>{/* <ReactHowler /> */}</Box>
      <Center>
        <ButtonGroup>
          <IconButton
            outline=""
            variant="link"
            aria-label="Shuffle queue"
            fontSize="20px"
            icon={<MdShuffle />}
            color="gray.400"
            _hover={{ color: "gray.100", transition: "all .3s" }}
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
          />
          <IconButton
            outline=""
            variant="link"
            aria-label="Play current song in queue"
            fontSize="38px"
            icon={<MdOutlinePlayCircleFilled />}
            color="gray.100"
            sx={{ marginInlineStart: "0 !important" }}
            _hover={{ transform: "scale(1.1)", transition: "all .3s ease-in" }}
          />
          <IconButton
            outline=""
            variant="link"
            aria-label="Pause current song in queue"
            fontSize="38px"
            icon={<MdOutlinePauseCircleFilled />}
            color="gray.100"
            sx={{ marginInlineStart: "0 !important" }}
            _hover={{ transform: "scale(1.1)", transition: "all .3s ease-in" }}
          />
          <IconButton
            outline=""
            variant="link"
            aria-label="Play next song in queue"
            fontSize="30px"
            icon={<MdSkipNext />}
            color="gray.400"
            sx={{ marginInlineStart: "0 !important" }}
            _hover={{ color: "gray.100", transition: "all .3s" }}
          />
          <IconButton
            outline=""
            variant="link"
            aria-label="Repeat current songs in queue"
            fontSize="20px"
            icon={<MdOutlineRepeat />}
            color="gray.400"
            sx={{ marginInlineStart: "0 !important" }}
            _hover={{ color: "gray.100", transition: "all .3s" }}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.400" mt={1}>
        <Flex justify="space-around" align="center">
          <Box flex="2">
            <Text fontSize="12px" textAlign="right">
              1:21
            </Text>
          </Box>
          <Box flex="8" mx={2}>
            <Center>
              <RangeSlider
                aria-label={["min", "max"]}
                step={0.1}
                min={0}
                max={321}
                id="player-range"
              >
                <RangeSliderTrack bg="gray.600">
                  <RangeSliderFilledTrack bg="gray.100" />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} boxSize="0px" bg="gray.800" />
              </RangeSlider>
            </Center>
          </Box>
          <Box flex="2">
            <Text fontSize="12px" textAlign="left">
              4:58
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
