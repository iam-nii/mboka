import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { SocialButton } from '../components/SocialButton';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { getSession, setSession } from '../utils/auth';
import { verifyUser } from '../utils/database';

export default function LoginScreen() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const session = await getSession();
    if (session) {
      router.replace('/(tabs)');
    }
  };

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert('Error', 'Please enter your email/username and password');
      return;
    }

    setLoading(true);
    const success = await verifyUser(identifier, password);
    setLoading(false);

    if (success) {
      await setSession(identifier);
      router.replace('/(tabs)');
    } else {
      Alert.alert('Error', 'Invalid email/username or password');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Ionicons name="bag-handle" size={32} color={Colors.primary} />
            </View>
            <Text style={styles.logoText}>Mboka</Text>
          </View>

          {/* Welcome Text */}
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subtitleText}>Log in to your account to continue.</Text>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email or Username</Text>
              <Input
                placeholder="Enter your email or username"
                icon="person"
                value={identifier}
                onChangeText={setIdentifier}
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

            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={() => router.push('/forgot-password')}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              title="Login"
              onPress={handleLogin}
              style={styles.loginButton}
              loading={loading}
            />
          </View>

          {/* Social Login Section */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Or log in with</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialContainer}>
            <SocialButton type="google" onPress={() => { }} />
            <SocialButton type="facebook" onPress={() => { }} />
            <SocialButton type="apple" onPress={() => { }} />
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/sign-up')}>
              <Text style={styles.signUpLink}>Sign Up</Text>
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
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: Typography.size.xxl,
    fontWeight: Typography.weight.bold as any,
    color: Colors.text.dark,
  },
  welcomeText: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold as any,
    color: Colors.text.dark,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: Typography.size.md,
    color: Colors.text.light,
    marginBottom: 32,
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium as any,
  },
  loginButton: {
    marginTop: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
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
    gap: 16,
    marginBottom: 32,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    color: Colors.text.light,
    fontSize: Typography.size.md,
  },
  signUpLink: {
    color: Colors.primary,
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold as any,
  },
});
