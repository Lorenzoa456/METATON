import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  List,
  ListItemButton,
  Snackbar,
  Alert
} from "@mui/material";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import AddMusic from './AddMusic';
import UpdateMusic from "./UpdateMusic";

const background = {
  paddingTop: "1rem",
  paddingBottom: "1rem",
  border: '5px solid white',
  height: "30rem",
  width: "30rem",
};

const TitleStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "16px",
  fontFamily: "DeterminationSansWeb",
  fontSize: "30px"
};

const ListItemStyle = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #000",
  padding: "8px",
  marginBottom: "8px",
  borderRadius: "4px",
  position: 'relative',
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

const MusicTextStyle = {
  marginBottom: "-4px",
  fontFamily: "DeterminationSansWeb"
};

const AuthorTextStyle = {
  fontFamily: "DeterminationSansWeb"
};

const MusicList = ({ onMusicSelect }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [musics, setMusics] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleListItemClick = async (event, index, title, author, id) => {
    setSelectedIndex(index);
    onMusicSelect(title, author);

    // Send the ID to the server
    await sendMusicIdToServer(id);
  };

  const sendMusicIdToServer = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:3000/api/music/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('ID sent successfully:', result);
      } else {
        console.error('Error sending ID:', response.statusText);
        setSnackbarMessage('Erreur lors de l’envoi de l’ID de la musique');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error sending ID:', error);
      setSnackbarMessage('Erreur lors de l’envoi de l’ID de la musique');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const fetchMusics = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/music');
      const data = await response.json();
      setMusics(data);
    } catch (error) {
      console.error("Error fetching music data:", error);
      setSnackbarMessage('Erreur lors de la récupération des musiques');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchMusics();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleMusicUpdate = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
    fetchMusics();
  };

  return (
    <Container sx={background}>
      <Typography sx={TitleStyle}>MusicList</Typography>
      <Box sx={{ maxHeight: '325px', overflowY: 'auto', }}>
        <List>
          {musics.map((music, index) => (
            <Box key={music.id} sx={{ display: "flex" }}>
              <ListItemButton
                sx={ListItemStyle}
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index, music.title, music.author, music._id)}
              >
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                  <AudiotrackIcon sx={{ fontSize: "2.5rem", marginRight: "0.5rem" }} />
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1 }}>
                    <Typography sx={{ fontFamily: "DeterminationSansWeb", marginBottom: "-4px", fontSize: "1.5rem" }}>
                      {music.title}
                    </Typography>
                    <Typography sx={{ fontFamily: "DeterminationSansWeb", fontSize: "1.2rem" }}>
                      {music.author}
                    </Typography>
                  </Box>
                </Box>
              </ListItemButton>
              <UpdateMusic
                musicData={music}
                onMusicUpdated={handleMusicUpdate}
              />
            </Box>
          ))}
        </List>
      </Box>
      <hr
        style={{
          margin: 0,
          color: "#ffffff",
          backgroundColor: "#ffffff",
          height: 5,
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
        }}
      />
      <AddMusic onMusicAdded={handleMusicUpdate} />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MusicList;
