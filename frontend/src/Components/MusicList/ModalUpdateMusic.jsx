import React, { useState, useEffect } from 'react';
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

const ModalUpdateMusic = ({ open, handleClose, musicData, onMusicUpdated }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  
  const isUpdate = Boolean(musicData && musicData._id);

  useEffect(() => {
    if (isUpdate) {
      setTitle(musicData.title || '');
      setAuthor(musicData.author || '');
    }
  }, [isUpdate, musicData]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile?.name || '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !author) {
      console.error('Le titre et l\'auteur sont requis.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    if (file) {
      formData.append('musicFile', file);
    }

    console.log(musicData)

    try {
      const response = isUpdate
        ? await fetch(`http://localhost:3000/api/music/${musicData._id}`, {
            method: 'PUT',  // Utilisation de PUT pour la mise à jour
            body: formData,
          })
        : await fetch('http://localhost:3000/api/music', {
            method: 'POST',  // Utilisation de POST pour l'ajout
            body: formData,
          });

      if (!response.ok) {
        throw new Error(`Erreur lors de ${isUpdate ? 'la mise à jour' : 'l\'ajout'} de la musique`);
      }

      // Réinitialisation et fermeture du modal après réussite
      setTitle('');
      setAuthor('');
      setFile(null);
      setFileName('');
      handleClose();

      if (onMusicUpdated) {
        onMusicUpdated(); // Callback pour rafraîchir la liste des musiques
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
          {isUpdate ? 'Update Music' : 'Add New Music'}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }} fontFamily="DeterminationSansWeb">
          {isUpdate ? 'Update your music details.' : 'Add your new music details.'}
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
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
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
          {fileName && (
            <Typography variant="body2" color="#ffffff" sx={{ marginTop: '8px', fontFamily: "DeterminationSansWeb" }}>
              {fileName}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            sx={ModalButtonStyle}
            onClick={handleSubmit}
          >
            {isUpdate ? 'Update Music' : 'Send Music'}
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

export default ModalUpdateMusic;
