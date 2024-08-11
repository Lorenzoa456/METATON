import React, { useState } from 'react';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import {
  Box,
  Typography,
  TextField,
  Button,
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
};

const TextFieldStyle = {
  marginTop: '16px',
  "& .MuiInputLabel-root": {
    color: "#ffffff",
    fontFamily: "DeterminationSansWeb",
    fontWeight: "bold",
    "&.Mui-focused": {
      color: "#ffffff",
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
    backgroundColor: "#ffffff",
    color: "#000000",
    '&:hover': {
      backgroundColor: "#ffffff",
      color: "#000000",
    }
  },
  '&:hover': {
    backgroundColor: "#ffffff",
    color: "#000000",
  }
};

const ModalButtonStyle = {
  marginTop: '16px',
  border: "1px solid #fff",
  backgroundColor: "#000000",
  fontFamily: "DeterminationSansWeb",
  color: "#ffffff",
  '&.Mui-selected': {
    backgroundColor: "#ffffff",
    color: "#000000",
    '&:hover': {
      backgroundColor: "#ffffff",
      color: "#000000",
    }
  },
  '&:hover': {
    backgroundColor: "#ffffff",
    color: "#000000",
  }
};

const ModalAddMusic = ({ open, handleClose, onMusicAdded }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !author || !file) {
      console.error('Tous les champs sont requis, y compris le fichier de musique.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('musicFile', file);

    try {
      const response = await fetch('http://localhost:3000/api/music', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de la musique');
      }

      // Réinitialiser le formulaire
      setTitle('');
      setAuthor('');
      setFile(null);

      // Fermer le modal
      handleClose();

      // Appeler le callback pour rafraîchir la liste des musiques
      if (onMusicAdded) {
        onMusicAdded();
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={ModalStyle}>
        <Typography id="modal-title" variant="h6" component="h2" fontFamily="DeterminationSansWeb">
          Add New Music
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }} fontFamily="DeterminationSansWeb">
          Here you can add your new music details.
        </Typography>
        <TextField
          fullWidth
          label="Music Title"
          variant="outlined"
          sx={TextFieldStyle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          label="Artist"
          variant="outlined"
          sx={TextFieldStyle}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<AudioFileIcon />}
          sx={ButtonAddMusic}
        >
          Upload file
          <input
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            sx={ModalButtonStyle}
            onClick={handleSubmit}
          >
            Send Music
          </Button>
          <Button
            variant="contained"
            sx={ModalButtonStyle}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAddMusic;