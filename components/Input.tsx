import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';

interface InputProps extends Omit<TextInputProps, 'style'> {
    label?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    isPassword?: boolean;
    error?: string;
    style?: StyleProp<ViewStyle>;
}

export const Input: React.FC<InputProps> = ({
    label,
    icon,
    isPassword = false,
    error,
    style,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={[
                styles.inputContainer,
                isFocused && styles.focusedInput,
                !!error && styles.errorInput
            ]}>
                {icon && (
                    <Ionicons
                        name={icon}
                        size={20}
                        color={Colors.text.light}
                        style={styles.icon}
                    />
                )}

                <TextInput
                    style={styles.input}
                    placeholderTextColor={Colors.text.light}
                    secureTextEntry={isPassword && !showPassword}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />

                {isPassword && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}
                    >
                        <Ionicons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={20}
                            color={Colors.text.light}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        width: '100%',
    },
    label: {
        fontSize: Typography.size.sm,
        fontWeight: Typography.weight.medium as any,
        color: Colors.text.dark,
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.input.background,
        borderWidth: 1,
        borderColor: Colors.input.border,
        borderRadius: 8,
        height: 50,
        paddingHorizontal: 12,
    },
    focusedInput: {
        borderColor: Colors.primary,
    },
    errorInput: {
        borderColor: 'red',
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: Typography.size.md,
        color: Colors.text.dark,
        height: '100%',
    },
    eyeIcon: {
        padding: 4,
    },
    errorText: {
        color: 'red',
        fontSize: Typography.size.xs,
        marginTop: 4,
    },
});
