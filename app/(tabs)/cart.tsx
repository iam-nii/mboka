import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

const CART_ITEMS = [
    { id: '1', name: 'Handwoven Rattan Bag', store: 'Bali Craft Emporium', price: 45.00, quantity: 1, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=200&q=80' },
    { id: '2', name: 'Batik Silk Scarf', store: 'Java Textiles', price: 25.00, quantity: 2, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=200&q=80' },
];

export default function CartScreen() {
    const router = useRouter();
    const [promoCode, setPromoCode] = useState('');

    const subtotal = 95.00;
    const shipping = 5.00;
    const total = 100.00;

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.text.dark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Cart</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Cart Items */}
                {CART_ITEMS.map((item) => (
                    <View key={item.id} style={styles.cartItem}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <View style={styles.itemDetails}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <TouchableOpacity>
                                    <Ionicons name="trash-outline" size={18} color={Colors.text.light} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.itemStore}>From: {item.store}</Text>
                            <View style={styles.itemFooter}>
                                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity style={styles.quantityButton}>
                                        <Text style={styles.quantityButtonText}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.quantityText}>{item.quantity}</Text>
                                    <TouchableOpacity style={[styles.quantityButton, styles.quantityButtonActive]}>
                                        <Text style={[styles.quantityButtonText, styles.quantityButtonTextActive]}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}

                {/* Promo Code */}
                <View style={styles.promoContainer}>
                    <TextInput
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChangeText={setPromoCode}
                        style={styles.promoInput}
                    />
                    <TouchableOpacity style={styles.applyButton}>
                        <Text style={styles.applyButtonText}>Apply</Text>
                    </TouchableOpacity>
                </View>

                {/* Summary */}
                <View style={styles.summaryContainer}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal</Text>
                        <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Shipping</Text>
                        <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.summaryRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <View>
                    <Text style={styles.footerLabel}>Total Price</Text>
                    <Text style={styles.footerPrice}>${total.toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                    <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
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
    scrollContainer: {
        padding: 20,
        paddingBottom: 100, // Space for footer
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#F0F0F0',
    },
    itemDetails: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'space-between',
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    itemName: {
        fontSize: Typography.size.sm,
        fontWeight: '600',
        color: Colors.text.dark,
        flex: 1,
        marginRight: 8,
    },
    itemStore: {
        fontSize: Typography.size.xs,
        color: Colors.text.light,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemPrice: {
        fontSize: Typography.size.md,
        fontWeight: 'bold',
        color: Colors.text.dark,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    quantityButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonActive: {
        backgroundColor: Colors.primary,
    },
    quantityButtonText: {
        fontSize: 16,
        color: Colors.text.dark,
        lineHeight: 18,
    },
    quantityButtonTextActive: {
        color: '#FFFFFF',
    },
    quantityText: {
        fontSize: Typography.size.sm,
        fontWeight: '600',
        color: Colors.text.dark,
    },
    promoContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 8,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    promoInput: {
        flex: 1,
        paddingHorizontal: 12,
        fontSize: Typography.size.sm,
        color: Colors.text.dark,
    },
    applyButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    applyButtonText: {
        color: '#FFFFFF',
        fontSize: Typography.size.sm,
        fontWeight: '600',
    },
    summaryContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: Typography.size.md,
        color: Colors.text.light,
    },
    summaryValue: {
        fontSize: Typography.size.md,
        color: Colors.text.dark,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 12,
    },
    totalLabel: {
        fontSize: Typography.size.lg,
        fontWeight: 'bold',
        color: Colors.text.dark,
    },
    totalValue: {
        fontSize: Typography.size.lg,
        fontWeight: 'bold',
        color: Colors.text.dark,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        padding: 20,
        paddingBottom: 34,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    footerLabel: {
        fontSize: Typography.size.xs,
        color: Colors.text.light,
        marginBottom: 4,
    },
    footerPrice: {
        fontSize: Typography.size.xl,
        fontWeight: 'bold',
        color: Colors.text.dark,
    },
    checkoutButton: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
        gap: 8,
    },
    checkoutButtonText: {
        color: '#FFFFFF',
        fontSize: Typography.size.md,
        fontWeight: '600',
    },
});
