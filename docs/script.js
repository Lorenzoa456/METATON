const express = require('express');
const app = express();
const port = 3000;

require('dotenv').config();
const { Client } = require('discord.js');
const client = new Client();

app.use(express.static('public'));
app.use(express.json());

app.post('/send-command', (req, res) => {
    const { command } = req.body;
    const channel = client.channels.cache.find(channel => channel.name === 'nom-du-canal');
    
    if (channel) {
        channel.send(command);
        res.sendStatus(200);
    } else {
        res.status(404).send('Canal introuvable.');
    }
});

client.login(process.env.DISCORD_TOKEN);

app.listen(port, () => {
    console.log(`Serveur web démarré sur le port ${port}`);
});


