import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { Checkbox } from '@mui/material'
import React from 'react'
import moviesStore from './zustand/moviesStore'
import { useLocation, useNavigate, useNavigation } from 'react-router-dom'

function Movies() {

    const navigate = useNavigate()

    const { movies, favoriteList, addFavorite, removeFavorite } = moviesStore()

    const favoriteCheckbox = (movie) => {
        favoriteList.some(favorite => favorite?.imdbID === movie.imdbID) ? removeFavorite(movie.imdbID) : addFavorite(movie)
    }

    const handleBubbling = (e) => {
        e.stopPropagation()
    }

    const handleMovieCard = (imdbID) => {
        navigate(`description/${imdbID}`)
    }

    return (
        <div className="movies">
            {movies?.map(movie => (
                <div className="movie-card" key={movie.imdbID} onClick={()=>handleMovieCard(movie.imdbID)}>
                    <div className="movie-card__badge" onClick={handleBubbling}>
                        <Checkbox checked={favoriteList.some(f => f.imdbID === movie.imdbID)} onChange={() => favoriteCheckbox(movie)} icon={<FavoriteBorder id='movie-card__badge-icon' />} checkedIcon={<Favorite id='movie-card__badge-icon' />} />
                    </div>
                    <img src={movie.Poster} alt="img" className="movie-card__img" />
                    <p className="movie-card__title">{movie.Title}</p>
                    <div className="movie-card__shadow"></div>
                </div>
            ))}
        </div>
    )
}

export default Movies