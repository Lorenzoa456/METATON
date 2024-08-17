import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnectionStatus } from '@discordjs/voice';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import express from 'express';

const app = express();
dotenv.config();

app.use(morgan('dev'));

//Token de notre bot
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
    const args = message.content.split(' ');
    const filename = args[1];

    const connection = voiceConnections.get(message.guild.id);
    if (!connection) {
      message.channel.send("Le bot n'est pas dans un canal vocal. Utilisez !join ou !summon pour le faire rejoindre.");
      return;
    }

    const musicFolder = "C:/Users/Lorenzo/Music/music_bot"; // Remplacez par le chemin de votre dossier
    const filePath = path.join(musicFolder, `${filename}.mp3`);

    if (!fs.existsSync(filePath)) {
      message.channel.send(`Le fichier ${filename}.mp3 n'existe pas.`);
      return;
    }

    const player = createAudioPlayer();
    const resource = createAudioResource(filePath);

    player.play(resource);
    connection.subscribe(player);
    message.channel.send(`Lecture de ${filename}.mp3`);
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
