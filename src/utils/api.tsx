import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.trakt.tv',
    headers: {
        'Content-Type': 'application/json',
        'trakt-api-key': `${process.env.REACT_APP_TRAKT_CLIENT_ID}`,
        'trakt-api-version': '2',
    },
});

const apiImage = axios.create({
    method: 'GET',
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
    },
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
                ids: { tmdb: string };
                images: { poster: string; backdrops: string };
            }) => {
                element.images = await getImage(element.ids.tmdb);
                return element;
            })
        );

        return response.data;
    } catch (error) {
        console.error('Axios Error:', error);
        throw error;
    }
}

async function getImage(ids: string) {
    try {
        const response = await apiImage.get(`/tv/${ids}/images?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        return {
            poster: "https://image.tmdb.org/t/p/w500" + response.data.posters[0].file_path,
            backdrops: "https://image.tmdb.org/t/p/w500" + response.data.backdrops[0].file_path,
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

async function getShowsDetails(ids: string) {
    try {
        const response = await api.get(`/shows/${ids}?extended=full`);
        response.data.images = await getImage(response.data.ids.tmdb);
        response.data.actors = await getMembers(response.data.ids.trakt);

        return response.data;
    } catch (error) {
        console.error('Axios Error:', error);
        throw error;
    }
}

async function getMembers(ids: string) {
    try {
        const response = await api.get(`/shows/${ids}/people?extended=full`);
        return response.data;
    } catch (error) {
        console.error('Axios Error:', error);
        throw error;
    }
}

export async function searchShows(query: string) {
    try {
        const response = await api.get(`/search/show?query=${query}`);
        return response.data;
    } catch (error) {
        console.error('Axios Error:', error);
        throw error;
    }
}

async function getGenres() {
    try {
        const response = await api.get(`/genres/shows`);
        return response.data;
    } catch (error) {
        console.error('Axios Error:', error);
        throw error;
    }
}

export {getShowsList, getShowsDetails, getTraktShowsByDate, getGenres};
