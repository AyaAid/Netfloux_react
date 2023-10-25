import React, { useEffect } from "react";
import api from "../utils/api";
    

    function DetailsTitleSeries(Name : string) {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await api.get('/shows/'+Name+'?extended=full');
                    console.log(response.data["overview"]);
                } catch (error) {
                    console.error('Axios Error:', error);
                }

            };

            fetchData();
        }, []);

        return(<></>);
    }
    function DetailsSeasonSeries(test : string) {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await api.get('shows/'+test+'/seasons?extended=full');
                    console.log(response.data);
                } catch (error) {
                    console.error('Axios Error:', error);
                }

            };

            fetchData();
        }, []);

        return(<></>);
    }

    function DetailsCastSeries(Name : string) {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await api.get('shows/'+Name+'/people?extended=full');

                    console.log(response.data.cast);
                } catch (error) {
                    console.error('Axios Error:', error);
                }

            };

            fetchData();
        }, []);

        return(<></>);
    }
    function DetailsCrewSeries(Name : string) {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await api.get('shows/'+Name+'/people?extended=full');

                    console.log(response.data.crew);
                } catch (error) {
                    console.error('Axios Error:', error);
                }

            };

            fetchData();
        }, []);

        return(<></>);
    }
    function DetailsCreatorSeries(Name : string) {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await api.get('shows/'+Name+'/people?extended=full');

                    console.log(response.data.crew["created by"]);
                } catch (error) {
                    console.error('Axios Error:', error);
                }

            };

            fetchData();
        }, []);

        return(<></>);
    }
    
    function Test() {
        DetailsTitleSeries("game-of-thrones");
        DetailsSeasonSeries("game-of-thrones");
        DetailsCastSeries("game-of-thrones");
        DetailsCrewSeries("game-of-thrones");
        DetailsCreatorSeries("game-of-thrones");

        return(<></>);
    }

    


export default Test;
