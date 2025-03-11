import React, { createContext, useState, useEffect } from 'react';
import { fetchFavoriteMovies, toggleFavoriteMovie } from '../services/tmdbApi';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async () => {
        try {
            const fetchedMovies = await fetchFavoriteMovies();
            setFavorites(fetchedMovies);
        } catch (error) {
            console.error("Erreur lors de la récupération des favoris:", error);
        }
    };

    const toggleFavorite = async (movie) => {
        const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id);
        try {
            await toggleFavoriteMovie(movie.id, isAlreadyFavorite);
            await loadMovies();
        } catch (error) {
            console.error('Erreur lors de l\'exécution des fonctions :', error);
        }

    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
