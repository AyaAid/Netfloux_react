import React, { useState, useEffect } from "react";
import { getShowsList } from "../../utils/api";
import "./ShowList.scss";

function ShowList() {
  const [films, setFilms] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getShowsList("action", 1);
      setFilms(data);
    }
    fetchData();
  }, []);

  return (
    <div className="film-block">
      <h3>Action</h3>
      <div className="film-carousel">
        {films.map((film) => (
          <div className="film">
            <div className="film-image" key={film["title"]}>
              {" "}
              <div className="film-image-ban"><h4>{film["title"]}</h4></div>       
              <img src={film["images"]["backdrops"]} alt="film"></img>
          
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowList;
