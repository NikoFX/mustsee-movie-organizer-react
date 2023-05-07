import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import collectionStore from './zustand/collectionStore'

function Collection() {
    const { list, fetchList } = collectionStore()
    const { id } = useParams()
    let fetchOnce = true

    useEffect(() => {
        if (fetchOnce) {
            fetchOnce = false
            fetchList(id)
        }
    }, [])


    return (
        <>
            <div className="row-collection">
                <div className="favorites">
                    {list?.map(movie => (
                        <div className="fav-movie-card" key={movie.imdbID}>
                            <img src={movie.Poster} alt="img" className="fav-movie-card__img" />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Collection