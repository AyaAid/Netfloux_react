import React, { useEffect, useState } from "react";
import { getAllFollowed } from "../../utils/firebase";
import { getShowsDetails } from "../../utils/api";
import Navbar from "../../components/navbar/Navbar";
import "./Followed.scss";

export default function Followed() {
    const [followed, setFollowed] = useState<any[]>([]);
    const addedFilmIds = new Set();

    useEffect(() => {
        getAllFollowed().then((data: any) => {
            const promises = data.map((item: any) => {
                return getShowsDetails(item.filmId).then((data: any) => {
                    if (!addedFilmIds.has(data.ids.trakt)) {
                        addedFilmIds.add(data.ids.trakt);
                        return data;
                    } else {
                        return null;
                    }
                });
            });

            Promise.all(promises).then((filteredData) => {
                const filteredFollowed = filteredData.filter(Boolean);
                setFollowed((currentFollowed) => [...currentFollowed, ...filteredFollowed]);
            });
        });
    }, []);

    return (
        <>
        <Navbar/>
         <div>
            <h2>Mes séries</h2>
            <div className="carousel-film-followed">
                {followed.map((item: any) => (
                    <div className="film-card-followed" key={item.ids.trakt}>
                        
                        
                        <img src={item.images.poster} alt="" />
                    </div>
                ))}
            </div>
        </div>
        </>
       
    );
}
