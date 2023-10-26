import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "../detailFilm/DetailFilm.scss";
import { getShowsDetails } from "../../utils/api";
import { useParams } from "react-router-dom";

export default function DetailFilm() {
  const { filmId } = useParams();
  const [film, setFilm] = React.useState<any>({});

  React.useEffect(() => {
    if (filmId != null) {
      getShowsDetails(filmId).then((response) => {
        setFilm(response);
      });
    }
  }, [filmId]);

  function getStars(rating: number) {
    let stars = [];
    for (let i = 0; i < rating; i += 2) {
      stars.push("⭐️");
    }
    return stars;
  }

  if (film.actors && film.actors.crew) {
    let director = null;
    if (
      Array.isArray(film.actors.crew.crew) &&
      film.actors.crew.crew.length > 0
    ) {
      director = film.actors.crew.crew.find(
        (person: any) => person.job === "Creator"
      );
    }
    const principalActors = film.actors.cast.slice(0, 5);

    return (
      <>
        <Navbar />
        <div className="column-film">
          <div className="detail-film-img">
            <img src={film.images?.backdrops} alt="film" />
            <div className="detail-film-fav"></div>
          </div>

          <div>
            <div className="detail-film-info">
                <div className="detail-film-info-div-title">
                <h2>{film.title}</h2>
                </div>
             
              <div className="detail-film-info-row">
                <div className="detail-film-info-left">
                  <h3>Infos</h3>
                  <ul>
                    <li>{film.genres?.join(", ")}</li>
                    <li>
                      Réalisateur: {director ? director.person.name : "N/A"}
                    </li>
                    <li>{film.year}</li>
                    <li>{film.runtime} minutes</li>
                    <li>Note: {getStars(film.rating)}</li>
                  </ul>
                </div>
                <div className="detail-film-info-right">
                  <h3>Acteurs</h3>
                  <ul>
                    {principalActors.map((actor: any) => (
                      <li key={actor.person.name}>{actor.person.name}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="detail-film-description">
                <div className="detail-film-description-title">
                  <h2>Description</h2>
                </div>
                <div className="detail-film-description-text">
                  <p>{film.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <p>Loading...</p>
      </>
    );
  }
}
