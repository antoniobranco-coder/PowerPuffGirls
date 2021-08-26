import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


const EpisodeDetails = () => {

    //As there isn't an API that accepts episode ID as parameter
    //providing its details I decided to fetch into the state the Powerpuff Girls
    //show information in order to extract the necessary episode information
    //The solution adapted is however more expensive in terms of performance

    const [episodesDetails, setEpisodesDetails] = useState([])

    let { id } = useParams()

    let idNum = parseInt(id)

    useEffect(() => {
        fetch('https://api.tvmaze.com/shows/6771?embed=episodes')
            .then(response => response.json())
            .then(data => {
                console.log(data._embedded.episodes)
                setEpisodesDetails(data._embedded.episodes)
            })
    }, [])

    console.log(idNum, typeof idNum)
    return (
        <div>
            {episodesDetails.filter((episode) => {
                return (episode.id &&
                    episode.id === idNum &&
                    <div>{episode.name}</div>
                )
            })}

        </div>
    )
}

export default EpisodeDetails