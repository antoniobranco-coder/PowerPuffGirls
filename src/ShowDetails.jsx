import { useEffect, useState } from 'react'

const ShowDetails = () => {

    const [showDetails, setShowDetails] = useState({})
    const [episodesDetails, setEpisodesDetails] = useState([])
    //Altough there is more than one show id returned when searching 
    //I only considered show id 6771 as there is data collision between 
    //the shows id's returned in terms of episodes

    useEffect(() => {
        fetch('https://api.tvmaze.com/shows/6771')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setShowDetails(data)
            })
    }, [])

    useEffect(() => {
        fetch('https://api.tvmaze.com/shows/6771?embed=episodes')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setEpisodesDetails(data._embedded.episodes)
            })
    }, [])


    console.log(episodesDetails)
    return (
        <div>
            <div>{showDetails.name}</div>
            <div>{`${showDetails.summary}`}</div>
            <div>{
                episodesDetails && episodesDetails.length > 0 && episodesDetails.map((episode) => {
                    return (
                        <div>
                            <div>{episode.name}</div>
                            <div>{episode.summary}</div>
                            <img src={episode.image && episode.image.medium} alt={`PowerpuffGirlsEpisode${episode.name}`} />
                        </div>
                    )
                })
            }</div>
        </div>
    )
}

export default ShowDetails