import { Router } from 'express';
import { getAllMusic, createMusic, updateMusic, deleteMusic, getMusicById, sendMusicId} from '../controllers/musicController.js';
import multer from 'multer';

const router = Router();
const upload = multer(); // Configure multer pour gérer le fichier dans req.file

router.route('/')
    .get(getAllMusic)
    .post(upload.single('musicFile'), createMusic); // Route pour ajouter une nouvelle musique

router.route('/:id')
    .get(getMusicById) // Obtenir une musique par ID
    .put(upload.single('musicFile'), updateMusic) // Mettre à jour une musique
    .delete(deleteMusic)
    .post(sendMusicId)

export default router;
