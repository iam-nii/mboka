import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = 'user_session';

export const setSession = async (email: string) => {
    try {
        await AsyncStorage.setItem(SESSION_KEY, email);
    } catch (error) {
        console.error('Error setting session:', error);
    }
};

export const getSession = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(SESSION_KEY);
    } catch (error) {
        console.error('Error getting session:', error);
        return null;
    }
};

export const clearSession = async () => {
    try {
        await AsyncStorage.removeItem(SESSION_KEY);
    } catch (error) {
        console.error('Error clearing session:', error);
    }
};
