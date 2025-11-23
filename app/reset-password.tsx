import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, LayoutAnimation, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { updatePassword } from '../utils/database';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

export default function ResetPasswordScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const email = params.email as string || 'test@example.com'; // Fallback for demo

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [strength, setStrength] = useState(0);
    const [requirements, setRequirements] = useState({
        length: false,
        numberAndSymbol: false,
    });

    useEffect(() => {
        validatePassword(password);
    }, [password]);

    const validatePassword = (pass: string) => {
        const lengthValid = pass.length >= 8;
        const hasNumber = /\d/.test(pass);
        // Broader regex for symbols including common ones like - _ + =
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>[\]\\\/~_\-+=;']/.test(pass);
        const numberAndSymbolValid = hasNumber && hasSymbol;

        setRequirements({
            length: lengthValid,
            numberAndSymbol: numberAndSymbolValid,
        });

        let score = 0;
        if (lengthValid) score++;
        if (hasNumber) score++;
        if (hasSymbol) score++;
        if (pass.length >= 12) score++;

        // Normalize score to 0-4 for bars
        // Base score logic can be adjusted. 
        // Let's map it simply:
        // 0: Empty
        // 1: Weak (Length < 8 or missing others)
        // 2: Fair
        // 3: Good
        // 4: Strong

        let calculatedStrength = 0;
        if (pass.length > 0) {
            if (lengthValid && numberAndSymbolValid) {
                calculatedStrength = 4;
            } else if (lengthValid && (hasNumber || hasSymbol)) {
                calculatedStrength = 3;
            } else if (lengthValid) {
                calculatedStrength = 2;
            } else {
                calculatedStrength = 1;
            }
        }

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setStrength(calculatedStrength);
    };

    const handleSavePassword = async () => {
        setLoading(true);
        const success = await updatePassword(email, password);
        setLoading(false);

        if (success) {
            Alert.alert('Success', 'Password updated successfully!', [
                { text: 'OK', onPress: () => router.dismissAll() }
            ]);
        } else {
            Alert.alert('Error', 'Failed to update password. User not found.');
        }
    };

    const getStrengthColor = () => {
        switch (strength) {
            case 1: return '#F44336'; // Red
            case 2: return '#FF9800'; // Orange
            case 3: return '#FFC107'; // Amber
            case 4: return '#4CAF50'; // Green
            default: return '#E0E0E0';
        }
    };

    const getStrengthLabel = () => {
        switch (strength) {
            case 1: return 'Weak';
            case 2: return 'Fair';
            case 3: return 'Good';
            case 4: return 'Strong';
            default: return '';
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color={Colors.text.dark} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Set New Password</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    <View style={styles.container}>
                        <View style={styles.iconContainer}>
                            <View style={styles.iconCircle}>
                                <Ionicons name="lock-closed" size={48} color={Colors.primary} />
                            </View>
                        </View>

                        <Text style={styles.title}>Create New Password</Text>
                        <Text style={styles.subtitle}>
                            Your new password must be different from previously used passwords.
                        </Text>

                        <View style={styles.formContainer}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>New Password</Text>
                                <Input
                                    placeholder="Enter your new password"
                                    isPassword
                                    value={password}
                                    onChangeText={setPassword}
                                />
                            </View>

                            <View style={styles.strengthContainer}>
                                {[1, 2, 3, 4].map((index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.strengthBar,
                                            {
                                                backgroundColor: index <= strength ? getStrengthColor() : '#E0E0E0',
                                                opacity: index <= strength ? 1 : 0.3
                                            }
                                        ]}
                                    />
                                ))}
                                <Text style={[styles.strengthText, { color: getStrengthColor() }]}>
                                    {getStrengthLabel()}
                                </Text>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Confirm New Password</Text>
                                <Input
                                    placeholder="Confirm your new password"
                                    isPassword
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    error={confirmPassword && password !== confirmPassword ? "Passwords do not match" : undefined}
                                />
                            </View>

                            <View style={styles.requirementsContainer}>
                                <View style={styles.requirementItem}>
                                    <Ionicons
                                        name={requirements.length ? "checkmark-circle" : "ellipse-outline"}
                                        size={16}
                                        color={requirements.length ? "#4CAF50" : Colors.text.light}
                                    />
                                    <Text style={[
                                        styles.requirementText,
                                        requirements.length && styles.requirementTextMet
                                    ]}>Must be at least 8 characters</Text>
                                </View>
                                <View style={styles.requirementItem}>
                                    <Ionicons
                                        name={requirements.numberAndSymbol ? "checkmark-circle" : "ellipse-outline"}
                                        size={16}
                                        color={requirements.numberAndSymbol ? "#4CAF50" : Colors.text.light}
                                    />
                                    <Text style={[
                                        styles.requirementText,
                                        requirements.numberAndSymbol && styles.requirementTextMet
                                    ]}>Include a number and a symbol</Text>
                                </View>
                            </View>

                            <Button
                                title="Save New Password"
                                onPress={handleSavePassword}
                                style={styles.saveButton}
                                disabled={strength < 4 || password !== confirmPassword || !password}
                                loading={loading}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background.default,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: Typography.size.lg,
        fontWeight: Typography.weight.bold as any,
        color: Colors.text.dark,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 32,
        marginTop: 20,
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFF0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: Typography.size.xl,
        fontWeight: Typography.weight.bold as any,
        color: Colors.text.dark,
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: Typography.size.md,
        color: Colors.text.light,
        marginBottom: 32,
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 22,
    },
    formContainer: {
        width: '100%',
        marginBottom: 24,
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: Typography.size.sm,
        fontWeight: Typography.weight.medium as any,
        color: Colors.text.dark,
        marginBottom: 8,
    },
    strengthContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        gap: 8,
        height: 20, // Fixed height to prevent layout shift
    },
    strengthBar: {
        flex: 1,
        height: 4,
        borderRadius: 2,
    },
    strengthText: {
        fontSize: Typography.size.xs,
        marginLeft: 8,
        fontWeight: 'bold',
        width: 50, // Fixed width for text
    },
    requirementsContainer: {
        marginBottom: 32,
    },
    requirementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    requirementText: {
        fontSize: Typography.size.sm,
        color: Colors.text.light,
    },
    requirementTextMet: {
        color: Colors.text.dark,
    },
    saveButton: {
        marginTop: 8,
    },
});
