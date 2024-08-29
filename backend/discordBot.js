import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnectionStatus } from '@discordjs/voice';
import fs from 'fs';
import dotenv from 'dotenv';
import { getCurrentMusic, getListMusic } from './musicStore.js';
import { io } from 'socket.io-client';

dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN;
const SOCKET_IO_SERVER_URL = `http://localhost:${process.env.PORT}`; // URL du serveur Socket.IO

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.Channel],
});

const voiceConnections = new Map();
const audioPlayers = new Map();
let idGuild = null;

client.once('ready', () => {
  console.log(`Bot connecté en tant que ${client.user.tag}`);
  
  const socket = io(SOCKET_IO_SERVER_URL);
  
  socket.on('connect', () => {
    console.log('Bot connecté au serveur Socket.IO');
  });

  socket.on('disconnect', () => {
    console.log('Déconnecté du serveur Socket.IO');
  });

  socket.on("startMusic", () => {
    handleStartMusic();
  });

  socket.on("pauseMusic", () => {
    handlePauseMusic();
  });
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('!join')) {
    const voiceChannel = message.member?.voice?.channel;
    if (!voiceChannel) {
      message.channel.send('Vous devez être dans un canal vocal pour utiliser cette commande.');
      return;
    }

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
      voiceConnections.set(message.guild.id, { connection, textChannel: message.channel });
      idGuild = message.guild.id
      message.channel.send(`Bot connecté au canal vocal '${voiceChannel.name}'.`);
    });

    connection.on(VoiceConnectionStatus.Disconnected, () => {
      voiceConnections.delete(message.guild.id);
    });
  }

  // if (message.content.startsWith('!pause')) {
  //   handlePauseMusic(message.guild.id, message.channel);
  // }

  // if (message.content.startsWith('!resume')) {
  //   handleResumeMusic(message.guild.id, message.channel);
  // }

  if (message.content.startsWith('!leave')) {
    const guildData = voiceConnections.get(message.guild.id);
    if (guildData?.connection) {
      guildData.connection.destroy();
      voiceConnections.delete(message.guild.id);
      message.channel.send('Bot déconnecté du canal vocal.');
    } else {
      message.channel.send("Le bot n'est pas connecté à un canal vocal.");
    }
  }
});

function handleStartMusic() {
  //console.log(idGuild)
  const guildData = voiceConnections.get(idGuild);
  if (!guildData?.connection) {
    console.log("Le bot n'est pas dans un canal vocal. Utilisez !join ou !summon pour le faire rejoindre.");
    return;
  }

  let player = audioPlayers.get(idGuild);
  if (player) {
    player.unpause();
    guildData.textChannel.send('Musique reprise.');
  } else {
    const musicIndex = getCurrentMusic();
    const listMusicData = getListMusic();
    const currentMusic = Buffer.from(listMusicData[musicIndex].musicFile.data.buffer);
    const filePath = 'readMusic.mp3';

    fs.writeFileSync(filePath, currentMusic);
    console.log('Fichier MP3 créé avec succès !');

    player = createAudioPlayer();
    const resource = createAudioResource(filePath);
    player.play(resource);
    guildData.connection.subscribe(player);

    audioPlayers.set(idGuild, player);
    guildData.textChannel.send(`Lecture de ${listMusicData[musicIndex].title} par ${listMusicData[musicIndex].author}`);
  }
}

function handlePauseMusic() {
  const player = audioPlayers.get(idGuild);
  const guildData = voiceConnections.get(idGuild);
  
  if (player) {
    player.pause();
    guildData.textChannel.send('Musique mise en pause.');
  } else {
    guildData.textChannel.send("Aucune musique n'est en cours de lecture.");
  }
}

function handleResumeMusic() {
  const player = audioPlayers.get(idGuild);
  const guildData = voiceConnections.get(idGuild);
  
  if (player) {
    player.unpause();
    guildData.textChannel.send('Musique reprise.');
  } else {
    guildData.textChannel.send("Aucune musique n'est en cours de lecture.");
  }
}

client.login(TOKEN);
