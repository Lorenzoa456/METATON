const express = require('express');
const app = express();

// Middleware pour servir les fichiers statiques
app.use(express.static('public'));

// Point de terminaison pour votre page HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/music_site.html');
});

// Port d'écoute du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
