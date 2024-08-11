import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import Music from './schemas/musiqueModel.js';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(morgan('dev'));

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  console.log("Connected to the database!");

  // Chemin des fichiers de musique
  const musicFiles = [
    {
      title: "Nexus",
      author: "Sawano Hiroyuki",
      filePath: "./dumbMusic/Hiroyuki Sawano feat. Laco - NEXUS.mp3"
    },
    {
      title: "Ashura-chan",
      author: "ADO",
      filePath: "./dumbMusic/Ashura-chan.mp3"
    },
    {
        title: "Dramaturgy",
        author: "E ve",
        filePath: "./dumbMusic/Dramaturgy (Eve-mv).mp3"
      }
    // Ajoutez plus de chansons ici
  ];

  // Fonction pour ajouter chaque musique
  const addMusic = async (music) => {
    const { title, author, filePath } = music;

    // Lire le fichier de musique
    const musicData = fs.readFileSync(path.resolve(filePath));

    const newMusic = new Music({
      title,
      author,
      musicFile: {
        data: musicData,
        contentType: 'audio/mp3' // Assurez-vous que le type MIME est correct
      }
    });

    await newMusic.save();
    console.log(`${title} by ${author} has been added to the database!`);
  };

  // Ajouter toutes les musiques
  for (let i = 0; i < musicFiles.length; i++) {
    await addMusic(musicFiles[i]);
  }

  console.log("All music files have been added to the database!");
  mongoose.connection.close();
});
