import React, { useState } from 'react';
import CurrentMusic from '../Components/CurrentMusic/CurrentMusic';
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
  backgroundColor: "f000000",
  fontFamily: "8bitoperator-jve",
  paddingLeft: "1rem", // Réduction de la padding
  paddingRight: "1rem", // Réduction de la padding
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const HomePage = () => {

  const [currentMusic, setCurrentMusic] = useState({ title: '', author: ''});

  const handleMusicSelect = (title, author) => {
    setCurrentMusic({ title, author});

  };

  return (
    <>   
    <Box sx={background}>
      <Grid container spacing={2} columns={18} sx={{ display: "flex", justifyContent: "center", alignItems: 'center'}}>
        <Grid item xs={18} sx={{ textAlign: "center" }}>
          <Typography sx={{ fontFamily: "DeterminationSansWeb", fontSize: "7rem" }}>Mettaton BOT</Typography>
        </Grid>
        <Grid item xs={4}>
          <CurrentMusic title={currentMusic.title} author={currentMusic.author}/>
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "center", alignItems: 'center', marginTop: "4rem" }}>
          <img src='/undertale-mettaton.gif' style={{ maxWidth: "100%", height: "auto" }}></img>
        </Grid>
        <Grid item xs={10}>
          <MusicList onMusicSelect={handleMusicSelect} />
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default HomePage;
