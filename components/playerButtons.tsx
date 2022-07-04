import {
  Flex,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import {
  MdOutlineVolumeDown,
  MdOutlineVolumeOff,
  MdFullscreen,
  MdFullscreenExit,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { useStoreActions } from "easy-peasy";

const PlayerButtons = () => {
  const [isVolumeOn, setIsVolumeOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [seek, setSeek] = useState(0.6);

  const setVolume = useStoreActions((store: any) => store.changeVolume);

  const onSeek = (e: any[]) => {
    setSeek(e[0]);
    setIsVolumeOn(e[0] ? true : false);
    setVolume(e[0]);
  };

  const onFullscreen = () => {
    if (isFullscreen) {
      setIsFullscreen(false);
      document.exitFullscreen();
    } else {
      setIsFullscreen(true);
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <Flex justify="flex-end" width="40%" float="right">
      <IconButton
        flex="2"
        outline=""
        variant="link"
        aria-label="Toggle volume on and off"
        fontSize="24px"
        icon={isVolumeOn ? <MdOutlineVolumeDown /> : <MdOutlineVolumeOff />}
        color="gray.400"
        sx={{ marginInlineStart: "0 !important" }}
        _hover={{ color: "gray.100", transition: "all .3s" }}
        onClick={() => {
          onSeek(isVolumeOn ? [0] : [0.6]);
        }}
      />
      <Box flex="8">
        <RangeSlider
          aria-label={["min", "max"]}
          id="volume-range"
          step={0.1}
          min={0}
          max={1}
          value={[seek]}
          onChange={onSeek}
        >
          <RangeSliderTrack bg="gray.600">
            <RangeSliderFilledTrack bg="gray.100" />
          </RangeSliderTrack>
          <RangeSliderThumb boxSize="10px" index={0} />
        </RangeSlider>
      </Box>
      <IconButton
        flex="2"
        outline=""
        variant="link"
        aria-label="Toggle fullscreen mode on and off"
        fontSize="24px"
        icon={isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
        color="gray.400"
        sx={{ marginInlineStart: "0 !important" }}
        _hover={{ color: "gray.100", transition: "all .3s" }}
        onClick={onFullscreen}
      />
    </Flex>
  );
};

export default PlayerButtons;
