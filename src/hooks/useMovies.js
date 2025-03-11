import { useState, useEffect } from 'react';
import { fetchPopularMovies } from '../services/tmdbApi';

const useMovies = (searchText) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const data = await fetchPopularMovies();
                setMovies(data);
                setFilteredMovies(data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des films :', error);
                setLoading(false);
            }
        };
        loadMovies();
    }, []);

    useEffect(() => {
        if (searchText === '') {
            setFilteredMovies(movies);
        } else {
            const filtered = movies.filter((movie) =>
                movie.title.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredMovies(filtered);
        }
    }, [searchText, movies]);

    return { movies: filteredMovies, loading };
};

export default useMovies;