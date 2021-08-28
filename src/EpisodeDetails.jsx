import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'


const EpisodeDetails = () => {

    const [episodesDetails, setEpisodesDetails] = useState([])

    let { id } = useParams()

    useEffect(() => {
        fetch(`https://api.tvmaze.com/episodes/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setEpisodesDetails(data)
            })
    }, [])

    let episodeSummary = episodesDetails.summary

    let arrEpisodeSummary = episodeSummary && episodeSummary.split(' ')

    let arrEpisodeSummaryFinal_p = arrEpisodeSummary && arrEpisodeSummary.map((word) => {
        return (
            word.includes('</p>') ?
                word.replace('</p>', '')
                :
                word
        )
    })

    let arrEpisodeSummaryFinal = arrEpisodeSummaryFinal_p && arrEpisodeSummaryFinal_p.map((word) => {
        return (
            word.includes('<p>') ?
                word.replace('<p>', '')
                :
                word
        )
    })

    let arrEpisodeSummaryFinalArray = arrEpisodeSummaryFinal && arrEpisodeSummaryFinal.join(' ')


    return (
        <div>
            <Link to='/main'>
                Powerfull Girls
            </Link>
            <div>{episodesDetails.name && episodesDetails.name}</div>
            <div>{arrEpisodeSummaryFinalArray && arrEpisodeSummaryFinalArray}</div>
            <div>{episodesDetails.season && episodesDetails.season}</div>
            <div>{episodesDetails.number && episodesDetails.number}</div>
            <a rel='noreferrer' target='_blank' href={episodesDetails.url && episodesDetails.url}>Click here to access the episode webpage</a>
            <img alt={episodesDetails.name && `Powerpuff episode ${episodesDetails.name}`} src={episodesDetails.image && episodesDetails.image.medium} />
        </div>
    )
}

export default EpisodeDetails