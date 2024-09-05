import React, { useEffect, useState } from 'react';
import PlayerManager from './PlayerManager';
import {
  Container,
  Box,
  Typography,
} from "@mui/material";
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Remplacez par l'URL de votre serveur si nécessaire

const CurrentMusic = ({ title, author }) => {
  // Initialisation de l'état en utilisant les props
  const [musicInfo, setMusicInfo] = useState({ musicTitle: title, musicAuthor: author });

  const background = {
    border: '5px solid white',
    backgroundColor: "#ffffff",
    height: musicInfo.musicTitle && musicInfo.musicAuthor ? "13rem" : "8rem", // Ajuste la hauteur selon les données
    width: "23rem",
    borderRadius: "20px",
  };

  const currentMusicStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center',
    color: "#000000",
    backgroundColor: "#ffffff",
  };

  useEffect(() => {
    // Met à jour l'état `musicInfo` lorsqu'il y a des changements dans les props `title` et `author`
    setMusicInfo({ musicTitle: title, musicAuthor: author });
  }, [title, author]); // Se réexécute lorsque `title` ou `author` changent

  useEffect(() => {
    // Établir la connexion lorsque le composant est monté
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    // Écoute les informations de la musique actuelle envoyées par le serveur
    socket.on('currentMusicInfo', (newMusicInfo) => {
      setMusicInfo({
        musicTitle: newMusicInfo.title,
        musicAuthor: newMusicInfo.author,
      });
      console.log(newMusicInfo);
    });

    // Nettoyage lors de la fermeture du composant
    return () => {
      socket.off('connect');
      socket.off('currentMusicInfo');
    };
  }, []);

  return (
    <Container sx={background}>
      <Box sx={currentMusicStyle}>
        {musicInfo.musicTitle && musicInfo.musicAuthor ? (
          <>
            <Typography variant="h4" sx={{ fontFamily: "DeterminationSansWeb" }}>Current Music</Typography>
            <Typography variant="h5" sx={{ fontFamily: "DeterminationSansWeb" }}>{musicInfo.musicTitle}</Typography>
            <Typography variant="h6" sx={{ fontFamily: "DeterminationSansWeb" }}>by {musicInfo.musicAuthor}</Typography>
            <PlayerManager />
          </>
        ) : (
          <>
            <Typography variant="h4" sx={{ fontFamily: "DeterminationSansWeb" }}>Select your music</Typography>
          </>
        )}
      </Box>
    </Container>
  );
};

export default CurrentMusic;
