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

export default function ResetPasswordScreen() {
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
                            />
                        </View>

                        <View style={styles.strengthContainer}>
                            <View style={[styles.strengthBar, styles.strengthWeak]} />
                            <View style={styles.strengthBar} />
                            <View style={styles.strengthBar} />
                            <View style={styles.strengthBar} />
                            <Text style={styles.strengthText}>Weak</Text>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Confirm New Password</Text>
                            <Input
                                placeholder="Confirm your new password"
                                isPassword
                            />
                        </View>

                        <View style={styles.requirementsContainer}>
                            <View style={styles.requirementItem}>
                                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                                <Text style={styles.requirementText}>Must be at least 8 characters</Text>
                            </View>
                            <View style={styles.requirementItem}>
                                <Ionicons name="close-circle" size={16} color="#F44336" />
                                <Text style={styles.requirementText}>Include a number and a symbol</Text>
                            </View>
                        </View>

                        <Button
                            title="Save New Password"
                            onPress={() => router.dismissAll()}
                            style={styles.saveButton}
                        />
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
    },
    strengthBar: {
        flex: 1,
        height: 4,
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
    },
    strengthWeak: {
        backgroundColor: '#F44336',
    },
    strengthText: {
        fontSize: Typography.size.xs,
        color: '#F44336',
        marginLeft: 8,
        fontWeight: 'bold',
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
    saveButton: {
        marginTop: 8,
        backgroundColor: '#F5CBA7', // Lighter orange/peach color from design
    },
});
