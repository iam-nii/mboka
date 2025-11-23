import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';

export default function VerificationScreen() {
    const router = useRouter();
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputs = useRef<Array<TextInput | null>>([]);

    const handleCodeChange = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            inputs.current[index - 1]?.focus();
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
                    <Text style={styles.headerTitle}>Verification</Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.container}>
                    <Text style={styles.title}>Enter Code</Text>
                    <Text style={styles.subtitle}>
                        Enter the 6-digit code we sent to your email.
                    </Text>

                    <View style={styles.codeContainer}>
                        {code.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => { inputs.current[index] = ref; }}
                                style={[
                                    styles.codeInput,
                                    digit ? styles.filledCodeInput : null
                                ]}
                                value={digit}
                                onChangeText={(text) => handleCodeChange(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                keyboardType="number-pad"
                                maxLength={1}
                                selectTextOnFocus
                            />
                        ))}
                    </View>

                    <View style={styles.resendContainer}>
                        <Text style={styles.resendText}>Didn't receive a code? </Text>
                        <TouchableOpacity>
                            <Text style={styles.resendLink}>Resend</Text>
                        </TouchableOpacity>
                    </View>

                    <Button
                        title="Verify & Proceed"
                        onPress={() => router.push('/reset-password')}
                        style={styles.verifyButton}
                    />
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
        paddingTop: 40,
    },
    title: {
        fontSize: Typography.size.xxl,
        fontWeight: Typography.weight.bold as any,
        color: Colors.text.dark,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: Typography.size.md,
        color: Colors.text.light,
        marginBottom: 40,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 40,
    },
    codeInput: {
        width: 45,
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: '#E0E0E0',
        textAlign: 'center',
        fontSize: 24,
        color: Colors.text.dark,
        fontWeight: 'bold',
    },
    filledCodeInput: {
        borderBottomColor: Colors.primary,
    },
    resendContainer: {
        flexDirection: 'row',
        marginBottom: 40,
    },
    resendText: {
        color: Colors.text.light,
        fontSize: Typography.size.sm,
    },
    resendLink: {
        color: Colors.primary,
        fontSize: Typography.size.sm,
        fontWeight: Typography.weight.bold as any,
    },
    verifyButton: {
        width: '100%',
        marginTop: 'auto',
        marginBottom: 20,
    },
});
