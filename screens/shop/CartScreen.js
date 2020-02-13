import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';
import { removeFromCart } from '../../store/actions/cartActions';
import { addOrder } from '../../store/actions/ordersActions';

const CartScreen = () => {
    const cartTotalAmount = useSelector(state => state.cart.sum).toFixed(2);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => {
        const cartItemsArray = [];
        for (const key in state.cart.items) {
            cartItemsArray.push({
                id: key,
                title: state.cart.items[key].productTitle,
                price: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return cartItemsArray.sort((a, b) => (a.productId > b.productId ? 1 : -1));
    });

    return (
        <View style={styles.screenContainer}>
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.summaryAmount}>${cartTotalAmount}</Text>
                </Text>
                <Button
                    color={Colors.accent}
                    title='Order Now'
                    disabled={cartItems.length === 0}
                    onPress={() => {
                        dispatch(addOrder(cartItems, cartTotalAmount));
                    }}
                />
            </View>
            <View>
                <FlatList
                    data={cartItems}
                    renderItem={itemData => (
                        <CartItem
                            quantity={itemData.item.quantity}
                            title={itemData.item.title}
                            amount={itemData.item.sum}
                            onRemove={() => dispatch(removeFromCart(itemData.item.id))}
                        />
                    )}
                />
            </View>
        </View>
    );
};

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
};

const styles = StyleSheet.create({
    screenContainer: {
        margin: 20
    },
    summaryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        // shadow only for IOS
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        // elevation for android
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    summaryAmount: {
        color: Colors.primary
    }
});

export default CartScreen;
