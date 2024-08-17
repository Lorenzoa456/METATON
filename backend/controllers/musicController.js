import mongoose from 'mongoose';
import Music from "../schemas/musiqueModel.js"

export const getAllMusic = async (req, res) => {
    try {
        const musics = await Music.find(); // Récupère toutes les musiques de la base de données
        res.status(200).json(musics); // Retourne les musiques au client avec un statut 200 (OK)
      } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des musiques", error: error.message });
      }
}

export const createMusic = async (req, res) => {
    try {
      const { title, author } = req.body;
      const musicFile = req.file; // Obtenez le fichier de musique
  
      if (!title || !author || !musicFile) {
        return res.status(400).json({ message: 'Titre, auteur et fichier de musique sont requis' });
      }
  
      // Créer une nouvelle instance du modèle Music
      const newMusic = new Music({
        title,
        author,
        musicFile: {
          data: musicFile.buffer,
          contentType: musicFile.mimetype
        }
      });
  
      // Enregistrer la musique dans la base de données
      await newMusic.save();
  
      res.status(201).json({ message: 'Musique enregistrée avec succès', music: newMusic });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l\'enregistrement de la musique', error: error.message });
    }
  };

  export const updateMusic = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, author } = req.body;
      const musicFile = req.file;
  
      // Rechercher la musique par ID
      const music = await Music.findById(id);
  
      if (!music) {
        return res.status(404).json({ message: 'Musique non trouvée' });
      }
  
      // Mettre à jour les champs si présents dans la requête
      if (title) music.title = title;
      if (author) music.author = author;
  
      // Mettre à jour le fichier de musique si un nouveau fichier est uploadé
      if (musicFile) {
        music.musicFile.data = musicFile.buffer;
        music.musicFile.contentType = musicFile.mimetype;
      }
  
      // Sauvegarder les modifications
      await music.save();
  
      res.status(200).json({ message: 'Musique mise à jour avec succès', music });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour de la musique', error: error.message });
    }
  };

  export const deleteMusic = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Rechercher et supprimer la musique par ID
      const music = await Music.findByIdAndDelete(id);
  
      if (!music) {
        return res.status(404).json({ message: 'Musique non trouvée' });
      }
  
      res.status(200).json({ message: 'Musique supprimée avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression de la musique', error: error.message });
    }
  };

export const getMusicById = async (req, res) => {
  try {
    const { id } = req.params;

    // Rechercher la musique par ID
    const music = await Music.findById(id);

    if (!music) {
      return res.status(404).json({ message: 'Musique non trouvée' });
    }

    res.status(200).json(music);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la musique', error: error.message });
  }
};
