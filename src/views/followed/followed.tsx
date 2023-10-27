import React, { useEffect, useState } from "react";
import { getAllFollowed } from "../../utils/firebase";
import { getShowsDetails } from "../../utils/api";

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
        <div>
            <h1>Followed</h1>
            <div>
                {followed.map((item: any) => (
                    <div key={item.ids.trakt}>
                        <h2>{item.title}</h2>
                        <img src={item.images.poster} alt="" />
                    </div>
                ))}
            </div>
        </div>
    );
}
