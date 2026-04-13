// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import { getMovies } from '../services/api';
import type { Movie } from '../types/Movie';

export const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getMovies()
      .then(data => {
        setMovies(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Chargement des données...</div>;
  if (error) return <div style={{ color: 'red' }}>Échec : {error}</div>;

  return (
    <div>
      <h1>Test Yourban - Dashboard</h1>
      <p>Total de films récupérés : {movies.length}</p>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <strong>{movie.titre}</strong> - {movie.genre} ({movie.recettes_totales}$)
          </li>
        ))}
      </ul>
    </div>
  );
};