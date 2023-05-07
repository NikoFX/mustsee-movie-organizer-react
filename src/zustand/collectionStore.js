import { create } from 'zustand'

const collectionStore = create(set => ({
    list: [],
    fetchList: (id) => {
        fetch('https://expressjs-movie-organizer-api.vercel.app/collection/' + id)
            .then(res => res.json())
            .then(data => {
                data.movie.forEach(imdbID => {
                    fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${import.meta.env.VITE_API_KEY}`)
                        .then(res => res.json())
                        .then(data => {
                            set(state => {
                                state.list.push({
                                    imdbID:imdbID,
                                    Title: data.Title,
                                    Poster: data.Poster
                                })
                                return {}
                            })
                        })
                })
            })
    }
}))

export default collectionStore