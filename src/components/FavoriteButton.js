import React, { useContext } from 'react';
import { IconButton } from 'react-native-paper';
import { FavoritesContext } from '../context/FavoritesContext';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const FavoriteButton = ({ movie }) => {
    const { favorites, toggleFavorite } = useContext(FavoritesContext);
    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePress = () => {
        scale.value = withSpring(1.2, { damping: 3 }, () => {
            scale.value = withSpring(1);
        });
        toggleFavorite(movie);
    };

    return (
        <Animated.View style={animatedStyle}>
            <IconButton
                icon={isFavorite ? 'heart' : 'heart-outline'}
                iconColor={isFavorite ? 'red' : 'gray'}
                onPress={handlePress}
            />
        </Animated.View>
    );
};

export default FavoriteButton;
