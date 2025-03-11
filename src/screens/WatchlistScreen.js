import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { WatchlistContext } from '../context/WatchlistContext';
import { fetchMovieById } from '../services/tmdbApi';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';

const WatchlistScreen = () => {
    const { watchlist, toggleWatchlist } = useContext(WatchlistContext);

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            const fetchedMovies = await Promise.all(watchlist.map((movie) => fetchMovieById(movie.id)));
            setMovies(fetchedMovies.filter((movie) => movie !== null));
            setLoading(false);
        };

        if (watchlist.length > 0) {
            loadMovies();
        } else {
            setLoading(false);
        }
    }, [watchlist]);

    const confirmDelete = (movie) => {
        Alert.alert(
            "Supprimer ce film ?",
            `Voulez-vous vraiment retirer "${movie.title}" de votre watchlist ?`,
            [
                { text: "Annuler", style: "cancel" },
                { 
                    text: "Supprimer", 
                    onPress: () => {
                        toggleWatchlist(movie);
                        setMovies(prevMovies => prevMovies.filter(item => item.id !== movie.id));
                    },
                    style: "destructive" 
                }
            ]
        );
    };

    const renderRightActions = (progress, movie) => {
        const animatedStyle = useAnimatedStyle(() => {
            const opacity = interpolate(progress.value, [0, 1], [0, 1]);
            return { opacity };
        });
    
        return (
            <Animated.View style={[styles.deleteContainer, animatedStyle]}>
                <Text style={styles.deleteText} onPress={() => confirmDelete(movie)}>✖</Text>
            </Animated.View>
        );
    };
    
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
                <Text style={styles.emptyText}>Votre watchlist est vide.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <FlatList
                    data={movies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Swipeable 
                            renderRightActions={(progress) => renderRightActions(progress, item)}
                            overshootRight={false}
                        >
                            <View style={styles.itemContainer}>
                                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                                <View style={styles.infoContainer}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.actors}>🎭 {item.actors}</Text>
                                    <Text style={styles.genres}>🏷 {item.genres.join(', ')}</Text>
                                    <Text style={styles.rating}>⭐ {item.rating}/10</Text>
                                </View>
                            </View>
                        </Swipeable>
                    )}
                />
            </GestureHandlerRootView>
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
    deleteContainer: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '100%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        opacity: 0,
    },
    
    deleteText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    safeContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default WatchlistScreen;
