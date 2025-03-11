import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const { logout } = useContext(AuthContext);

    const options = [
        { id: '1', title: 'Mes Favoris', action: () => navigation.navigate('Favorites') },
        { id: '2', title: 'Se Déconnecter', action: () => logout() },
    ];

    return (
        <SafeAreaView style={styles.safeContainer}>
                <Text style={styles.header}>Mon Profil</Text>
                <FlatList
                    data={options}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.optionItem} onPress={item.action}>
                            <Text style={styles.optionText}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    optionItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    optionText: {
        fontSize: 18,
    },
    safeContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding : 20,
    },
});

export default ProfileScreen;
