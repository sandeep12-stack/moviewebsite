import React, { useState, useEffect } from 'react';
import { Heart, Search } from 'lucide-react';

// Mock movie database with placeholder images
const mockMovies = [
  { id: 1, title: "The Gorge", date: "2025-02-13", genre: "Romance", poster: "https://picsum.photos/seed/gorge/300/450" },
  { id: 2, title: "Flight Risk", date: "2025-01-22", genre: "Action", poster: "https://picsum.photos/seed/flight/300/450" },
  { id: 3, title: "High Rollers", date: "2025-03-14", genre: "Action", poster: "https://picsum.photos/seed/rollers/300/450" },
  { id: 4, title: "Cupcakes, Lonely Cats", date: "2025-03-14", genre: "Comedy", poster: "https://picsum.photos/seed/cupcakes/300/450" },
  { id: 5, title: "A Murder In Oakland: Beauty Is Deadly", date: "2025-03-14", genre: "Thriller", poster: "https://picsum.photos/seed/oakland/300/450" },
  { id: 6, title: "Skarlett", date: "2025-03-14", genre: "Drama", poster: "https://picsum.photos/seed/skarlett/300/450" },
  { id: 7, title: "Sister Midnight", date: "2025-03-14", genre: "Horror", poster: "https://picsum.photos/seed/midnight/300/450" },
  { id: 8, title: "Penguin Girl", date: "2025-03-14", genre: "Animation", poster: "https://picsum.photos/seed/penguin/300/450" },
  { id: 9, title: "Be Happy", date: "2025-02-16", genre: "Comedy", poster: "https://picsum.photos/seed/happy/300/450" },
  { id: 10, title: "Sweet Heart", date: "2025-02-14", genre: "Romance", poster: "https://picsum.photos/seed/sweet/300/450" },
  { id: 11, title: "Meanwhile", date: "2025-03-14", genre: "Comedy", poster: "https://picsum.photos/seed/meanwhile/300/450" },
  { id: 12, title: "The World Will Tremble", date: "2025-03-14", genre: "Action", poster: "https://picsum.photos/seed/tremble/300/450" },
  { id: 13, title: "State Vs. A Nobody", date: "2025-03-14", genre: "Drama", poster: "https://picsum.photos/seed/state/300/450" },
  { id: 14, title: "Racing Hearts", date: "2025-04-20", genre: "Action", poster: "https://picsum.photos/seed/racing/300/450" },
  { id: 15, title: "Midnight City", date: "2025-05-15", genre: "Thriller", poster: "https://picsum.photos/seed/city/300/450" },
  { id: 16, title: "Ocean Dreams", date: "2025-06-10", genre: "Romance", poster: "https://picsum.photos/seed/ocean/300/450" },
  { id: 17, title: "Space Warriors", date: "2025-07-22", genre: "Sci-Fi", poster: "https://picsum.photos/seed/space/300/450" },
  { id: 18, title: "Lost Chronicles", date: "2025-08-05", genre: "Adventure", poster: "https://picsum.photos/seed/chronicles/300/450" },
];

const genres = ["All Genres", "Action", "Romance", "Comedy", "Drama", "Thriller", "Horror", "Animation", "Sci-Fi", "Adventure"];

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [favorites, setFavorites] = useState([]);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 9;

  // Load favorites from state on mount
  useEffect(() => {
    const stored = [];
    setFavorites(stored);
  }, []);

  // Filter movies based on search and genre
  const filteredMovies = mockMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'All Genres' || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  // Pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const toggleFavorite = (movieId) => {
    setFavorites(prev => {
      if (prev.includes(movieId)) {
        return prev.filter(id => id !== movieId);
      } else {
        return [...prev, movieId];
      }
    });
  };

  const isFavorite = (movieId) => favorites.includes(movieId);

  const displayMovies = showWatchlist 
    ? mockMovies.filter(movie => favorites.includes(movie.id))
    : currentMovies;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Movie App</h1>
        <button
          onClick={() => setShowWatchlist(!showWatchlist)}
          className="text-white hover:text-blue-400 transition-colors"
        >
          Watchlist({favorites.length})
        </button>
      </div>

      {/* Search and Filter */}
      <div className="px-6 py-6 space-y-4">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search Movies..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-4 top-3.5 text-slate-400" size={20} />
        </div>

        {!showWatchlist && (
          <div className="max-w-2xl mx-auto">
            <select
              value={selectedGenre}
              onChange={(e) => {
                setSelectedGenre(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Movies Grid */}
      <div className="px-6 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {displayMovies.map(movie => (
            <div
              key={movie.id}
              className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow relative group"
            >
              <button
                onClick={() => toggleFavorite(movie.id)}
                className="absolute top-3 right-3 z-10 bg-slate-900 bg-opacity-70 rounded-full p-2 hover:bg-opacity-90 transition-all"
              >
                <Heart
                  size={20}
                  className={isFavorite(movie.id) ? 'fill-red-500 text-red-500' : 'text-white'}
                />
              </button>
              
              <div className="aspect-[2/3] overflow-hidden bg-slate-700">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-4">
                <h3 className="text-white font-semibold text-lg mb-1">{movie.title}</h3>
                <p className="text-slate-400 text-sm">{movie.date}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-slate-700 text-slate-300 text-xs rounded-full">
                  {movie.genre}
                </span>
              </div>
            </div>
          ))}
        </div>

        {displayMovies.length === 0 && (
          <div className="text-center text-slate-400 py-12">
            <p className="text-xl">No movies found</p>
          </div>
        )}

        {/* Pagination */}
        {!showWatchlist && totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors"
            >
              Previous
            </button>
            
            <span className="px-4 py-2 bg-slate-800 text-white rounded-lg">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;