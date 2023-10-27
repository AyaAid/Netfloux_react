import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import '../assets/styles/Style.scss';
import ShowList from '../components/filmlist/ShowList';
import { getGenres } from '../utils/api';
import { useAuthState } from '../utils/firebase';

function Home() {
    const user = useAuthState();
    const [types, setTypes] = useState<{ name: string; slug: string; }[]>([]);

    useEffect(() => {
        getGenres()
            .then(data => {
                setTypes(data);
            })
            .catch(error => {
                console.error('Error fetching genres:', error);
            });
    }, []);


    const excludedTypes = [
        'Biography',
        'Holiday',
        'Home And Garden',
        'Mini Series',
        'None',
        'Short',
        'Special Interest',
        'Sporting Event',
    ];

    // Filter the types array to exclude certain types
    const filteredTypes = types.filter(type => !excludedTypes.includes(type.name));

    return (
        <>
            <Navbar />
            {filteredTypes.map((type, index) => (
                <ShowList key={index} name={type.name} slug={type.slug} />
            ))}
        </>
    );
}

export default Home;
