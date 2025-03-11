import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Dialog, Portal } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);

    const handleLogin = async () => {
        const errorMessage = await login(username, password);
        if (errorMessage) {
            setError(errorMessage); 
            setVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineLarge" style={styles.title}>
                Connexion TMDB
            </Text>

            <TextInput
                label="Nom d'utilisateur"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                mode="outlined"
            />

            <TextInput
                label="Mot de passe"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                mode="outlined"
            />

            <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.button}
            >
                Se connecter
            </Button>

            <Portal>
                <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                    <Dialog.Title>Erreur</Dialog.Title>
                    <Dialog.Content>
                        <Text>{error}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setVisible(false)}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        textAlign: 'center',
        marginBottom: 40,
    },
    input: {
        marginBottom: 20,
    },
    button: {
        marginTop: 10,
        paddingVertical: 5,
    },
});

export default LoginScreen;
