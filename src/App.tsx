import React from 'react';
import './utils/firebase';
import AppRouter from './routes/AppRouter';
import schedule from 'node-schedule';
import {getNewEpisodesInNext24Hours} from "./utils/api";

function App() {

    schedule.scheduleJob('0 8 * * *', function () {
        getNewEpisodesInNext24Hours();
    });

    return (
        <div className="App">
            <AppRouter/>
        </div>
    );
}

export default App;
