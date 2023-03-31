import { create } from 'zustand'

const collectionStore = create(set => ({
    list: [],
    fetchList: (id) => {
        fetch('https://acb-api.algoritmika.org/api/movies/list/' + id)
            .then(res => res.json())
            .then(data => {
                data.movies.forEach(imdbID => {
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