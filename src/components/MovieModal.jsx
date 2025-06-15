import React, { useEffect, useState } from 'react'

const MovieModal = ({ movie, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_BASE_URL = 'https://api.themoviedb.org/3'
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const [detailsResponse, videosResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/movie/${movie.id}`, API_OPTIONS),
          fetch(`${API_BASE_URL}/movie/${movie.id}/videos`, API_OPTIONS)
        ])

        if (!detailsResponse.ok || !videosResponse.ok) {
          throw new Error('Failed to fetch movie details')
        }

        const [details, videos] = await Promise.all([
          detailsResponse.json(),
          videosResponse.json()
        ])

        setMovieDetails(details)
        const trailerVideo = videos.results.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        )
        setTrailer(trailerVideo)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (movie) {
      fetchMovieDetails()
    }
  }, [movie])

  if (!movie) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] max-w-5xl max-h-[85vh] bg-dark-100 rounded-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10 text-white hover:text-light-200 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="overflow-y-auto max-h-[85vh]">
          {isLoading ? (
            <div className="flex items-center justify-center h-72 sm:h-96">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-light-200"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-72 sm:h-96 text-red-500">
              {error}
            </div>
          ) : (
            <>
              {trailer ? (
                <div className="relative pt-[56.25%] w-full">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={trailer.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative pt-[56.25%] w-full bg-black/50">
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/No-Poster.png'}
                    alt={movie.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    No trailer available
                  </div>
                </div>
              )}

              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">{movie.title}</h2>
                    <div className="flex items-center gap-2 mt-1 sm:mt-2 text-sm sm:text-base text-gray-100">
                      <span>{movieDetails?.release_date?.split('-')[0]}</span>
                      <span>•</span>
                      <span>{movieDetails?.runtime} min</span>
                      <span>•</span>
                      <span className="capitalize">{movie.original_language}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-dark-200/50 px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                    <img src="/star.svg" alt="rating" className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-white text-sm sm:text-base font-bold">
                      {movie.vote_average?.toFixed(1)}
                    </span>
                  </div>
                </div>

                {movieDetails?.genres && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {movieDetails.genres.map(genre => (
                      <span
                        key={genre.id}
                        className="px-2 py-0.5 sm:px-3 sm:py-1 bg-light-100/10 rounded-full text-light-200 text-xs sm:text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {movieDetails?.overview && (
                  <div className="mt-3 sm:mt-4">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Overview</h3>
                    <p className="text-sm sm:text-base text-gray-100 leading-relaxed">
                      {movieDetails.overview}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieModal 