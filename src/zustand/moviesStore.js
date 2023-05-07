import { create } from 'zustand'

const moviesStore = create(set => ({
    movies: [],
    favoriteList: [],
    fetchMovies: async (keys) => {
        fetch(`https://www.omdbapi.com/?s=${keys ? keys : 'galaxy'}&apikey=${import.meta.env.VITE_API_KEY}&page=1`)
            .then(res => res.json())
            .then((data) => {
                set(state => {
                    return { movies: data.Search }
                })
            })
    },
    addFavorite: (movie) => {
        set(state => {
            state.favoriteList.push(movie)
            return {}
        })
    },
    removeFavorite: (imdbID) => {
        set(state => {
            const newList = state.favoriteList.filter(movie => movie.imdbID !== imdbID)
            return { favoriteList: newList }
        })
    },
    emptyFavoriteList: () => {
        set({ favoriteList: [] })
    }
}))

export default moviesStore