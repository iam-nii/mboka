import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/Colors';
import { clearSession } from '../../utils/auth';

export default function AccountScreen() {
    const router = useRouter();

    const handleLogout = async () => {
        await clearSession();
        router.replace('/');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Account Screen</Text>
            <Button title="Logout" onPress={handleLogout} style={styles.logoutButton} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background.default,
        padding: 20,
    },
    text: {
        color: Colors.text.dark,
        fontSize: 18,
        marginBottom: 20,
    },
    logoutButton: {
        width: '100%',
        backgroundColor: '#F44336',
    },
});
