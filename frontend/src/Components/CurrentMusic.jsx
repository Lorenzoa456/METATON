import React from 'react';
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const background = {
  backgroundColor: "#de1523",
};


const currentMusicStyle = {
  display: "flex", 
  flexDirection: "column",
  justifyContent: "center", 
  alignItems: 'center'
}

const CurrentMusic = ({ name, author }) => {
  return (
    <Container sx={background}>
      <Box sx={currentMusicStyle}>
        {name && author && (
          <>
            <Typography variant="h4">Current Music</Typography>
            <Typography variant="h5">{name}</Typography>
            <Typography variant="h6">by {author}</Typography>
          </>
        )}
        {!name && !author && (
          <>
            <Typography variant="h6">Select your music</Typography>
          </>
        )}

      </Box>
    </Container>
  );
};

export default CurrentMusic;
