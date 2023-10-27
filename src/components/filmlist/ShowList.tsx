import React, { useEffect, useState } from "react";
import { getShowsList } from "../../utils/api";
import "./ShowList.scss";

interface Film {
    title: string;
    images: {
        backdrops: string;
    };
}

interface ShowListProps {
    slug: string; // Update this to match your actual prop names
    name: string; // Update this to match your actual prop names
}

function ShowList(props: ShowListProps) {
    const [films, setFilms] = useState<Film[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getShowsList(props.slug, 1); // Use props.slug
                setFilms(data);
            } catch (error) {
                console.error("Error fetching shows:", error);
            }
        }

        fetchData();
    }, [props.slug]); // Use props.slug

    return (
        <div className="film-block">
            <h3>{props.name}</h3> {/* Use props.name */}
            <div className="film-carousel">
                {films.map((film) => (
                    <div className="film" key={film.title}>
                        <div className="film-image">
                            <div className="film-image-ban">
                                <h4>{film.title}</h4>
                            </div>
                            <img src={film.images.backdrops} alt="film" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowList;
