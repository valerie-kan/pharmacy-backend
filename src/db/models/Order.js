import { Schema, model } from 'mongoose';

import { handleSaveError } from './hooks.js';

const orderSchema = new Schema(
  {
    photo: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    products: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
    order_date: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

orderSchema.post('save', handleSaveError);

const OrderCollection = model('order', orderSchema);

export default OrderCollection;
