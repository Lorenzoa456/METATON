import React, { useState } from 'react';
import {
  Box,
  Button,
} from "@mui/material";

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const buttonStyle = {
  marginLeft: "0.5rem",
  marginRight: "0.5rem",
  color: "#000000",
  '&.Mui-selected': {
    backgroundColor: "#000000",
    color: "#ffffff",
    '&:hover': {
      backgroundColor: "#000000",
      color: "#ffffff",
    }
  },
  '&:hover': {
    backgroundColor: "#000000",
    color: "#ffffff",
  }
};

const PlayerManager = () => {
  const [buttonState, setButtonState] = useState(false);

  const handleButton = () => {
    setButtonState(!buttonState);  // Correctement mettre à jour l'état
  };

  return (
    <Box>
      <Button sx={buttonStyle}>
        <SkipPreviousIcon sx={{ fontSize: "2.5rem" }} />
      </Button>
      {!buttonState && (
        <Button sx={buttonStyle} onClick={handleButton}>
        <PlayCircleIcon sx={{ fontSize: "2.5rem" }} />
        </Button>
      )}
    {buttonState && (
        <Button sx={buttonStyle} onClick={handleButton}>
        <PauseCircleIcon sx={{ fontSize: "2.5rem" }} />
        </Button>
      )}
      <Button sx={buttonStyle}>
        <SkipNextIcon sx={{ fontSize: "2.5rem" }} />
      </Button>
    </Box>
  );
};

export default PlayerManager;
