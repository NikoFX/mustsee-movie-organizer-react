import { create } from 'zustand'

const collectionStore = create(set => ({
    list: [],
    fetchList: (id) => {
        fetch('https://expressjs-movie-organizer-api.vercel.app/collection/' + id)
            .then(res => res.json())
            .then(data => {
                data.movie.forEach(imdbID => {
                    fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=278924d5`)
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