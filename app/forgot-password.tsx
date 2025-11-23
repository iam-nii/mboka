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

export default function ForgotPasswordScreen() {
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
                    <Text style={styles.headerTitle}>Forgot Password</Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.container}>
                    <View style={styles.iconContainer}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="refresh" size={48} color={Colors.primary} />
                        </View>
                    </View>

                    <Text style={styles.title}>Reset your password</Text>
                    <Text style={styles.subtitle}>
                        Enter your email address and we'll send you a link to reset your password.
                    </Text>

                    <View style={styles.formContainer}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Email Address</Text>
                            <Input
                                placeholder="you@example.com"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                icon="mail"
                            />
                        </View>

                        <Button
                            title="Send Reset Link"
                            onPress={() => router.push('/verification')}
                            style={styles.sendButton}
                        />
                    </View>

                    <View style={styles.supportContainer}>
                        <Text style={styles.supportText}>Need help? </Text>
                        <TouchableOpacity>
                            <Text style={styles.supportLink}>Contact Support</Text>
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
        backgroundColor: '#FFF0E0', // Light orange background
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
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: Typography.size.sm,
        fontWeight: Typography.weight.medium as any,
        color: Colors.text.dark,
        marginBottom: 8,
    },
    sendButton: {
        marginTop: 8,
        backgroundColor: '#E07A5F', // Slightly different shade as per design or stick to primary
    },
    supportContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 20,
    },
    supportText: {
        color: Colors.text.light,
        fontSize: Typography.size.sm,
    },
    supportLink: {
        color: '#E07A5F', // Match button color or primary
        fontSize: Typography.size.sm,
        fontWeight: Typography.weight.medium as any,
        textDecorationLine: 'underline',
    },
});
