import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import MovieCard from './components/MovieCard';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept:'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [movieList, setMovieList] = useState([]);

  const[isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {

    setIsLoading(true);
    setErrorMessage('');

    try {
      console.log("hey")
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      // alert(response);

      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if(data.response == 'False'){
        setErrorMessage(data.Error  || 'Failed to fetch movies' );
        setMovieList([]);
        return;

      }

      setMovieList(data.results || []);

    } catch (error) {
      console.log(`Error While Fetching Movies: ${error}`);
      setErrorMessage('Error Fetching Movies, Please Try Again Later.');
    } finally{
      setIsLoading(false);
    }
  }

  useEffect(() => { 
    fetchMovies();
  }, [])

  return (
    <main>
      <div className="pattern" />
      <div className='wrapper'>
        <header >
          <img src="../public/hero-img.png" alt="hero img" />
          <h1>Find The <span className='text-gradient'>Movies</span> That You'll Enjoy Without Hassle</h1>
        <Search search={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section>
          <div className="all-movies">
            <h2 className='mt-[40px] '>
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
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </ul>
              )
            }
           
          </div>
        </section>

        <h1 className='text-white'>{searchTerm}</h1>
      </div>
    </main>
  )
}

export default App