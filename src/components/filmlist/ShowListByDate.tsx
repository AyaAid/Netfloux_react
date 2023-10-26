import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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
  const [episodes, setEpisodes] = useState<TraktEpisode[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const days = 7;

    getTraktShowsByDate(selectedDate.toISOString().substring(0, 10), days).then(
      (response: TraktEpisode[]) => {
        setEpisodes(response);
      }
    );
  }, [selectedDate]);

  const filterEpisodesByDate = (date: Date) => {
    return episodes.filter((episode) => {
      const episodeDate = new Date(episode.first_aired).toUTCString();
      const selectedDate = date.toUTCString();
      return episodeDate === selectedDate;
    });
  };

  const filteredEpisodes = filterEpisodesByDate(selectedDate);

  return (
    <div>
      <h1>Séries triées par date</h1>
      <Calendar
        onChange={(date) => {
          if (date instanceof Date) {
            setSelectedDate(date);
          }
        }}
        value={selectedDate}
      />
      <ul>
        {filteredEpisodes.map((episode) => (
          <li key={episode.id}>
            <h3>{episode.show.title}</h3>
            <p>Saison : {episode.episode.season}</p>
            <p>Episode : {episode.episode.number}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowListByDate;
