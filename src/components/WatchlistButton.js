import React, { useContext } from 'react';
import { IconButton } from 'react-native-paper';
import { WatchlistContext } from '../context/WatchlistContext';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const WatchlistButton = ({ movie }) => {
    const { watchlist, toggleWatchlist } = useContext(WatchlistContext);
    const isInWatchlist = watchlist.some((item) => item.id === movie.id);
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePress = () => {
        scale.value = withSpring(1.2, { damping: 3 }, () => {
            scale.value = withSpring(1);
        });
        toggleWatchlist(movie);
    };

    return (
        <Animated.View style={animatedStyle}>
            <IconButton
                icon={isInWatchlist ? 'check' : 'playlist-plus'}
                iconColor={isInWatchlist ? 'blue' : 'gray'}
                onPress={handlePress}
            />
        </Animated.View>
    );
};

export default WatchlistButton;
