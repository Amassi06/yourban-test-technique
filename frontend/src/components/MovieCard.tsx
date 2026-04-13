import { Link } from 'react-router-dom';
import type { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-1" title={movie.titre}>
        {movie.titre}
      </h3>
      
      <div className="space-y-1 text-sm text-gray-600 mb-4">
        <p>
          <span className="font-semibold text-gray-700">Genre:</span> 
          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium ml-1">
            {movie.genre}
          </span>
        </p>
        <p><span className="font-semibold text-gray-700">Sortie:</span> {movie.date_sortie}</p>
        <p><span className="font-semibold text-gray-700">Recettes:</span> {movie.recettes_totales} $</p>
        <p><span className="font-semibold text-gray-700">Note:</span> <span className="text-yellow-600 font-bold">{movie.note_presse}</span> / 5</p>
      </div>
      
      <Link 
        to={`/movie/${movie.id}`} 
        className="inline-block w-full text-center bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Voir les détails
      </Link>
    </div>
  );
};