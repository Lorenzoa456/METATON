import React, { useState } from 'react';
import CurrentMusic from '../Components/CurrentMusic';
import MusicList from '../Components/MusicList/MusicList';

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
  backgroundColor: "#176B87",
  paddingLeft: "2rem",
  paddingRight: "2rem",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center", 

};

const HomePage = () => {

  const [currentMusic, setCurrentMusic] = useState({ name: '', author: '' });

  const handleMusicSelect = (name, author) => {
    setCurrentMusic({ name, author });
  };

  return (
    <Box sx={background}>
      <Grid container spacing={3}columns={18} sx={{  display: "flex", justifyContent: "center", alignItems: 'center'}}>
        <Grid item xs={8}>
          <CurrentMusic name={currentMusic.name} author={currentMusic.author}/>
        </Grid>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={8}>
          <MusicList onMusicSelect={handleMusicSelect}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
