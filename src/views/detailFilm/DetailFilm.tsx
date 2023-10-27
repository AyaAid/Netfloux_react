import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "../detailFilm/DetailFilm.scss";
import { getShowsDetails } from "../../utils/api";
import { useParams } from "react-router-dom";
import { addFollowed, likes, dislikes, getComment, addComment } from "../../utils/firebase";

export default function DetailFilm() {
  const { filmId } = useParams();
  const [film, setFilm] = React.useState<any>({});
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [isLike, setIsLike] = React.useState(false);
  const [isDislike, setIsDislike] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState<string[]>([]);

async function fetchComments() {
    
  if (filmId) {
    try {
      const querySnapshot = await getComment(filmId);
      console.log("query snapshot", querySnapshot)
      console.log(filmId)

      if (querySnapshot) {
        const commentsData: string[] = [];
        querySnapshot.docs.forEach((doc) => {
          commentsData.push(doc.data().comment);
        });
        console.log("comment data", commentsData);
        setComments(commentsData);
      } else {
        console.error("Aucun commentaire trouvé pour cet ID de film.");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des commentaires : ",
        error
      );
    }
  }
}

  const handleClick=()=> {
    addComment(filmId, comment)
    .then((res: any) => console.log("Add Comment Success", res))
    .catch((err: Error) => console.error('Error', err));
    console.log(getComment);
    console.log(comment);
  }

  React.useEffect(() => {
    if (filmId != null) {
      getShowsDetails(filmId).then((response) => {
        setFilm(response);
      });
      
    }
    fetchComments();
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
            <div className="logos">
              <div
                className={`detail-film-fav${isFollowed ? "-followed" : ""}`}
                onClick={async () => {
                  if (isFollowed) {
                    await addFollowed(filmId);
                    setIsFollowed(false);
                  } else {
                    await addFollowed(filmId);
                    setIsFollowed(true);
                  }
                }}
              ></div>
              <div
                className={`detail-film-add${isLike ? "-like" : ""}`}
                onClick={async () => {
                  if (isLike) {
                    await likes(filmId);
                    setIsLike(false);
                  } else {
                    await likes(filmId);
                    setIsLike(true);
                    setIsDislike(false);
                  }
                }}
              ></div>
              <div
                className={`detail-film-adding${isDislike ? "-dislike" : ""}`}
                onClick={async () => {
                  if (isDislike) {
                    await dislikes(filmId);
                    setIsDislike(false);
                  } else {
                    await dislikes(filmId);
                    setIsDislike(true);
                    setIsLike(false);
                  }
                }}
              ></div>
            </div>
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
              <div className="detail-film-avis">
                <div className="detail-film-avis-title">
                  <h2>Avis</h2>
                </div>
                <div className="detail-film-avis-text">
  <textarea
    placeholder="Votre avis"
    value={comment}
    onChange={(e) => setComment(e.target.value)}
  ></textarea>
  <button onClick={handleClick}>Submit</button>
</div>
<div className="comment-separator"></div>
<div className="comment-list">
  {comments.map((commentData, index) => (
    <div key={index}>{commentData}</div>
  ))}
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
