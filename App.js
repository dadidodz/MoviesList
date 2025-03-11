import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { WatchlistProvider } from './src/context/WatchlistContext';
import { FavoritesProvider } from './src/context/FavoritesContext';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider>
                <AuthProvider>
                    <FavoritesProvider>
                        <WatchlistProvider>
                            <AppNavigator />
                        </WatchlistProvider>
                    </FavoritesProvider>
                </AuthProvider>
            </PaperProvider>
        </GestureHandlerRootView>
    );
}
