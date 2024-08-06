import React from 'react';
import CurrentMusic from '../Components/CurrentMusic';
import MusicList from '../Components/MusicList';

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
  height: '100vh',


};

const HomePage = () => {
  return (
    <Box sx={background}>
      <Grid container spacing={3}columns={18}>
        <Grid item xs={8}>
          <CurrentMusic/>
        </Grid>
        <Grid item xs={2}>
          <div>ESPACE vide</div>
        </Grid>
        <Grid item xs={8}>
          <MusicList/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
