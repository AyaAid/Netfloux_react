import React, { useState, useEffect } from "react";
import { getTraktShowsByDate } from "../../utils/api";

interface TraktEpisode {
  id: number;
  title: string;
  episode: {
    ids: {
      trakt: number;
      tvdb: number;
      imdb: string;
      tmdb: number;
      tvrage: number;
    };
    number: number;
    season: number;
    title: string;
  };
  first_aired: string;
  show: {
    title: string;
    year: number;
    ids: {
      trakt: number;
      tvdb: number;
      imdb: string;
      tmdb: number;
      tvrage: number;
    };
  };
}

function ShowListByDate() {
  const [episodes, setEpisodes] = useState<{ [date: string]: TraktEpisode[] }>(
    {}
  );

  useEffect(() => {
    getTraktShowsByDate("2022-09-01", 7).then((response: TraktEpisode[]) => {
      const groupedEpisodes: { [date: string]: TraktEpisode[] } = {};

      response.forEach((episode) => {
        const date = episode.first_aired.substring(0, 10);
        if (!groupedEpisodes[date]) {
          groupedEpisodes[date] = [];
        }
        groupedEpisodes[date].push(episode);
      });

      setEpisodes(groupedEpisodes);
    });
  }, []);

  return (
    <div>
      {Object.entries(episodes).map(([date, episodesForDate]) => (
        <div key={date}>
          <h2>Date de sortie : {date}</h2>
          <ul>
            {episodesForDate.map((episode) => (
              <li key={episode.id}>
                <h3>{episode.title}</h3>
                <p>Nom de la série : {episode.show.title}</p>
                <p>Saison : {episode.episode.season}</p>
                <p>Épisode : {episode.episode.number}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ShowListByDate;
