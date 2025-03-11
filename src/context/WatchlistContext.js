import React, { createContext, useState, useEffect } from 'react';
import { fetchWatchlistMovies, toggleWatchlistMovie } from '../services/tmdbApi';

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async () => {
        try {
            const fetchedMovies = await fetchWatchlistMovies();
            setWatchlist(fetchedMovies);
        } catch (error) {
            console.error("Erreur lors de la récupération des films de la watchlist:", error);
        }
    };

     const toggleWatchlist = async (movie) => {
            const isAlreadyInWatchlist = watchlist.some((watchlist) => watchlist.id === movie.id);
            try {
                await toggleWatchlistMovie(movie.id, isAlreadyInWatchlist);
                await loadMovies();
            } catch (error) {
                console.error('Erreur lors de l\'exécution des fonctions :', error);
            }
    
        };

    return (
        <WatchlistContext.Provider value={{ watchlist, toggleWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};
