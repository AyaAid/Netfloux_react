import React, {useEffect, useState} from "react";
import {getShowsList} from "../../utils/api";
import "./ShowList.scss";
import {Link} from 'react-router-dom';

interface Film {
    ids: {
        trakt: number;
    };
    title: string;
    images: {
        backdrops: string;
    };
}

interface ShowListProps {
    slug: string;
    name: string;
}

function ShowList(props: ShowListProps) {
    const [films, setFilms] = useState<Film[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getShowsList(props.slug, 1);
                setFilms(data);
            } catch (error) {
                console.error("Error fetching shows:", error);
            }
        }

        fetchData();
    }, [props.slug]);

    return (
        <div className="film-block">
            <h3>{props.name}</h3>
            <div className="film-carousel">
                {films.map((film) => (
                    <div className="film" key={film.title}>
                        <div className="film-image">
                            <Link to={`/film/${film.ids.trakt}`}>
                                <div className="film-image-ban">
                                    <h4>{film.title}</h4>
                                </div>
                                <img src={film.images.backdrops} alt="film"/>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowList;
