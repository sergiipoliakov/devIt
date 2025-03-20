
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export {
  Order
};
