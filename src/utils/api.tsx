import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.trakt.tv',
    headers: {
        'Content-Type': 'application/json',
        'trakt-api-key': `${process.env.REACT_APP_TRAKT_CLIENT_ID}`,
        'trakt-api-version': '2'
    }
});

const apiImage = axios.create({
    method: 'GET',
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application json',
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}}`
    }
});

async function getShowsList(type?: string, page?: number) {
    try {
        let endpoint = '/shows/popular?extended=full';

        if (type != null) {
            endpoint += `&genres=${type}`;
        }

        if (page != null) {
            endpoint += `&page=${page}`;
        }

        const response = await api.get(endpoint);
        await Promise.all(
            response.data.map(async (element: {
                ids: { tmdb: string; };
                images: { poster: string; backdrops: string; };
            }) => {
                element.images = await getImage(element.ids.tmdb)
                return element;
            })
        );

        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Axios Error:', error);
        throw error;
    }
}

async function getImage(ids: string) {
    try {
        const response = await apiImage.get(`/tv/${ids}/images`);
        return {
            poster: "https://image.tmdb.org/t/p/w500" + response.data.posters[0].file_path,
            backdrops: "https://image.tmdb.org/t/p/w500" + response.data.backdrops[0].file_path
        };
    } catch (error) {
        console.error('Axios Error:', error);
        throw error;
    }
}

async function getTraktShowsByDate(startDate: String, days: Number) {
  try {
    const endpoint = `/calendars/all/shows/${startDate}/${days}`;

    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Axios Error:", error);
    throw error;
  }
}

export {getShowsList, getTraktShowsByDate};
