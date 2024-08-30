import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
} from "@mui/material";

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Remplacez par l'URL de votre serveur si nécessaire

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

  const [buttonState, setButtonState] = useState(true);

  useEffect(() => {
    // Établir la connexion lorsque le composant est monté
    socket.on('connect', () => {
      console.log('Connected to the server');
    });
  }, []);

  

  const handleButton = async () => {
    setButtonState(!buttonState);  // Correctement mettre à jour l'état

    if (buttonState == true){
      socket.emit('startMusic');
      console.log('Start music');
    }
    else {
      socket.emit('pauseMusic');
      console.log('Pausing music');
    }
  };

  const handleButtonNext= async () => {
    socket.emit('nextMusic', 1);
    console.log('Next music');
  }

  const handleButtonPrevious = async () => {
    socket.emit('previousMusic', -1);
    console.log('Previous music');
  }


  return (
    <Box>
      <Button sx={buttonStyle} onClick={handleButtonPrevious}>
        <SkipPreviousIcon sx={{ fontSize: "2.5rem" }} />
      </Button>
      {buttonState && (
        <Button sx={buttonStyle} onClick={handleButton}>
        <PlayCircleIcon sx={{ fontSize: "2.5rem" }} />
        </Button>
      )}
    {!buttonState && (
        <Button sx={buttonStyle} onClick={handleButton}>
        <PauseCircleIcon sx={{ fontSize: "2.5rem" }} />
        </Button>
      )}
      <Button sx={buttonStyle} onClick={handleButtonNext}>
        <SkipNextIcon sx={{ fontSize: "2.5rem" }} />
      </Button>
    </Box>
  );
};

export default PlayerManager;
