import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieById, getMovies } from '../services/api';
import type { Movie } from '../types/Movie';

export const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);

  useEffect(() => {
    if (!id) return;
    
    window.scrollTo(0, 0);

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

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-medium text-gray-500 animate-pulse">Chargement des données...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link 
        to="/" 
        className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors mb-10 bg-indigo-50 px-4 py-2 rounded-full"
      >
        ← Retour au catalogue
      </Link>
      
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-4 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-black uppercase tracking-wider">
            {movie.genre}
          </span>
          <span className="text-gray-500 font-medium border-l-2 border-gray-200 pl-3">
            Sortie : {movie.date_sortie}
          </span>
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">{movie.titre}</h1>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center hover:shadow-md transition-shadow">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Recettes</p>
          <p className="text-2xl font-black text-green-600">{movie.recettes_totales.toLocaleString()} $</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center hover:shadow-md transition-shadow">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Note Presse</p>
          <p className="text-2xl font-black text-yellow-500">{movie.note_presse} / 10</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center hover:shadow-md transition-shadow">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Entrées</p>
          <p className="text-2xl font-bold text-gray-900">{movie.nombre_entrees.toLocaleString()}</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center hover:shadow-md transition-shadow">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Origine</p>
          <p className="text-xl font-bold text-gray-800">{movie.pays_origine}</p>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="border-t border-gray-100 pt-12">
          <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight">
            Films similaires
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recommendations.map(rec => (
              <Link 
                key={rec.id} 
                to={`/movie/${rec.id}`} 
                className="group block bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 transform hover:-translate-y-1"
              >
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-3">
                  {rec.titre}
                </h3>
                <span className="text-sm font-bold text-indigo-500 group-hover:underline">
                  Voir la fiche →
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};