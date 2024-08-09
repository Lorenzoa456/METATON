import React from 'react';
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  ListItemButton,
  Grid,
} from "@mui/material";

const ListbButtonStyle = {
    display: "flex", 
    flexDirection: "column",
    justifyContent: "center", 
    alignItems: 'center',
    border: "1px solid #fff",
    padding: "8px",
    width: "200px",
    marginBottom: "8px",
    borderRadius: "4px",
    position: 'relative',
    '&.Mui-selected': {
      backgroundColor: "#ffffff", // Change the background color when selected
      color: "#000000",
      '&:hover': {
        backgroundColor: "#ffffff", // Change the background color on hover
        color: "#000000",
      }
    },
    '&:hover': {
      backgroundColor: "#ffffff", // Change the background color on hover
      color: "#000000",
    }
  };

const AddMusic = () => {
  return (
    <>
    <ListItemButton sx={ListbButtonStyle}>
        <Typography sx={{fontFamily: "DeterminationSansWeb", fontSize: "15px"}}>
            Add Music
        </Typography>
    </ListItemButton>
    </>
  );
};

export default AddMusic;
