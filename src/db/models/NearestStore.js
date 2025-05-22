import { Schema, model } from 'mongoose';

import { phoneRegexp } from '../../constants/user.js';

const nearestStoreSchema = new Schema({
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

const NearestStoreCollection = model(
  'nearestStore',
  nearestStoreSchema,
  'nearest-pharmacies',
);

export default NearestStoreCollection;
