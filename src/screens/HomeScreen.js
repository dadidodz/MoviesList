import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TextInput } from 'react-native';
import { ActivityIndicator, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FavoriteButton from '../components/FavoriteButton';
import WatchlistButton from '../components/WatchlistButton';
import useMovies from '../hooks/useMovies';
const HomeScreen = () => {
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();
    const { movies, loading } = useMovies(searchText);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <TextInput
                style={styles.searchBar}
                placeholder="Rechercher un film..."
                placeholderTextColor="#888"
                value={searchText}
                onChangeText={setSearchText}
            />
            <Text style={styles.titleTab}>Films populaires</Text>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.card} onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}>
                        <Image source={{ uri: item.imageUrl }} style={styles.image} />
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.actors}>Acteurs : {item.actors}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                            <View style={styles.buttonContainer}>
                                <FavoriteButton movie={item} />
                                <WatchlistButton movie={item} />
                            </View>
                        </View>
                    </Card>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 250,
    },
    cardContent: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    titleTab: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingTop : 10,
        paddingBottom: 10,
    },
    actors: {
        fontSize: 14,
        color: 'gray',
        marginVertical: 5,
    },
    description: {
        fontSize: 14,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    safeContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchBar: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: '#000',
    },
});

export default HomeScreen;
