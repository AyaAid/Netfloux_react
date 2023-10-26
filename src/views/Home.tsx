import React from 'react';
import Navbar from '../components/navbar/Navbar';
import '../assets/styles/Style.scss';
import ShowList from '../components/filmlist/ShowList';

function Home(){
    return(
        <>
        <Navbar/>
        <ShowList/>
        </>

    );
}
export default Home;