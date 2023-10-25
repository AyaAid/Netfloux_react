import React, {useState} from "react";
import {getShowsList} from "../../utils/api";

function ShowList() {
    const [films, setFilms] = useState([]);

    return (
        <div>
            <h1>Film List</h1>
            <button onClick={async () => {
                setFilms(await getShowsList("action", 1));
            }}>Get Popular Films
            </button>
            <ul>
                {films.map((film) => (
                    <li key={film["title"]}>{film["title"]}</li>
                ))}
            </ul>
        </div>
    );
}

export default ShowList;
