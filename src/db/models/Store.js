import { Schema, model } from 'mongoose';

import { phoneRegexp } from '../../constants/user.js';

const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    match: phoneRegexp,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const StoreCollection = model('store', storeSchema, 'pharmacies');

export default StoreCollection;
