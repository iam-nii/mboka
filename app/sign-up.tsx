import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';

export default function SignUpScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={Colors.text.dark} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Create Account</Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.container}>
                    <Text style={styles.title}>Join Mboka</Text>
                    <Text style={styles.subtitle}>Enter your details below to create your account.</Text>

                    <View style={styles.formContainer}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Full Name</Text>
                            <Input
                                placeholder="Enter your full name"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Email Address</Text>
                            <Input
                                placeholder="Enter your email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <Input
                                placeholder="Enter your password"
                                isPassword
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Confirm Password</Text>
                            <Input
                                placeholder="Confirm your password"
                                isPassword
                            />
                        </View>

                        <Text style={styles.termsText}>
                            By signing up, you agree to our <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>.
                        </Text>

                        <Button title="Sign Up" onPress={() => { }} style={styles.signUpButton} />
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
    },
    title: {
        fontSize: Typography.size.xxl,
        fontWeight: Typography.weight.bold as any,
        color: Colors.text.dark,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: Typography.size.md,
        color: Colors.text.light,
        marginBottom: 32,
    },
    formContainer: {
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
    termsText: {
        fontSize: Typography.size.xs,
        color: Colors.text.light,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },
    linkText: {
        color: Colors.primary,
        fontWeight: Typography.weight.medium as any,
    },
    signUpButton: {
        marginTop: 8,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 20,
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
