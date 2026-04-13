// src/pages/Home.tsx
import { useEffect, useState, useMemo } from 'react';
import { getMovies } from '../services/api';
import type { Movie } from '../types/Movie';
import { MovieCard } from '../components/MovieCard';

export const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recettes' | 'date' | ''>('');

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

  const genres = useMemo(() => {
    const allGenres = movies.map(m => m.genre);
    return Array.from(new Set(allGenres)); 
  }, [movies]);

  const processedMovies = useMemo(() => {
    let result = [...movies];
    
    // Filtrage
    if (selectedGenre) {
      result = result.filter(m => m.genre === selectedGenre);
    }
    
    // Tri
    if (sortBy === 'recettes') {
      result.sort((a, b) => b.recettes_totales - a.recettes_totales);
    } else if (sortBy === 'date') {
      result.sort((a, b) => new Date(b.date_sortie).getTime() - new Date(a.date_sortie).getTime());
    }
    return result;
  }, [movies, selectedGenre, sortBy]);

  const totalRevenue = useMemo(() => {
    return processedMovies.reduce((sum, movie) => sum + movie.recettes_totales, 0);
  }, [processedMovies]);

  if (isLoading) return <div className="flex justify-center items-center h-screen text-xl font-semibold">Chargement des films...</div>;
  if (error) return <div className="p-4 bg-red-100 text-red-700 rounded-md m-5">Échec de la connexion : {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">Dashboard Yourban</h1>
      
      {/* HEADER KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Films affichés</span>
          <span className="text-4xl font-bold text-indigo-600 mt-2">{processedMovies.length}</span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Recettes Cumulées</span>
          <span className="text-4xl font-bold text-green-600 mt-2">{totalRevenue.toLocaleString('fr-FR')} $</span>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filtrer par genre</label>
          <select 
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 border bg-white"
            value={selectedGenre} 
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">Tous les genres</option>
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Trier par</label>
          <select 
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 border bg-white"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as 'recettes' | 'date' | '')}
          >
            <option value="">Aucun tri</option>
            <option value="recettes">Recettes (Décroissant)</option>
            <option value="date">Date de sortie (Plus récents)</option>
          </select>
        </div>
      </div>

      {/* GRID DE FILMS */}
      {processedMovies.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Aucun film ne correspond à vos critères.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {processedMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};