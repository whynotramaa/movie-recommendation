import React from 'react'

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div 
      className="movie-card cursor-pointer transition-transform hover:scale-105"
      onClick={() => onMovieClick(movie)}
    >
      <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/No-Poster.png'} alt={movie.title} />
      <div className="mt-4">
          <h3>{movie.title}</h3>

          <div className="content">
              <div className="rating">
                  <img src="/star.svg" alt="star icon" />
                  <p> {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} </p>
                  <span>•</span>
                  <p className='lang'>{movie.original_language}</p>
                  <span>•</span>
                  <p className='year'> {movie.release_date ? movie.release_date.split('-')[0] : "N/A"} </p>
              </div>
          </div>
      </div>
    </div>
  )
}

export default MovieCard