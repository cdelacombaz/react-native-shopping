import { ADD_ORDER } from '../types';
import Order from '../../models/order';

const initalState = {
    orders: []
};

export default (state = initalState, action) => {
    switch (action.type) {
        case ADD_ORDER: {
            const newOrder = new Order(
                new Date().toString(),
                action.payload.items,
                action.payload.amount,
                new Date()
            );
            return {
                ...state,
                orders: [...state.orders, newOrder]
            };
        }
        default:
            return state;
    }
};
