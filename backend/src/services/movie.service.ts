import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';
import {Movie} from '../types/movie.js';

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

