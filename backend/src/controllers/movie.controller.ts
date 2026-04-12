import type {Request, Response } from 'express';
import * as movieService from '../services/movie.service.js';
import Joi from 'joi';

//Utilisation d'un validator JOI pour etre sur que les 3premier argument sont obligatoire
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

export const getAllMovies = async (_req:Request, res:Response)=>{
    try{
        const movies = await movieService.getMovies();
        res.json(movies);
    }catch (error){
        res.status(500).json({message:"Erreur lors de la récupération des films"});
    }
    
};

export const createMovie = async(req:Request, res:Response)=>{
   
        if (!req.body || Object.keys(req.body).length === 0) return;
    try{
        const { error, value } = movieSchema.validate(req.body);
        if(error){
            res.status(400).json({
                message:"arguments invalides"
            });
            return;
        }

        const movie = await movieService.createMovie(value);
        res.status(201).json(movie);
    }catch(error){
        res.status(500).json({message:"Erreur lors de la creation du film"});
    }
};

export const updateMovie = async(req:Request,res:Response)=>{
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "ID manquant" });
        return;
    }

    const idNumber = parseInt(id as string, 10);

    if(!req.body || Object.keys(req.body).length===0) return;
    try{
            const movie = await movieService.updateMovie(idNumber,req.body);
            if (!movie) {
            res.status(404).json({ message: "Film non trouvé" });
            return;
        }
        res.status(200).json(movie);

    }catch(error){
        res.status(500).json({message:"Erreur lors de la mise à jour du film"})
    }
}