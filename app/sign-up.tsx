import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { SocialButton } from '../components/SocialButton';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { setSession } from '../utils/auth';
import { createUser } from '../utils/database';

export default function SignUpScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        if (!email || !username || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        const success = await createUser(email, username, password);
        setLoading(false);

        if (success) {
            await setSession(email);
            Alert.alert('Success', 'Account created successfully!', [
                { text: 'OK', onPress: () => router.replace('/(tabs)') }
            ]);
        } else {
            Alert.alert('Error', 'Failed to create account. Email or username might already be taken.');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={Colors.text.dark} />
                    </TouchableOpacity>
                </View>

                <View style={styles.container}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Sign up to get started!</Text>

                    <View style={styles.formContainer}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Email Address</Text>
                            <Input
                                placeholder="Enter your email"
                                icon="mail"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Username</Text>
                            <Input
                                placeholder="Enter your username"
                                icon="person"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <Input
                                placeholder="Enter your password"
                                icon="lock-closed"
                                isPassword
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <Button
                            title="Sign Up"
                            onPress={handleSignUp}
                            style={styles.signUpButton}
                            loading={loading}
                        />
                    </View>

                    <View style={styles.dividerContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.dividerText}>Or sign up with</Text>
                        <View style={styles.divider} />
                    </View>

                    <View style={styles.socialContainer}>
                        <SocialButton type="google" onPress={() => { }} />
                        <SocialButton type="facebook" onPress={() => { }} />
                        <SocialButton type="apple" onPress={() => { }} />
                    </View>

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.loginLink}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
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
        marginBottom: 20,
    },
    backButton: {
        padding: 4,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: Typography.size.xxl,
        fontWeight: Typography.weight.bold as any,
        color: Colors.text.dark,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: Typography.size.md,
        color: Colors.text.light,
        marginBottom: 32,
        textAlign: 'center',
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
    signUpButton: {
        marginTop: 8,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.border,
    },
    dividerText: {
        marginHorizontal: 16,
        color: Colors.text.light,
        fontSize: Typography.size.sm,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 32,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginText: {
        color: Colors.text.light,
        fontSize: Typography.size.md,
    },
    loginLink: {
        color: Colors.primary,
        fontSize: Typography.size.md,
        fontWeight: Typography.weight.bold as any,
    },
});
