import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';

import Colors from '../../constants/Colors';

const ProductItem = props => {
    let CustomTouchable = TouchableOpacity;

    // TouchableOpacity is ugly on Android. From version 21 onwards we can use a ripple effect
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        CustomTouchable = TouchableNativeFeedback;
    }

    return (
        <View style={styles.productContainer}>
            {/* useForeground is set in order to have the ripple effect also on the image / on all components */}
            <CustomTouchable onPress={props.onViewDetail} useForeground>
                <View>
                    <Image style={styles.image} source={{ uri: props.image }} />
                    <View style={styles.detail}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.actions}>
                        <Button
                            title='View Details'
                            color={Colors.primary}
                            onPress={props.onViewDetail}
                        />
                        <Button
                            title='To Cart'
                            color={Colors.primary}
                            onPress={props.onAddToCart}
                        />
                    </View>
                </View>
            </CustomTouchable>
        </View>
    );
};

const styles = StyleSheet.create({
    productContainer: {
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
        height: 300,
        margin: 20,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '60%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 2,
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 25
    },
    detail: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    }
});

export default ProductItem;
