import React, { useEffect } from 'react';
import PlayerManager from './PlayerManager';
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  withTheme,
} from "@mui/material";

const CurrentMusic = ({ title, author }) => {

  const background = {
    border: '5px solid white',
    backgroundColor: "#ffffff",
    height: title && author ? "13rem" : "8rem", // Ajuste la hauteur selon les données
    width: "23rem",
    borderRadius: "20px",
  
  
  };
  
  
  const currentMusicStyle = {
    display: "flex", 
    flexDirection: "column",
    justifyContent: "center", 
    alignItems: 'center',
    color: "#000000",
    backgroundColor: "#ffffff"
  }

  return (
    <Container sx={background}>
      <Box sx={currentMusicStyle}>
        {title && author && (
          <>
            <Typography variant="h4" sx={{fontFamily: "DeterminationSansWeb"}}>Current Music</Typography>
            <Typography variant="h5" sx={{fontFamily: "DeterminationSansWeb"}}>{title}</Typography>
            <Typography variant="h6" sx={{fontFamily: "DeterminationSansWeb"}}>by {author}</Typography>
            <PlayerManager/>
          </>
        )}
        {!title && !author && (
          <>
            <Typography variant="h4" sx={{fontFamily: "DeterminationSansWeb"}}>Select your music</Typography>
          </>
        )}
      </Box>
    </Container>
  );
};

export default CurrentMusic;
