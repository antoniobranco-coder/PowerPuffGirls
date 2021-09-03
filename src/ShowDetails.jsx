import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ArrowDown from './Support/Images/ButtonArrowDown.png';
import ArrowUp from './Support/Images/ButtonArrowUp.png';

const ShowDetails = () => {

    const [showDetails, setShowDetails] = useState({});
    const [episodes, setEpisodes] = useState([]);
    const [season1, setSeason1] = useState(false);
    const [season2, setSeason2] = useState(false);
    const [season3, setSeason3] = useState(false);

    //Altough there is more than one show id returned when searching 
    //I only considered show id 6771 as there is data collision between 
    //the shows id's returned in terms of episodes

    //this fetch will set the showDetails state with all the info about the show Powerpuff Girls 
   //retrieved from the URL fetch('https://api.tvmaze.com/shows/6771')
    useEffect(() => {
        fetch('https://api.tvmaze.com/shows/6771')
            .then(response => response.json())
            .then(data => {
                setShowDetails(data)
            });
    }, []);

    //this fetch will set the episodes state with an array with all the info about all the episodes of
    //Powerpuff Girls. Each array is known to correspond to an episode

    useEffect(() => {
        fetch('https://api.tvmaze.com/shows/6771?embed=episodes')
            .then(response => response.json())
            .then(data => {
                setEpisodes(data._embedded.episodes)
            });
    }, [episodes]);

    const handleClickSeason1 = (event) => {
        event.preventDefault();
        setSeason1(!season1);
    };

    const handleClickSeason2 = (event) => {
        event.preventDefault();
        setSeason2(!season2);
    };

    const handleClickSeason3 = (event) => {
        event.preventDefault();
        setSeason3(!season3);
    };

    //This section is dedicated to eliminate the following html tags embeded in the summary string:
    //<p>,</p>,<b> and </b>

    let summary = showDetails.summary && showDetails.summary;
    let arrSummary = summary && summary.split(' ');

    let arrSummaryFinal_p1 = arrSummary && arrSummary.map((word) => {
        return (
            word.includes('</p>') ?
                word.replace('</p>', '')
                :
                word
        );
    });

    let arrSummaryFinal_p2 = arrSummaryFinal_p1 && arrSummaryFinal_p1.map((word) => {
        return (
            word.includes('<p>') ?
                word.replace('<p>', '')
                :
                word
        );
    })

    let arrSummaryFinal_b = arrSummaryFinal_p2 && arrSummaryFinal_p2.map((word) => {
        return (
            word.includes('<b>') ?
                word.replace('<b>', '')
                :
                word
        );
    });

    let arrSummaryFinal = arrSummaryFinal_b && arrSummaryFinal_b.map((word) => {
        return (
            word.includes('</b>') ?
                word.replace('</b>', '')
                :
                word
        );
    });

    let arrSummaryFinalString = arrSummaryFinal && arrSummaryFinal.join(' ');

    return (
        <ShowPage>
            <Description>{arrSummaryFinalString && arrSummaryFinalString}</Description>
            <EpisodesArea >
                {/* This area is dedicated to put together all the season 1 episodes along with its information in a card
                The episodes get visible after pressing the 'Season 1' button
                */}
                <Button onClick={event => handleClickSeason1(event)}>
                    <ButtonMessage>Season 1</ButtonMessage>
                    <ArrowBox>
                        {<Arrow src={season1 ? ArrowUp : ArrowDown} />}
                    </ArrowBox>
                </Button>
                {season1 &&
                    episodes.map((episode) => {
                        return (
                            <div key={episode.id}>
                                {episode.season && episode.season === 1 &&
                                    <Episodes>
                                        <EpisodeElement href={`/episodes/${episode.id}`} target='_blank'>Season {episode.season}  Episode {episode.number}</EpisodeElement>
                                        <EpisodeElement href={`/episodes/${episode.id}`} target='_blank'> {episode.name}</EpisodeElement>
                                        <EpisodeElement href={`/episodes/${episode.id}`} target='_blank'>
                                            {episode.image && <Image alt={`Powerpuff episode ${episode.name}`} src={episode.image && episode.image.medium} />}
                                        </EpisodeElement>
                                    </Episodes>
                                }
                            </div>
                        );
                    })}
                <Button onClick={event => handleClickSeason2(event)}>
                    <ButtonMessage>Season 2</ButtonMessage>
                    <ArrowBox>
                        {<Arrow src={season2 ? ArrowUp : ArrowDown} />}
                    </ArrowBox>
                </Button>
                {/* This area is dedicated to put together all the season 2 episodes along with its information in a card
                The episodes get visible after pressing the 'Season 2' button
                */}

                {season2 &&
                    episodes.map((episode) => {
                        return (
                            <div key={episode.id}>
                                {episode.season && episode.season === 2 &&
                                    <Episodes>
                                        <EpisodeElement href={`/episodes/${episode.id}`} target='_blank'>Season {episode.season}  Episode {episode.number}</EpisodeElement>
                                        <EpisodeElement href={`/episodes/${episode.id}`} target='_blank'> {episode.name}</EpisodeElement>
                                        <EpisodeElement href={`/episodes/${episode.id}`} target='_blank'>
                                            {episode.image && <Image alt={`Powerpuff episode ${episode.name}`} src={episode.image && episode.image.medium} />}
                                        </EpisodeElement>
                                    </Episodes>
                                }
                            </div>
                        );
                    })}
                <Button onClick={event => handleClickSeason3(event)}>
                    <ButtonMessage>Season 3</ButtonMessage>
                    <ArrowBox>
                        {<Arrow src={season3 ? ArrowUp : ArrowDown} />}
                    </ArrowBox>
                </Button>
                {/* This area is dedicated to put together all the season 3 episodes along with its information in a card
                The episodes get visible after pressing the 'Season 3' button
                */}

                {season3 &&
                    episodes.map((episode, key) => {
                        return (
                            <div key={episode.id}>
                                {episode.season && episode.season === 3 &&
                                    <Episodes>
                                        <EpisodeElement href={`/episodes/${episode.id}`} target='_blank'>Season {episode.season}  Episode {episode.number}</EpisodeElement>
                                        <EpisodeElement href={`/episodes/${episode.id}`} target='_blank'> {episode.name}</EpisodeElement>
                                        <EpisodeElement href={`/episodes/${episode.id}`} target='_blank'>
                                            {episode.image && <Image alt={`Powerpuff episode ${episode.name}`} src={episode.image && episode.image.medium} />}
                                        </EpisodeElement>
                                    </Episodes>
                                }
                            </div>
                        );
                    })}

            </EpisodesArea>
        </ShowPage >
    )
}

// Since flexbox model makes the webpage totally responsive, altough required I did't use any breakpoint 
//when styling this component

const ShowPage = styled.div`
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top:20px;
            padding-left:30px;
            padding-right: 30px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:17px;
            `
const Description = styled.p`
            padding-bottom:30px;
            line-height: 1.7;
            font-size: 17px;
            text-align:justify;
            text-justify: inter-word;
            margin-top: 0;            
`
const EpisodesArea = styled.div`
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: center;
            margin-left: 30px;
            margin-right: 30px;
            text-decoration: none;
            width: 100%;
            `

const Episodes = styled.a`
            display: flex;
            flex-direction: column;
            width: 450px;
            margin-bottom: 10px;
            text-align: center;
            text-decoration: none;
            `

const Image = styled.img`
            border-radius:10px;
            width: 90%;
            `

const EpisodeElement = styled.a`
            text-decoration: none!important;
            color:#fc7f94;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 16.5px;
            margin-bottom: 5px;
`

const Button = styled.button`
            display: flex;
            flex-direction: row;
            width: 100%;
            height:40px;
            border-radius: 5px;
            background-color: white;
            border-width: 0.5px;
            border-color: rgb(200,200,200);
            box-shadow:0px 0px white;
            margin-bottom: 25px;
            padding-top:5px;
`
const ButtonMessage = styled.div`
            width: 50%;
            text-align:end;
            padding-top: 2px;
            font-size: 20px;
            color:#383737;
            font-family: 'arial narrow';
`

const ArrowBox = styled.div`
            width: 50%;
            height: 85%;
            text-align:end;
            padding-right: 15px;
            padding-top: 2px;
`

const Arrow = styled.img`
            align-items:flex-end;
            height: 100%;
`

export default ShowDetails;