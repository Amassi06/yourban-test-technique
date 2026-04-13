// src/services/api.ts
import type { Movie } from '../types/Movie';

const API_URL = 'http://localhost:3000/api'; 

export const getMovies = async (): Promise<Movie[]> => {
  const response = await fetch(`${API_URL}/movies`);
  if (!response.ok) {
    throw new Error(`Erreur réseau : ${response.status}`);
  }
  return response.json();
};