import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';

export default function CategoriesScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Categories Screen</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background.default,
    },
    text: {
        color: Colors.text.dark,
        fontSize: 18,
    },
});
