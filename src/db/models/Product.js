import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  suppliers: {
    type: String,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const ProductCollection = model('product', productSchema);

export default ProductCollection;
