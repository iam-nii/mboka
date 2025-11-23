import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    loading?: boolean;
    variant?: 'primary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({
    title,
    loading = false,
    variant = 'primary',
    style,
    disabled,
    ...props
}) => {
    const isPrimary = variant === 'primary';

    return (
        <TouchableOpacity
            style={[
                styles.container,
                isPrimary ? styles.primaryContainer : styles.outlineContainer,
                disabled && styles.disabledContainer,
                style
            ]}
            disabled={disabled || loading}
            activeOpacity={0.8}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={isPrimary ? Colors.text.white : Colors.primary} />
            ) : (
                <Text style={[
                    styles.text,
                    isPrimary ? styles.primaryText : styles.outlineText
                ]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    primaryContainer: {
        backgroundColor: Colors.primary,
    },
    outlineContainer: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    disabledContainer: {
        opacity: 0.6,
    },
    text: {
        fontSize: Typography.size.md,
        fontWeight: Typography.weight.bold as any,
    },
    primaryText: {
        color: Colors.text.white,
    },
    outlineText: {
        color: Colors.primary,
    },
});
