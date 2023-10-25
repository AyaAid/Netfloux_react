import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.trakt.tv',
    headers: {
        'Content-Type': 'application/json',
        'trakt-api-key': `${process.env.REACT_APP_TRAKT_CLIENT_ID}`,
        'trakt-api-version': '2'
    }
});

export default api;

// Function exemple
// async function fetchData() {
//     try {
//         const response = await api.get('/shows/trending');
//         console.log(response.data);
//     } catch (error) {
//         console.error('Axios Error:', error);
//     }
// }
