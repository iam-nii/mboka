import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

const { width } = Dimensions.get('window');

const FAVORITES = [
    { id: '1', name: 'Woven Basket', region: 'Luzon Region', price: 25.00, image: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=400&q=80' },
    { id: '2', name: 'Ceramic Vase', region: 'Visayas Region', price: 40.00, image: 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=400&q=80' },
    { id: '3', name: 'Beaded Necklace', region: 'Mindanao Region', price: 60.00, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80' },
    { id: '4', name: 'Embroidered Pillow', region: 'Luzon Region', price: 35.00, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=400&q=80' },
];

export default function FavoritesScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color={Colors.text.dark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Favorites</Text>
                <TouchableOpacity style={styles.cartButton}>
                    <Ionicons name="cart-outline" size={24} color={Colors.text.dark} />
                    <View style={styles.cartBadge}>
                        <Text style={styles.cartBadgeText}>2</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.grid}>
                    {FAVORITES.map((item) => (
                        <View key={item.id} style={styles.card}>
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <TouchableOpacity style={styles.favoriteButton}>
                                    <Ionicons name="heart" size={20} color={Colors.primary} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.cardContent}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemRegion}>{item.region}</Text>
                                <View style={styles.priceRow}>
                                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                                    <TouchableOpacity style={styles.addToCartButton}>
                                        <Ionicons name="cart-outline" size={20} color={Colors.primary} />
                                        <View style={styles.plusBadge}>
                                            <Ionicons name="add" size={10} color="#FFF" />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: Typography.size.lg,
        fontWeight: 'bold',
        color: Colors.text.dark,
    },
    cartButton: {
        position: 'relative',
        padding: 4,
    },
    cartBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: Colors.primary,
        borderRadius: 8,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartBadgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    scrollContainer: {
        padding: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: (width - 56) / 2,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    imageContainer: {
        position: 'relative',
        height: 140,
        backgroundColor: '#F0F0F0',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    favoriteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    cardContent: {
        padding: 12,
    },
    itemName: {
        fontSize: Typography.size.md,
        fontWeight: '600',
        color: Colors.text.dark,
        marginBottom: 4,
    },
    itemRegion: {
        fontSize: Typography.size.xs,
        color: Colors.text.light,
        marginBottom: 8,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemPrice: {
        fontSize: Typography.size.md,
        fontWeight: 'bold',
        color: Colors.text.dark,
    },
    addToCartButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFF0E0',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    plusBadge: {
        position: 'absolute',
        top: 6,
        right: 6,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
