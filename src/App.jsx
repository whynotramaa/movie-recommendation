import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [movieList, setMovieList] = useState([]);

  const [trendingMovies, setTrendingMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // USING DEBOUNCED SEARCH SO TH API CALLS AFTER HALF A SECOND
  // +++++++++++++++++++VERY VERY IMPORTANT++++++++++++++++++++++++++++++++++++++++++++

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const [selectedMovie, setSelectedMovie] = useState(null)

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = '') => {

    setIsLoading(true);
    setErrorMessage('');

    try {
      console.log("hey")
      const endpoint = query ?
        `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      // alert(response);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if (data.response == 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;

      }

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }

    } catch (error) {
      console.log(`Error While Fetching Movies: ${error}`);
      setErrorMessage('Error Fetching Movies, Please Try Again Later.');
    } finally {
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm])


  // we didnt add this one in the above useEffect coz it would reload all the list everytime we search for sth making unneccessary calls
  useEffect(() => {
    loadTrendingMovies()
  }, [])

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie)
  }

  const handleCloseModal = () => {
    setSelectedMovie(null)
  }

  const handleTrendingMovieClick = async (movie) => {
    try {
      // Fetch movie details from TMDB first
      const response = await fetch(
        `${API_BASE_URL}/movie/${movie.movie_id}`,
        API_OPTIONS
      )

      if (!response.ok) {
        throw new Error('Failed to fetch movie details')
      }

      const tmdbMovie = await response.json()
      setSelectedMovie(tmdbMovie)
    } catch (error) {
      console.error('Error fetching movie details:', error)
      // Fallback to basic data if fetch fails
      const fallbackMovie = {
        id: movie.movie_id,
        title: movie.title,
        poster_path: movie.poster_url.split('/').pop(),
        vote_average: 0,
        original_language: 'en',
        release_date: ''
      }
      setSelectedMovie(fallbackMovie)
    }
  }

  return (
    <main>
      <div className="pattern" />
      <div className='wrapper'>
        <header >
          <img src="/hero-img.png" alt="hero img" />
          <h1>Find The <span className='text-gradient'>Movies</span> That You'll Enjoy Without Hassle</h1>
          <Search search={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li 
                  key={movie.$id}
                  onClick={() => handleTrendingMovieClick(movie)}
                  className="cursor-pointer transition-transform hover:scale-105"
                >
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>

          </section>
        )
        }

        <section>
          <div className="all-movies">
            <h2>
              All Movies
            </h2>
            {/* {errorMessage && <p className='text-red-500'>{errorMessage}</p>} */}

            {isLoading ? (
              <p className='text-white'> Loading ... </p>
            ) :
              errorMessage ? (
                <p className='text-red-500'>{errorMessage}</p>
              ) : (
                <ul>
                  {movieList.map((movie) => (
                    <MovieCard 
                      key={movie.id} 
                      movie={movie} 
                      onMovieClick={handleMovieClick}
                    />
                  ))}
                </ul>
              )
            }

          </div>
        </section>

        <h1 className='text-white'>{searchTerm}</h1>
      </div>

      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={handleCloseModal}
        />
      )}
    </main>
  )
}

export default App