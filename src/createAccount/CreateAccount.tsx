import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

export function CreateAccount() {
    const navigation = useNavigation();
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpass, setConfirmpass] = useState('');
    const [error, setError] = useState('');

    const validatePassword = () => {
        if (password !== confirmpass) {
            setError('Les mots de passe ne correspondent pas');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async () => {
        if (!validatePassword()) return;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/register/', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ 
                    email: email.toLowerCase(),
                    username: nom,
                    password,
                    password2: confirmpass  
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.detail || "Échec de l'inscription");
            }

            Alert.alert('Succès', 'Compte créé avec succès !');
            navigation.navigate('Login'); 

        } catch (error) {
            Alert.alert('Erreur', error.message || "Erreur lors de la création du compte");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Image
                    source={require('../assets/images/facture.png')}
                    style={styles.image}
                />
            </View>
            
            <View style={styles.container3}>
                <TextInput
                    style={styles.input}
                    placeholder="Nom"
                    placeholderTextColor="black"
                    value={nom}
                    onChangeText={setNom}
                    autoCapitalize="words"
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="black"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    placeholderTextColor="black"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Confirmer votre mot de passe"
                    placeholderTextColor="black"
                    value={confirmpass}
                    onChangeText={setConfirmpass}
                    secureTextEntry={true}
                    onBlur={validatePassword}
                />
                
                {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.finB}>Créer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.finA}>Annuler</Text>
            </TouchableOpacity>
        </View>
    );
}