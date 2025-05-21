import OrderCollection from '../db/models/Order.js';

export const placeOrder = (orderInfo) => OrderCollection.create(orderInfo);
