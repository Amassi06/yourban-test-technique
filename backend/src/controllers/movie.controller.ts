import type { Request, Response } from 'express';
import * as movieService from '../services/movie.service.js';
import Joi from 'joi';

export const movieSchema = Joi.object({
    titre: Joi.string().min(1).required(),
    date_sortie: Joi.string().required(),
    genre: Joi.string().optional(),
    recettes_totales: Joi.number().min(0).optional(),
    nombre_entrees: Joi.number().integer().min(0).optional(),
    pays_origine: Joi.string().optional(),
    distributeur: Joi.string().optional(),
    duree_minutes: Joi.number().integer().positive().optional(),
    note_presse: Joi.number().min(0).max(10).optional()
});

//utile car cela evite de mettre les champs obligatoire (titre,date_sortie) uniquement pour une simple modification de genre uniquement
// en sachant que id existe deja
export const updateMovieSchema = movieSchema.fork(['titre', 'date_sortie'], (schema) => schema.optional());

// READ
export const getAllMovies = async (_req: Request, res: Response): Promise<void> => {
    try {
        const movies = await movieService.getMovies();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des films" });
    }
};

// CREATE
export const createMovie = async (req: Request, res: Response): Promise<void> => {
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({ message: "Le corps de la requête est vide." });
        return;
    }

    try {
        const { error, value } = movieSchema.validate(req.body);
        
        if (error) {
            res.status(400).json({ message: "Données invalides", details: error.details });
            return;
        }

        const movie = await movieService.createMovie(value);
        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création du film" });
    }
};

// UPDATE
export const updateMovie = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    
    if (!id) {
        res.status(400).json({ message: "ID manquant dans l'URL" });
        return;
    }

    const idNumber = parseInt(id as string, 10);

    if (isNaN(idNumber)) {
        res.status(400).json({ message: "L'ID fourni n'est pas un nombre valide." });
        return;
    }

    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({ message: "Aucune donnée fournie pour la mise à jour." });
        return;
    }

    try {
        const { error, value } = updateMovieSchema.validate(req.body);

        if (error) {
            res.status(400).json({ message: "Données de mise à jour invalides", details: error.details });
            return;
        }

        const movie = await movieService.updateMovie(idNumber, value);
        
        if (!movie) {
            res.status(404).json({ message: "Film non trouvé" });
            return;
        }
        res.status(200).json(movie);

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du film" });
    }
};

// DELETE
export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ message: "ID du film manquant dans l'URL." });
        return;
    }
    
    const idNumber = parseInt(id as string, 10);
    console.log("§§§§§§§§",idNumber);
    
    if (isNaN(idNumber)) {
        res.status(400).json({ message: "L'ID fourni n'est pas valide. Un nombre est attendu." });
        return;
    }

    try {
        const isDeleted = await movieService.deleteMovie(idNumber);

        if (!isDeleted) {
            res.status(404).json({ message: "Film non trouvé ou déjà supprimé." });
            return;
        }

        res.status(200).json({ message: "Film supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur lors de la suppression du film." });
    }
};