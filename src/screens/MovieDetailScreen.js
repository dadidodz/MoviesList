import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ActivityIndicator, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchMovieDetails } from '../services/tmdbApi';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, useAnimatedScrollHandler } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import FavoriteButton from '../components/FavoriteButton';
import WatchlistButton from '../components/WatchlistButton';

const MAX_IMAGE_HEIGHT = 500;
const MIN_IMAGE_HEIGHT = 175;

const MovieDetailScreen = ({ route }) => {
    const { movieId } = route.params;
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();


    const scrollY = useSharedValue(0);

    useEffect(() => {
        const loadMovieDetails = async () => {
            const data = await fetchMovieDetails(movieId);
            setMovie(data);
            setLoading(false);
        };
        loadMovieDetails();
    }, [movieId]);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    const imageAnimatedStyle = useAnimatedStyle(() => {
        const height = interpolate(scrollY.value, [0, 400], [MAX_IMAGE_HEIGHT, MIN_IMAGE_HEIGHT], 'clamp');
        return { height };
    });

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.backButtonContainer}>
                <IconButton icon="arrow-left" size={24} onPress={() => navigation.goBack()} />
            </View>
            <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>
                <Animated.Image source={{ uri: movie.imageUrl }} style={[styles.image, imageAnimatedStyle]} />
                <View style={styles.content}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <View style={styles.actionButtons}>
                        <FavoriteButton movie={movie} />
                        <WatchlistButton movie={movie} />
                    </View>
                    <Text style={styles.rating}>⭐ {movie.rating}/10</Text>
                    <FlatList
                        data={movie.genres}
                        horizontal
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => <Chip style={styles.chip}>{item}</Chip>}
                    />
                    <Text style={styles.sectionTitle}>Synopsis</Text>
                    <Text style={styles.description}>{movie.description}</Text>
                    <Text style={styles.sectionTitle}>Acteurs principaux</Text>
                    <Text style={styles.actors}>{movie.actors}</Text>
                    <Text style={styles.sectionTitle}>Films recommandés</Text>
                    <FlatList
                        data={movie.recommendations}
                        horizontal
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigation.push('MovieDetail', { movieId: item.id })}>
                                <View style={styles.recommendation}>
                                    <Image source={{ uri: item.imageUrl }} style={styles.recommendationImage} />
                                    <Text style={styles.recommendationTitle}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Animated.ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
    },
    content: {
        padding: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    rating: {
        fontSize: 16,
        marginVertical: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
    },
    description: {
        fontSize: 14,
        marginVertical: 5,
    },
    actors: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
    },
    chip: {
        marginRight: 5,
        marginVertical: 5,
    },
    recommendation: {
        marginRight: 10,
        width: 120,
    },
    recommendationImage: {
        width: 120,
        height: 180,
        borderRadius: 5,
    },
    recommendationTitle: {
        fontSize: 12,
        textAlign: 'center',
    },
    backButtonContainer: {
        position: 'absolute',
        top: 40,
        left: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 30,
        padding: 5,
        zIndex: 10,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    
    
});

export default MovieDetailScreen;
