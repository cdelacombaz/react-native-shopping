import { ADD_TO_CART, REMOVE_FROM_CART, ADD_ORDER } from '../types';
import CartItem from '../../models/cartItem';

const initialState = {
    items: {},
    sum: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const product = action.payload;
            let newOrUpdatedItem;
            if (state.items[product.id]) {
                newOrUpdatedItem = new CartItem(
                    state.items[product.id].quantity + 1,
                    product.price,
                    product.title,
                    state.items[product.id].sum + product.price
                );
            } else {
                newOrUpdatedItem = new CartItem(1, product.price, product.title, product.price);
            }
            return {
                ...state,
                items: { ...state.items, [product.id]: newOrUpdatedItem },
                sum: state.sum + product.price
            };
        }
        case REMOVE_FROM_CART: {
            const id = action.payload;
            const selectedItem = state.items[id];
            let updatedCartItems = { ...state.items };
            if (selectedItem.quantity === 1) {
                delete updatedCartItems[id];
            } else {
                const newItem = new CartItem(
                    selectedItem.quantity - 1,
                    selectedItem.productPrice,
                    selectedItem.productTitle,
                    selectedItem.sum - selectedItem.productPrice
                );
                updatedCartItems[id] = newItem;
            }
            return {
                ...state,
                items: updatedCartItems,
                sum: state.sum - selectedItem.productPrice
            };
        }
        case ADD_ORDER: {
            return initialState;
        }
        default:
            return state;
    }
};
