import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';
import { fetchMovieById } from '../services/tmdbApi';
import { SafeAreaView } from 'react-native-safe-area-context';

const FavoritesScreen = () => {
    const { favorites } = useContext(FavoritesContext);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            const fetchedMovies = await Promise.all(favorites.map((movie) => fetchMovieById(movie.id)));
            setMovies(fetchedMovies.filter((movie) => movie !== null));
            setLoading(false);
        };

        if (favorites.length > 0) {
            loadMovies();
        } else {
            setLoading(false);
        }
    }, [favorites]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    if (movies.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Votre liste de favoris est vide.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image source={{ uri: item.imageUrl }} style={styles.image} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.actors}>🎭 {item.actors}</Text>
                            <Text style={styles.genres}>🏷 {item.genres.join(', ')}</Text>
                            <Text style={styles.rating}>⭐ {item.rating}/10</Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    image: {
        width: 80,
        height: 120,
        borderRadius: 5,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    actors: {
        fontSize: 14,
        color: 'gray',
    },
    genres: {
        fontSize: 14,
        color: '#555',
    },
    rating: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
    },
    safeContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default FavoritesScreen;
