import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TMDB_API_KEY, TMDB_ACCESS_TOKEN } from '@env';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const sessionId = await AsyncStorage.getItem('session_id');
            if (sessionId) {
                setUser(sessionId);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de la session:', error);
        }
        setLoading(false);
    };

    const login = async (username, password) => {
        try {
            const { data: requestTokenData } = await axios.get(
                `https://api.themoviedb.org/3/authentication/token/new?api_key=${TMDB_API_KEY}`
            );
            const requestToken = requestTokenData.request_token;
    
            await axios.post(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${TMDB_API_KEY}`, {
                username,
                password,
                request_token: requestToken,
            });
    
            const { data: sessionData } = await axios.post(
                `https://api.themoviedb.org/3/authentication/session/new?api_key=${TMDB_API_KEY}`,
                { request_token: requestToken }
            );
    
            const sessionId = sessionData.session_id;
            await AsyncStorage.setItem('session_id', sessionId);
            setUser(sessionId);
            return null;
        } catch (error) {
            console.error('Erreur de connexion détecté');
            return 'Mot de passe ou identifiant erroné'
        }
    };

    const logout = async () => {
        try {
            const sessionId = await AsyncStorage.getItem('session_id');
            if (!sessionId) {
                console.error('Aucune session trouvée');
                return;
            }
    
            const response = await axios.delete(
                'https://api.themoviedb.org/3/authentication/session',
                {
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
                    },
                    data: { session_id: sessionId },
                }
            );
    
            console.log('Réponse API Logout:', response.data);
    
            await AsyncStorage.removeItem('session_id');
            setUser(null);
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error.response?.data || error.message);
        }
    };
    
    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
