import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '../constants/Colors';

interface SocialButtonProps {
    type: 'google' | 'facebook' | 'apple';
    onPress: () => void;
    style?: ViewStyle;
}

export const SocialButton: React.FC<SocialButtonProps> = ({ type, onPress, style }) => {
    const getIcon = () => {
        switch (type) {
            case 'google':
                return <Ionicons name="logo-google" size={24} color="#DB4437" />;
            case 'facebook':
                return <Ionicons name="logo-facebook" size={24} color="#4267B2" />;
            case 'apple':
                return <Ionicons name="logo-apple" size={24} color="#000000" />;
        }
    };

    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            {getIcon()}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.background.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
        marginHorizontal: 10,
    },
});
