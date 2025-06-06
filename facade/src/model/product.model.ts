
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  }
});

const Product = mongoose.model('Product', productSchema);
export {
  Product
};
