import { Schema, model } from 'mongoose';

import { handleSaveError, setUpdateSettings } from './hooks.js';

const cartItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
    items: [cartItemSchema],
  },
  { versionKey: false, timestamps: true },
);

cartSchema.pre('findOneAndUpdate', setUpdateSettings);

cartSchema.post('findOneAndUpdate', handleSaveError);

const CartCollection = model('cart', cartSchema);

export default CartCollection;
