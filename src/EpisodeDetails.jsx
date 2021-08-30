import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const EpisodeDetails = () => {

    const [episodesDetails, setEpisodesDetails] = useState([]);

    let { id } = useParams()

//using the id parameter in the URL, which links to a unique episode, 
//the following fetch retrieves the information about each individual episode 
    useEffect(() => {
        fetch(`https://api.tvmaze.com/episodes/${id}`)
            .then(response => response.json())
            .then(data => {
                setEpisodesDetails(data)
            });
    }, [])

    //This section is dedicated to eliminate the following html tags embeded in the summary string:
    //<p>,</p>,<b> and </b>


    let episodeSummary = episodesDetails.summary;

    let arrEpisodeSummary = episodeSummary && episodeSummary.split(' ');

    let arrEpisodeSummaryFinal_p = arrEpisodeSummary && arrEpisodeSummary.map((word) => {
        return (
            word.includes('</p>') ?
                word.replace('</p>', '')
                :
                word
        );
    });

    let arrEpisodeSummaryFinal = arrEpisodeSummaryFinal_p && arrEpisodeSummaryFinal_p.map((word) => {
        return (
            word.includes('<p>') ?
                word.replace('<p>', '')
                :
                word
        );
    });

    let arrEpisodeSummaryFinalArray = arrEpisodeSummaryFinal && arrEpisodeSummaryFinal.join(' ');

    return (
        <ShowDetails>
            <ColumnPic>
                <img alt={episodesDetails.name && `Powerpuff episode ${episodesDetails.name}`} src={episodesDetails.image && episodesDetails.image.original} />
            </ColumnPic>
            <ColumnInfo>
                <Title1>Season {episodesDetails.season && episodesDetails.season} Episode {episodesDetails.number && episodesDetails.number}</Title1>
                <Title2>{episodesDetails.name && episodesDetails.name}</Title2>
                <Description>{arrEpisodeSummaryFinalArray && arrEpisodeSummaryFinalArray}</Description>
                <EpisodeLink rel='noreferrer' target='_blank' href={episodesDetails.url && episodesDetails.url}>Click here to access {episodesDetails.name} episode webpage</EpisodeLink>
            </ColumnInfo>
        </ShowDetails>
    )
}

const ShowDetails = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-top:20px;
        padding-left:30px;
        padding-right: 30px;
        
        @media (max-width: 800px) {
        flex-direction: column;
        padding-left:0px;
        padding-right:0px;
  }
`
const ColumnInfo = styled.div`
        width: 50%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        padding-left: 15px;
`

const ColumnPic = styled.div`
        width: 50%;
        display: flex;
        flex-direction: column;
        padding-right: 15px;
`

const Title1 = styled.div`
        color:#fc7f94;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 20px;
        text-align:center;
`

const Title2 = styled.div`
        color:#fc7f94;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 30px;
        text-align:center;
`

const Description = styled.p`
        padding-bottom:30px;
        line-height: 1.7;
        font-size: 17px;
        text-align:justify;
        text-justify: inter-word;
        margin-top: 20px;
`

const EpisodeLink = styled.a`
        text-decoration: none;
        text-align:center;
        color:#fc7f94;
        font-size: 20px;
        &:hover {
        font-weight: bold;
}
`

export default EpisodeDetails;