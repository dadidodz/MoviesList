import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WatchlistScreen from '../screens/WatchlistScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Accueil') iconName = 'home';
                    else if (route.name === 'Watchlist') iconName = 'favorite';
                    else if (route.name === 'Profil') iconName = 'person';

                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Accueil" component={HomeScreen} />

            <Tab.Screen 
                name="Watchlist" 
                component={WatchlistScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="playlist-play" size={size} color={color} />,
                }} 
            />

            <Tab.Screen name="Profil" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
