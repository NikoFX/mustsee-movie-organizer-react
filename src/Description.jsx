import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Description() {

    const [movie, setMovie] = useState({})
    const { imdbID } = useParams()

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=278924d5&plot=full`)
            .then(res => res.json())
            .then(data => setMovie(data))
    }, [])
    return (
        <div className="row-description">
            <h1 className="desc__title">{movie.Title}</h1>
            <div className="desc__info">
                <img src={movie.Poster} alt="img" className="desc__img" />
                <ul className="desc__ul">
                    <li className="desc__li">
                        <span className="desc__li-head">Director</span>
                        {movie.Director}
                    </li>
                    <li className="desc__li">
                        <span className="desc__li-head">Actors</span>
                        {movie.Actors}
                    </li>
                    <li className="desc__li">
                        <span className="desc__li-head">Year</span>
                        {movie.Year}
                    </li>
                    <li className="desc__li">
                        <span className="desc__li-head">Genre</span>
                        {movie.Genre}
                    </li>
                    <p className="desc__about">
                        {movie.Plot}
                    </p>
                </ul>
            </div>
        </div>
    )
}

export default Description