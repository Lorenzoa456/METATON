import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import musicRouter from './routes/musicRouter.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Server } from "socket.io";
import http from 'http';
dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/api/music', musicRouter);

const port = process.env.PORT;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// wait for new connection
io.on("connection", (socket) => {
  console.log("New client is connected");

  // Quand le client envoie une commande pour mettre en pause la musique
  socket.on("startMusic", () => {
    console.log("Received startMusic command");
    io.emit("startMusic");  // Émettre cet événement à tous les clients
  }); 

  socket.on("changeMusic", () => {
    console.log("choose Music command");
    io.emit("changeMusic");  // Émettre cet événement à tous les clients
  });

  // Quand le client envoie une commande pour mettre en pause la musique
  socket.on("pauseMusic", () => {
    console.log("Received pauseMusic command");
    io.emit("pauseMusic");  // Émettre cet événement à tous les clients
  });

  socket.on("nextMusic", (add) => {
    console.log("Next Music command");
    io.emit("nextMusic", add);  // Émettre cet événement à tous les clients
  });

  socket.on("previousMusic", (add) => {
    console.log("Previous Music command");
    io.emit("previousMusic", add);  // Émettre cet événement à tous les clients
  });
  socket.on("currentMusicInfo", (musicInfo) => {
    console.log("Update current music info in webUI" + musicInfo.title + " " + musicInfo.author);
    io.emit("currentMusicInfo", musicInfo);  // Émettre cet événement à tous les clients
  });
  socket.on("currentIndex", (currentIndex) => {
    console.log("current index : ",currentIndex)
    io.emit("currentIndex", currentIndex);  // Émettre cet événement à tous les clients
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  
});

try {
  await mongoose.connect(process.env.MONGO_URL);
  server.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
