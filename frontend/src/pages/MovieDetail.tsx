import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieById, getMovies } from '../services/api';
import type{ Movie } from '../types/Movie';

export const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);

  useEffect(() => {
    if (!id) return;
    
    Promise.all([getMovieById(id), getMovies()])
      .then(([current, all]) => {
        setMovie(current);
        
        const recs = all
          .filter(m => m.genre === current.genre && m.id.toString() !== id)
          .slice(0, 3);
          
        setRecommendations(recs);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!movie) return <div className="p-10 font-bold">Chargement...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link to="/" className="text-blue-600 underline mb-6 block">← Retour</Link>
      
      {/* INFOS DU FILM */}
      <h1 className="text-4xl font-bold mb-2">{movie.titre}</h1>
      <p className="text-gray-600 mb-6 border-b pb-4">
        {movie.genre} | Sortie : {movie.date_sortie}
      </p>
      
      <div className="bg-gray-100 p-6 rounded-lg mb-10">
        <p><strong>Recettes :</strong> {movie.recettes_totales.toLocaleString()} $</p>
        <p><strong>Note Presse :</strong> {movie.note_presse} / 5</p>
        <p><strong>Entrées :</strong> {movie.nombre_entrees.toLocaleString()}</p>
        <p><strong>Pays :</strong> {movie.pays_origine}</p>
      </div>

      {/* RECOMMANDATIONS */}
      <h2 className="text-2xl font-bold mb-4">Films du même genre</h2>
      <div className="grid grid-cols-3 gap-4">
        {recommendations.map(rec => (
          <div key={rec.id} className="border p-4 rounded bg-white shadow-sm">
            <h3 className="font-bold text-lg truncate mb-2">{rec.titre}</h3>
            <Link to={`/movie/${rec.id}`} className="text-blue-500 text-sm font-medium hover:underline">
              Voir la fiche
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};