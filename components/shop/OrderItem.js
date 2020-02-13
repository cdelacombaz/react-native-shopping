import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import CartItem from './CartItem';
import Colors from '../../constants/Colors';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);

    console.log('xxx', props);

    return (
        <View style={styles.itemContainer}>
            <View style={styles.summary}>
                <Text style={styles.amount}>${props.amount}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button
                title='Show details'
                color={Colors.primary}
                onPress={() => setShowDetails(prevState => !prevState)}
            />
            {showDetails && (
                <View>
                    {props.items.map(item => (
                        <CartItem quantity={item.quantity} title={item.title} amount={item.sum} />
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
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
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmoun: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: '#888'
    }
});

export default OrderItem;
