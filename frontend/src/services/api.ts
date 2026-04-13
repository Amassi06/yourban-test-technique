import type { Movie } from '../types/Movie';

const API_URL = 'http://localhost:3001/api'; 


export const getMovies = async (): Promise<Movie[]> => {
  const response = await fetch(`${API_URL}/movies`);
  if (!response.ok) throw new Error(`Erreur réseau : ${response.status}`);
  return response.json();
};

export const getMovieById = async (id: string | number): Promise<Movie> => {
  const response = await fetch(`${API_URL}/movies/${id}`);
  if (!response.ok) {
    if (response.status === 404) throw new Error("Film introuvable");
    throw new Error(`Erreur réseau : ${response.status}`);
  }
  return response.json();
};


export const createMovie = async (movieData: Omit<Movie, 'id'>): Promise<Movie> => {
  const response = await fetch(`${API_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieData),
  });
  
  if (!response.ok) throw new Error(`Erreur lors de la création : ${response.status}`);
  return response.json();
};


export const updateMovie = async (id: string | number, movieData: Partial<Movie>): Promise<Movie> => {
  const response = await fetch(`${API_URL}/movies/${id}`, {

    method: 'PATCH', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieData),
  });

  if (!response.ok) throw new Error(`Erreur lors de la mise à jour : ${response.status}`);
  return response.json();
};


export const deleteMovie = async (id: string | number): Promise<void> => {
  const response = await fetch(`${API_URL}/movies/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error(`Erreur lors de la suppression : ${response.status}`);
};