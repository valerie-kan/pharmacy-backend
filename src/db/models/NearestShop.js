import { Schema, model } from 'mongoose';

import { PHONE_REGEX } from '../../constants/user.js';

const nearestShopSchema = new Schema({
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
    match: PHONE_REGEX,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const NearestShopCollection = model('nearShop', nearestShopSchema);

export default NearestShopCollection;
