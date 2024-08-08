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
    border: "1px solid #000",
    padding: "8px",
    width: "200px",
    marginBottom: "8px",
    borderRadius: "4px",
    backgroundColor: "#f5a609",
    position: 'relative',
    '&.Mui-selected': {
      backgroundColor: "#ff7b00", // Change the background color when selected
      '&:hover': {
        backgroundColor: "#fe9838", // Change the background color on hover
      }
    },
    '&:hover': {
      backgroundColor: "#f7bc5d", // Change the background color on hover
    }
  };

const AddMusic = () => {
  return (
    <>
    <ListItemButton sx={ListbButtonStyle}>
        <Typography sx={{}}>
            Add Music
        </Typography>
    </ListItemButton>
    </>
  );
};

export default AddMusic;
