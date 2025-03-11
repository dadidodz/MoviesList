import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';
import { ActivityIndicator, View } from 'react-native';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    <>
                        <Stack.Screen name="Main" component={BottomTabNavigator} />
                        <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
                        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favoris' }} />
                    </>
                ) : (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
