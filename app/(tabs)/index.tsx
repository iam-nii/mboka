import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

const { width } = Dimensions.get('window');

const CATEGORIES = [
    { id: '1', name: 'Handicrafts', icon: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=100&q=80' },
    { id: '2', name: 'Fashion', icon: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=100&q=80' },
    { id: '3', name: 'Food', icon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&q=80' },
    { id: '4', name: 'Art', icon: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=100&q=80' },
    { id: '5', name: 'Home', icon: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=100&q=80' },
];

const PRODUCTS = [
    { id: '1', name: 'Woven Tote Bag', region: 'Oaxaca Region', price: 45.00, rating: 4.8, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80' },
    { id: '2', name: 'Terracotta Vase', region: 'Puebla Region', price: 29.99, rating: 4.9, image: 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=400&q=80' },
    { id: '3', name: 'Artisanal Honey', region: 'Veracruz Highlands', price: 12.50, rating: 4.7, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80' },
    { id: '4', name: 'Handmade Sandals', region: 'Jalisco Artisans', price: 55.00, rating: 5.0, image: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=400&q=80' },
];

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar style="dark" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.userInfo}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80' }}
                            style={styles.avatar}
                        />
                        <Text style={styles.userName}>Mbako</Text>
                    </View>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Ionicons name="notifications" size={24} color={Colors.text.dark} />
                        <View style={styles.notificationBadge} />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={Colors.text.light} style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search for products or regions..."
                        placeholderTextColor={Colors.text.light}
                        style={styles.searchInput}
                    />
                </View>

                {/* Filters */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
                    <TouchableOpacity style={styles.filterButton}>
                        <Ionicons name="options-outline" size={20} color={Colors.text.dark} />
                        <Text style={styles.filterText}>Filters</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterChip}>
                        <Text style={styles.filterChipText}>Price</Text>
                        <Ionicons name="chevron-down" size={16} color={Colors.text.dark} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterChip}>
                        <Text style={styles.filterChipText}>Product Type</Text>
                        <Ionicons name="chevron-down" size={16} color={Colors.text.dark} />
                    </TouchableOpacity>
                </ScrollView>

                {/* Categories */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                    {CATEGORIES.map((category) => (
                        <TouchableOpacity key={category.id} style={styles.categoryItem}>
                            <View style={styles.categoryIconContainer}>
                                <Image source={{ uri: category.icon }} style={styles.categoryImage} />
                            </View>
                            <Text style={styles.categoryName}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Banner */}
                <View style={styles.bannerContainer}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80' }}
                        style={styles.bannerImage}
                    />
                    <View style={styles.bannerOverlay}>
                        <Text style={styles.bannerSubtitle}>HANDMADE AND PRODUCED SAFE, FIT FOR WORK</Text>
                        <Text style={styles.bannerTitle}>Discover Local Artisans</Text>
                        <Text style={styles.bannerText}>Unique finds from across the regions</Text>
                    </View>
                </View>

                {/* Featured Products */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Featured Products</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.productsGrid}>
                    {PRODUCTS.map((product) => (
                        <TouchableOpacity key={product.id} style={styles.productCard}>
                            <Image source={{ uri: product.image }} style={styles.productImage} />
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>{product.name}</Text>
                                <Text style={styles.productRegion}>{product.region}</Text>
                                <View style={styles.productFooter}>
                                    <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                                    <View style={styles.ratingContainer}>
                                        <Ionicons name="star" size={14} color="#FFC107" />
                                        <Text style={styles.ratingText}>{product.rating}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
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
    scrollContainer: {
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E0E0E0',
    },
    userName: {
        fontSize: Typography.size.lg,
        fontWeight: 'bold',
        color: Colors.text.dark,
    },
    notificationButton: {
        position: 'relative',
        padding: 4,
    },
    notificationBadge: {
        position: 'absolute',
        top: 4,
        right: 6,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#F44336',
        borderWidth: 1,
        borderColor: '#F9F9F9',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        paddingHorizontal: 16,
        height: 48,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: Typography.size.md,
        color: Colors.text.dark,
    },
    filtersContainer: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 12,
        gap: 8,
    },
    filterText: {
        fontSize: Typography.size.sm,
        fontWeight: '600',
        color: Colors.text.dark,
    },
    filterChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 12,
        gap: 4,
    },
    filterChipText: {
        fontSize: Typography.size.sm,
        color: Colors.text.dark,
    },
    categoriesContainer: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: 20,
    },
    categoryIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FFFFFF',
        padding: 4,
        marginBottom: 8,
        borderWidth: 2,
        borderColor: Colors.primary, // Using primary color for border as seen in design
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryImage: {
        width: 52,
        height: 52,
        borderRadius: 26,
    },
    categoryName: {
        fontSize: Typography.size.xs,
        color: Colors.text.light,
    },
    bannerContainer: {
        marginHorizontal: 20,
        height: 180,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 24,
        position: 'relative',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
    },
    bannerOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.3)', // Dark overlay for text readability
    },
    bannerSubtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 4,
        letterSpacing: 1,
    },
    bannerTitle: {
        color: '#FFFFFF',
        fontSize: Typography.size.xl,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    bannerText: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: Typography.size.sm,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: Typography.size.lg,
        fontWeight: 'bold',
        color: Colors.text.dark,
    },
    seeAllText: {
        fontSize: Typography.size.sm,
        color: Colors.primary,
        fontWeight: '600',
    },
    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    productCard: {
        width: (width - 56) / 2, // 2 columns with padding and gap
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
    productImage: {
        width: '100%',
        height: 140,
        backgroundColor: '#F0F0F0',
    },
    productInfo: {
        padding: 12,
    },
    productName: {
        fontSize: Typography.size.md,
        fontWeight: '600',
        color: Colors.text.dark,
        marginBottom: 4,
    },
    productRegion: {
        fontSize: Typography.size.xs,
        color: Colors.text.light,
        marginBottom: 8,
    },
    productFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productPrice: {
        fontSize: Typography.size.md,
        fontWeight: 'bold',
        color: Colors.text.dark,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: Typography.size.xs,
        color: Colors.text.light,
        fontWeight: '600',
    },
});
