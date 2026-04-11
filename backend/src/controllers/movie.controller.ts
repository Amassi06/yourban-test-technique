import type {Request, Response } from 'express';
import * as movieService from '../services/movie.service.js';

export const getAllMovies = async (req:Request,res:Response)=>{
    try{
        const movies = await movieService.getMovies();
        res.json(movies);
    }catch (error){
        res.status(500).json({message:"Erreur lors de la récupération des films"});
    }
    
};