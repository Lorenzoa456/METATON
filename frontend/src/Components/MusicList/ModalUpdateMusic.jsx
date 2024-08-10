import React from 'react';
import { styled } from '@mui/material/styles';
import AudioFileIcon from '@mui/icons-material/AudioFile';
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
  Modal,
} from "@mui/material";

const ModalStyle = {

    backgroundColor: "#000000",
    border: '5px solid white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4,
}

const TextFieldStyle = {
    marginTop: '16px',
    "& .MuiInputLabel-root": {
      color: "#ffffff", // Changer la couleur du label ici
      fontFamily: "DeterminationSansWeb", 
      fontWeight: "bold",
      "&.Mui-focused": {
        color: "#ffffff", // Changer la couleur lorsque le champ est focusé
        fontWeight: "bold",
      },
    },
    "& .MuiOutlinedInput-root": {
      color: "#ffffff",
      fontFamily: "DeterminationSansWeb",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ffffff",
        borderWidth: "2px",
      },
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#ffffff",
          borderWidth: "3px",
        },
      },
      "& .MuiInputLabel-outlined": {
        color: "#ffffff",
        fontFamily: "DeterminationSansWeb", 
        fontWeight: "bold",
        "&.Mui-focused": {
          color: "#ffffff",
          fontWeight: "bold",
        },
      },
    },
  };

const ButtonAddMusic = {
    backgroundColor: "#000000",
    color: "#ffffff",
    marginTop: "16px", 
    fontFamily: "DeterminationSansWeb", 
    border: "1px solid #fff",
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
}

const ModalButtonStyle = { 
    marginTop: '16px', 
    border: "1px solid #fff",
    backgroundColor : "#000000",
    fontFamily: "DeterminationSansWeb", 
    color: "#ffffff",
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
}


const ModalUpdateMusic = ({ open, handleClose, name, author }) => {
  return (
    <div>
      <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box 
        sx={ModalStyle}>
        <Typography id="modal-title" variant="h6" component="h2" fontFamily="DeterminationSansWeb">
          Update Music
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2,  }} fontFamily="DeterminationSansWeb">
          Here you can update your music details.
        </Typography>
        <TextField
          fullWidth
          label="Music Title"
          variant="outlined"
          sx={TextFieldStyle}
          value={name}
          fontFamily="DeterminationSansWeb"
        />
        <TextField
          fullWidth
          label="Artist"
          variant="outlined"
          sx={TextFieldStyle}
          value={author}
          fontFamily="DeterminationSansWeb"
        />

        <Button 
        variant="contained" 
        sx={ModalButtonStyle} 
        onClick={handleClose}
        >
        Send Music
        </Button>
      </Box>
    </Modal>
    </div>
  );
};

export default ModalUpdateMusic;