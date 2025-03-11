import axios from 'axios';
import { TMDB_API_KEY, TMDB_ACCESS_TOKEN } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_API_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const fetchPopularMovies = async () => {
    try {
        const response = await axios.get(`${BASE_API_URL}/movie/popular`, {
            params: { api_key: TMDB_API_KEY, language: 'fr-FR' },
        });

        const movies = response.data.results;

        const moviesWithDetails = await Promise.all(
            movies.map(async (movie) => {
                const creditsResponse = await axios.get(`${BASE_API_URL}/movie/${movie.id}/credits`, {
                    params: { api_key: TMDB_API_KEY },
                });

                const actors = creditsResponse.data.cast.slice(0, 3).map((actor) => actor.name); 
                return {
                    id: movie.id,
                    title: movie.title,
                    description: movie.overview,
                    imageUrl: `${IMAGE_BASE_URL}${movie.poster_path}`,
                    actors: actors.join(', '),
                };
            })
        );

        return moviesWithDetails;
    } catch (error) {
        console.error('Erreur lors de la récupération des films populaires:', error);
        return [];
    }

    
};

export const fetchMovieDetails = async (movieId) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/movie/${movieId}`, {
            params: { api_key: TMDB_API_KEY, language: 'fr-FR', append_to_response: 'credits,recommendations' },
        });

        const movie = response.data;
        const actors = movie.credits.cast.slice(0, 5).map((actor) => actor.name).join(', ');
        const genres = movie.genres.map((genre) => genre.name);
        const recommendations = movie.recommendations.results.slice(0, 5).map((rec) => ({
            id: rec.id,
            title: rec.title,
            imageUrl: `${IMAGE_BASE_URL}${rec.poster_path}`,
        }));

        return {
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            imageUrl: `${IMAGE_BASE_URL}${movie.poster_path}`,
            rating: movie.vote_average.toFixed(1),
            actors,
            genres,
            recommendations,
        };
    } catch (error) {
        console.error('Erreur lors de la récupération des détails du film:', error);
        return null;
    }
};

export const fetchMovieById = async (movieId) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/movie/${movieId}`, {
            params: { api_key: TMDB_API_KEY, language: 'fr-FR', append_to_response: 'credits' },
        });

        const movie = response.data;
        return {
            id: movie.id,
            title: movie.title,
            imageUrl: `${IMAGE_BASE_URL}${movie.poster_path}`,
            actors: movie.credits.cast.slice(0, 3).map((actor) => actor.name).join(', ') || 'Inconnu',
            genres: movie.genres.map((genre) => genre.name) || ['Inconnu'],
            rating: movie.vote_average !== undefined ? movie.vote_average.toFixed(1) : 'N/A',
        };
    } catch (error) {
        console.error(`Erreur lors de la récupération du film ${movieId}:`, error);
        return null;
    }
};

export const fetchFavoriteMovies = async () => {
    const sessionId = await AsyncStorage.getItem('session_id');
    if (!sessionId) {
        console.error('Aucune session trouvée');
        return;
    }
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/account/${sessionId}/favorite/movies`,
        params: {language: 'fr-FR', page: '1', sort_by: 'created_at.asc'},
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        }
    };

    try {
        const res = await axios.request(options);
        return res.data.results || [];
    } catch (err) {
        console.error("Erreur lors de la récupération des favoris :", err); 
        return [];
    }

};

export const toggleFavoriteMovie = async (movieId, isFavorite) => {
    const sessionId = await AsyncStorage.getItem('session_id');
    if (!sessionId) {
        console.error('Aucune session trouvée');
        return;
    }
    const options = {
        method: 'POST',
        url: `https://api.themoviedb.org/3/account/${sessionId}/favorite`,
        headers : {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },
        data: {
            media_type: 'movie',
            media_id: movieId,
            favorite: !isFavorite,
        },
    };

    return axios.request(options)
        .then(res => res.data)
        .catch(err => {
            console.error('Erreur lors du changement du statut favori:', err);
            throw err;
        });

};

export const fetchWatchlistMovies = async () => {

    const sessionId = await AsyncStorage.getItem('session_id');
    if (!sessionId) {
        console.error('Aucune session trouvée');
        return;
    }
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/account/${sessionId}/watchlist/movies`,
        params: {language: 'fr-FR', page: '1', sort_by: 'created_at.asc'},
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        }
    };

    try {
        const res = await axios.request(options);
        return res.data.results || [];
    } catch (err) {
        console.error("Erreur lors de la récupération des films de votre Watchlist :", err);
        return [];
    }

};

export const toggleWatchlistMovie = async (movieId, isInWatchlist) => {
    const sessionId = await AsyncStorage.getItem('session_id');
    if (!sessionId) {
        console.error('Aucune session trouvée');
        return;
    }
    const options = {
        method: 'POST',
        url: `https://api.themoviedb.org/3/account/${sessionId}/watchlist`,
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },
        data: {media_type: 'movie', media_id: movieId, watchlist: !isInWatchlist}
      };
      
    return axios.request(options)
        .then(res => res.data)
        .catch(err => {
            console.error('Erreur lors du changement du statut watchlist:', err);
            throw err;
        });
};