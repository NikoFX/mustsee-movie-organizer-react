import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { Badge, Checkbox, CircularProgress } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import moviesStore from './zustand/moviesStore'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Movies from './Movies'
import Collection from './Collection'
import { Route, Routes, useNavigate } from 'react-router-dom';

import movieLogo from './assets/movie_logo.webp'

function App() {

    const [asideBtnMode, setAsideBtnMode] = useState('Add to collection')
    const [collectionID, setCollectionID] = useState(0)

    const { movies, fetchMovies, favoriteList, addFavorite, removeFavorite, emptyFavoriteList } = moviesStore()
    let lastScroll = 0
    let page = 1
    const navigate = useNavigate()

    const asideRef = useRef(null)

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    useEffect(() => {
        fetchMovies()
    }, [])

    const showAside = () => {
        asideRef.current.style = 'display:block;right:0;'
    }

    const searchHandle = (e) => {
        fetchMovies(e.target.value)
    }

    const addToCollection = (e) => {
        e.preventDefault()

        if (asideBtnMode === 'Go to collection') {
            navigate('collection/' + collectionID)
            asideRef.current.style = 'right:-400px;'
            emptyFavoriteList()
        }

        setAsideBtnMode('')
        const newMovies = favoriteList.map(m => m.imdbID)
        fetch('https://expressjs-movie-organizer-api.vercel.app/collection', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "title": e.target[0].value,
                "movies": newMovies
            })
        })
            .then(res => res.json())
            .then(d => {console.log(d); setCollectionID(d.id) })
            .finally(() => setAsideBtnMode('Go to collection'))
    }


    return (
        <div className="container">
            <nav className="nav">
                <div className="wrapper">
                    <div className="logo"><img src={movieLogo} alt="logo" className="logo__img" />MustSee</div>
                    <div className="menu">
                        <div className="menu__search">
                            <input type="text" className="menu__search-input" onChange={searchHandle} />
                            <SearchRoundedIcon/>
                        </div>
                        <a href="" className="menu__link">My collection</a>
                        <div className="menu__link">
                            <Badge badgeContent={favoriteList.length} color="secondary" title="Favorite list" placement="bottom">
                                <Favorite id='movie-card__badge-icon' onClick={showAside} />
                            </Badge>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="main">
                <div className="wrapper">
                    <Routes>
                        <Route path='collection/:id' element={<Collection />} />
                        <Route path='*' element={<Movies />} />
                    </Routes>
                </div>
            </div>
            <div className="aside" ref={asideRef}>
                <div className="aside__main">
                    <h3 className="aside__header">
                        Favorite movies
                    </h3>
                    <div className="aside__favorites">
                        {favoriteList?.map(movie => (
                            <div className="aside__movie-card" key={movie.imdbID}>
                                <img src={movie.Poster} alt="img" className="aside__movie-card-img" />
                                <button className="aside__movie-card-btn" onClick={() => removeFavorite(movie.imdbID)}><DeleteForeverRoundedIcon sx={{ width: '5px', transform: 'scale(4)' }} /></button>
                                <h3 className="aside__movie-card-title">{movie.Title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
                <form onSubmit={addToCollection}>
                    <input type="text" className="aside__input" placeholder='name of collection' />
                    <button type='submit' className="aside__btn">{asideBtnMode ? asideBtnMode : <CircularProgress color="secondary" />}</button>
                </form>
            </div>
        </div>
    )
}

export default App