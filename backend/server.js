import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnectionStatus, generateDependencyReport } from '@discordjs/voice';
import fs from 'fs';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import musicRouter from "./routes/musicRouter.js";
import cors from 'cors';
import bodyParser from 'body-parser';
import { getCurrentMusic } from './musicStore.js';

const app = express();
app.use(bodyParser.json({ limit: '10mb' })); // Pour accepter des objets JSON volumineux
dotenv.config();

app.use(morgan('dev'));

app.use(cors());

app.use(express.json());

app.use("/api/music", musicRouter);

const port = process.env.PORT;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

//console.log(currentMusic)
const TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.Channel],
});

client.once('ready', () => {
  console.log(`Bot connecté en tant que ${client.user.tag}`);
});

// Stockage de la connexion vocale du bot pour une gestion facile
const voiceConnections = new Map();

client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Ignorer les messages des autres bots

  // Commande !join
  if (message.content.startsWith('!join')) {
    const voiceChannel = message.member?.voice?.channel;
    if (!voiceChannel) {
      message.channel.send("Vous devez être dans un canal vocal pour utiliser cette commande.");
      return;
    }

    // Si le bot est déjà connecté à un canal, le déconnecter d'abord
    const existingConnection = voiceConnections.get(message.guild.id);
    if (existingConnection) {
      existingConnection.destroy();
    }

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    connection.on(VoiceConnectionStatus.Ready, () => {
      voiceConnections.set(message.guild.id, connection);
      message.channel.send(`Bot connecté au canal vocal '${voiceChannel.name}'.`);
    });

    connection.on(VoiceConnectionStatus.Disconnected, () => {
      voiceConnections.delete(message.guild.id);
    });
  }

  // Commande !summon
  if (message.content.startsWith('!summon')) {
    const args = message.content.split(' ');
    const channelName = args[1];

    const channel = message.guild.channels.cache.find(
      (ch) => ch.type === 'GUILD_VOICE' && ch.name === channelName
    );

    if (!channel) {
      message.channel.send(`Le canal vocal '${channelName}' n'existe pas.`);
      return;
    }

    // Si le bot est déjà connecté à un autre canal, le déconnecter d'abord
    const existingConnection = voiceConnections.get(message.guild.id);
    if (existingConnection) {
      existingConnection.destroy();
    }

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    connection.on(VoiceConnectionStatus.Ready, () => {
      voiceConnections.set(message.guild.id, connection);
      message.channel.send(`Bot connecté au canal vocal '${channelName}'.`);
    });

    connection.on(VoiceConnectionStatus.Disconnected, () => {
      voiceConnections.delete(message.guild.id);
    });
  }

  // Commande !play
  if (message.content.startsWith('!play')) {
    //const args = message.content.split(' ');
    //const filename = args[1];

    const connection = voiceConnections.get(message.guild.id);
    if (!connection) {
      message.channel.send("Le bot n'est pas dans un canal vocal. Utilisez !join ou !summon pour le faire rejoindre.");
      return;
    }

    const musicData = getCurrentMusic();
    const currentMusic = Buffer.from(musicData.musicBuffer.data.buffer);
    const filePath = "readMusic.mp3"
    
    fs.writeFile(filePath, currentMusic, (err) => {
      if (err) {
        console.error('Erreur lors de l\'écriture du fichier MP3:', err);
      } else {
        console.log('Fichier MP3 créé avec succès !');
      }
    });

    // Créer la ressource audio à partir du buffer
    const player = createAudioPlayer();
    const resource = createAudioResource(filePath)

    player.play(resource);
    connection.subscribe(player);
    message.channel.send(`Lecture de ${musicData.title} par ${musicData.author}`);
  }

  // Commande !leave
  if (message.content.startsWith('!leave')) {
    const connection = voiceConnections.get(message.guild.id);
    if (connection) {
      connection.destroy();
      voiceConnections.delete(message.guild.id);
      message.channel.send("Bot déconnecté du canal vocal.");
    } else {
      message.channel.send("Le bot n'est pas connecté à un canal vocal.");
    }
  }
});

client.login(TOKEN);
