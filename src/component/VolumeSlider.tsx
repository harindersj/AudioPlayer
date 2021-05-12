import React, { ChangeEvent } from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { IconButton, Slider } from "@material-ui/core";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";

interface IVolume {
  onChange: () => void;
  value: number;
}
export default function VolumeSlider(props: IVolume) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton onClick={handleClick}>
        <VolumeUpIcon />
      </IconButton>

      <Popover
        id={id}
        style={{ width: "30%" }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <div style={{ width: "200px", padding: "5px 10px" }}>
          <Slider
            value={props.value}
            step={0.1}
            max={1}
            onChange={props.onChange}
            style={{ width: "110px" }}
          />
        </div>
      </Popover>
    </div>
  );
}
