import React, { useEffect } from "react";
import { api } from "../utils/api";
    
    function DetailsSeries(Name : string) {
        let rep = null;
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await api.get('/shows/'+Name+'?extended=full');
                    console.log(response.data);
                    rep = response.data;
                } catch (error) {
                    console.error('Axios Error:', error);
                }

            };

            fetchData();
        });

        return rep;

    }
    function DetailsStarSeries(Name : string) {
        let rep = null;
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await api.get('/shows/'+Name+'?extended=full');
                    console.log(response.data["rating"]);
                    rep = response.data["rating"];
                } catch (error) {
                    console.error('Axios Error:', error);
                }

            };

            fetchData();
        });

        return rep;
    }
    function DetailsTitleSeries(Name : string) {
        let rep = null;
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await api.get('/shows/'+Name+'?extended=full');
                    console.log(response.data["overview"]);
                    rep = response.data["overview"];
                } catch (error) {
                    console.error('Axios Error:', error);
                }

            };

            fetchData();
        });

        return rep;
    }
    function DetailsSeasonSeries(test : string) {
        let rep = null;
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await api.get('shows/'+test+'/seasons?extended=full');
                    console.log(response.data);
                    rep = response.data;
                } catch (error) {
                    console.error('Axios Error:', error);
                }

            };

            fetchData();
        });

        return rep;
    }

    function DetailsCastSeries(Name : string) {
        let rep = null;
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await api.get('shows/'+Name+'/people?extended=full');

                    console.log(response.data.cast);
                    rep = response.data.cast;
                } catch (error) {
                    console.error('Axios Error:', error);
                }

            };

            fetchData();
        });

        return rep;
    }
    function DetailsCrewSeries(Name : string) {
        let rep = null;
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await api.get('shows/'+Name+'/people?extended=full');

                    console.log(response.data.crew);
                    rep = response.data.crew;
                } catch (error) {
                    console.error('Axios Error:', error);
                }

            };

            fetchData();
        });

        return rep;
    }
    function DetailsCreatorSeries(Name : string) {
        let rep = null;
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await api.get('shows/' + Name + '/people?extended=full');
                    console.log(response.data.crew["created by"]);
                    rep = response.data.crew["created by"];
                } catch (error) {
                    console.error('Axios Error:', error);
                }
            };

            fetchData();
        });

        return rep;
    }
    
    function Test() {
        DetailsSeries("game-of-thrones");
        DetailsStarSeries("game-of-thrones");
        DetailsTitleSeries("game-of-thrones");
        DetailsSeasonSeries("game-of-thrones");
        DetailsCastSeries("game-of-thrones");
        DetailsCrewSeries("game-of-thrones");
        DetailsCreatorSeries("game-of-thrones");

        return(<></>);
    }

    


export default Test;
