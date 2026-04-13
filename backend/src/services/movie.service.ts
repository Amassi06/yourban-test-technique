import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';
import type {Movie} from '../types/Movie.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname,'../../../data/box-office-200.json');

// CRUD API

// READ
export const getMovies = async():Promise<Movie[]>=>{
    const data = await fs.readFile(DATA_PATH,'utf-8');
    return JSON.parse(data);     
}

//CREATE
export const createMovie = async(movieData:Movie):Promise<Movie>=>{
    const movies = await getMovies();

    const maxId = movies.length >0?Math.max(...movies.map(m=>m.id)):0;
    const nextId = maxId+1;
    const newMovie:Movie = {
        ...movieData,
        id:nextId
    };

    movies.push(newMovie);
    await fs.writeFile(DATA_PATH,JSON.stringify(movies,null,2),'utf-8');
    return newMovie;
}

//UPDATE
export const updateMovie = async (id: number, updateData: Partial<Movie>): Promise<Movie | null> => {
    const movies = await getMovies();
    const index = movies.findIndex(m => m.id === id);

    if (index === -1) return null;
    
    const updatedMovie: Movie = {
        ...movies[index],
        ...updateData,
        id: id 
    }as Movie;

    movies[index] = updatedMovie;
    await fs.writeFile(DATA_PATH, JSON.stringify(movies, null, 2), 'utf-8');

    return updatedMovie;
};

// DELETE
export const deleteMovie = async (id: number): Promise<boolean> => {
    const movies = await getMovies();
    
    const movieExists = movies.some(m => m.id === id);
    if (!movieExists) return false;

    const updatedMovies = movies.filter(m => m.id !== id);
    
    await fs.writeFile(DATA_PATH, JSON.stringify(updatedMovies, null, 2), 'utf-8');
    
    return true;
};
//getMovieById
export const getMovieById = async (id: number): Promise<Movie | undefined> => {
  const fileData = await fs.readFile(DATA_PATH, 'utf-8');
  const movies: Movie[] = JSON.parse(fileData);
  
  return movies.find(movie => movie.id === id);
};