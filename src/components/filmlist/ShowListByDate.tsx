import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getTraktShowsByDate } from "../../utils/api";
import "./ShowListByDate.scss";

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
    <div className="page-calendar">
      <div className="calendar-page-top">
        <div className="background-model"></div>
        <Calendar
          className="calendar"
          onChange={(date) => {
            if (date instanceof Date) {
              setSelectedDate(date);
            }
          }}
          value={selectedDate}
        />
      </div>

      <div className="calendar-page-bottom">
        <div className="calendar-page-bottom-carousel">
        {filteredEpisodes.map((episode) => (
          <div className="film-card">
          
            <li key={episode.id}>
              <h3>{episode.show.title}</h3>
              <p>Saison : {episode.episode.season}</p>
              <p>Episode : {episode.episode.number}</p>
            </li>
          </div>
        ))}
        </div>
        
      </div>
    </div>
  );
}

export default ShowListByDate;
