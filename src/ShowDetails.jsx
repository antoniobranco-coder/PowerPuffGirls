import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ShowDetails = () => {

    const [showDetails, setShowDetails] = useState({})
    const [episodes, setEpisodes] = useState([])
    const [season1, setSeason1] = useState(false)
    const [season2, setSeason2] = useState(false)
    const [season3, setSeason3] = useState(false)

    //Altough there is more than one show id returned when searching 
    //I only considered show id 6771 as there is data collision between 
    //the shows id's returned in terms of episodes

    useEffect(() => {
        fetch('https://api.tvmaze.com/shows/6771')
            .then(response => response.json())
            .then(data => {
                setShowDetails(data)
            })
    }, [])

    useEffect(() => {
        fetch('https://api.tvmaze.com/shows/6771?embed=episodes')
            .then(response => response.json())
            .then(data => {
                setEpisodes(data._embedded.episodes)
            })
    }, [])

    const handleClickSeason1 = (event) => {
        event.preventDefault()
        setSeason1(!season1)
    }

    const handleClickSeason2 = (event) => {
        event.preventDefault()
        setSeason2(!season2)
    }

    const handleClickSeason3 = (event) => {
        event.preventDefault()
        setSeason3(!season3)
    }

    let summary = showDetails.summary && showDetails.summary
    let arrSummary = summary && summary.split(' ')

    let arrSummaryFinal_p1 = arrSummary && arrSummary.map((word) => {
        return (
            word.includes('</p>') ?
                word.replace('</p>', '')
                :
                word
        )
    })

    let arrSummaryFinal_p2 = arrSummaryFinal_p1 && arrSummaryFinal_p1.map((word) => {
        return (
            word.includes('<p>') ?
                word.replace('<p>', '')
                :
                word
        )
    })

    let arrSummaryFinal_b = arrSummaryFinal_p2 && arrSummaryFinal_p2.map((word) => {
        return (
            word.includes('<b>') ?
                word.replace('<b>', '')
                :
                word
        )
    })

    let arrSummaryFinal = arrSummaryFinal_b && arrSummaryFinal_b.map((word) => {
        return (
            word.includes('</b>') ?
                word.replace('</b>', '')
                :
                word
        )
    })


    let arrSummaryFinalString = arrSummaryFinal && arrSummaryFinal.join(' ')

    console.log(arrSummaryFinal)
    return (
        <div>
            <div>{showDetails.name && showDetails.name}</div>
            <div>{arrSummaryFinalString && arrSummaryFinalString}</div>
            <button onClick={event => handleClickSeason1(event)}>Season 1</button>
            {season1 &&
                episodes.map((episode) => {
                    return (
                        <div>
                            {episode.season && episode.season === 1 &&
                                <Link to={`/episodes/${episode.id}`}>
                                    {episode.number}
                                    {episode.name}
                                    <img alt={`Powerpuff episode ${episode.name}`} src={episode.image && episode.image.medium} />
                                </Link>}
                        </div>
                    )
                })}
            <button onClick={event => handleClickSeason2(event)}>Season 2</button>
            {season2 &&
                episodes.map((episode) => {
                    return (
                        <div>
                            {episode.season && episode.season === 2 &&
                                <Link to={`/episodes/${episode.id}`}>
                                    {episode.number}
                                    {episode.name}
                                    <img alt={`Powerpuff episode ${episode.name}`} src={episode.image && episode.image.medium} />
                                </Link>}
                        </div>
                    )
                })}
            <button onClick={event => handleClickSeason3(event)}>Season 3</button>
            {season3 &&
                episodes.map((episode) => {
                    return (
                        <div>
                            {episode.season && episode.season === 3 &&
                                <Link to={`episodes/${episode.id}`}>
                                    {episode.number}
                                    {episode.name}
                                    <img alt={`Powerpuff episode ${episode.name}`} src={episode.image && episode.image.medium} />
                                </Link>
                            }
                        </div>
                    )
                })}
        </div >
    )
}

export default ShowDetails