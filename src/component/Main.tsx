//@ts-nocheck
import React from "react";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
  Slider,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton
} from "@material-ui/core/";

import {
  SkipPreviousIcon,
  PlayArrowIcon,
  PauseIcon,
  SkipNextIcon
} from "@material-ui/icons";
import image from "../images/m1.jpg";
import mp3 from "../images/Music.mp3";
import SongList from "./SongList";
import VolumeSlider from "./VolumeSlider";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column-reverse",
      background: "lightgray",
      width: "300px",
      margin: 30,
      boxShadow: "0px 0px 4px 2px gray"
    },
    details: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center"
    },
    content: {
      flex: "1 0 auto",
      justifyContent: "space-between"
    },
    cover: {
      width: "300px",
      height: "200px"
    },
    controls: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    playIcon: {
      height: 38,
      width: 38
    },
    slider: {
      width: "70%"
    }
  })
);

export default function Main() {
  const classes = useStyles();
  const theme = useTheme();
  const [path, setpath] = React.useState("");
  const audioVar = new Audio(path === "" ? mp3 : path);
  const [musicState, setMusicState] = React.useState(true);
  const [audio, setaudio] = React.useState(audioVar);
  const [duration, setduration] = React.useState(0);
  const [volume, setVolume] = React.useState(audio.volume);

  var minutes = Math.floor(duration / 60);
  var seconds = duration - minutes * 60;
  function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }

  function secondsToTime(e) {
    var h = Math.floor(e / 3600)
        .toString()
        .padStart(2, "0"),
      m = Math.floor((e % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      s = Math.floor(e % 60)
        .toString()
        .padStart(2, "0");

    return m + ":" + s;
  }

  var finalTime =
    str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);
  const PlayMusic = () => {
    if (musicState) {
      audio.play();
      console.log(duration, "$$$");
      setMusicState(false);
    } else {
      audio.pause();
      setMusicState(true);
    }
  };

  const updateVolume = (event: any, newValue: number | number[]) => {
    setVolume(newValue);
    audio.volume = newValue;
  };

  React.useEffect(() => {
    const timefun = setTimeout(() => {
      if (musicState === false) setduration(duration + 1);
    }, 1000);
    if (duration >= audio.duration) {
      clearTimeout(timefun);
    }

    return () => {
      clearTimeout(timefun);
    };
  });
  console.log(path);
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Mac Miller
          </Typography>
        </CardContent>
        <audio id="myAudio">
          <source src="./images/Music.mp3"></source>
          <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source>
        </audio>
        <div className={classes.controls}>
          <VolumeSlider onChange={updateVolume} value={volume} />
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          {musicState ? (
            <IconButton
              aria-label="play"
              onClick={() => {
                PlayMusic();
              }}
            >
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
          ) : (
            <IconButton
              aria-label="pause"
              onClick={() => {
                PlayMusic();
              }}
            >
              <PauseIcon className={classes.playIcon} />
            </IconButton>
          )}
          <IconButton aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
          <SongList path={(value) => setpath(value)} />
        </div>
        <Box
          variant="div"
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <Typography variant="caption" color="textSecondary">
            {finalTime}
          </Typography>
          <Slider
            value={duration}
            max={audio.duration}
            className={classes.slider}
          />
          <Typography variant="caption" color="textSecondary">
            {secondsToTime(Math.floor(audio.duration))}
          </Typography>
        </Box>
      </div>
      <CardMedia
        className={classes.cover}
        image={image}
        title="Live from space album cover"
      />
    </Card>
  );
}
