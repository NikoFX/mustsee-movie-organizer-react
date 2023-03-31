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
            <ul>
                {list?.map(movie => (
                    <li key={movie.imdbID}>{movie.Title}</li>
                ))}
            </ul>
        </>
    )
}

export default Collection