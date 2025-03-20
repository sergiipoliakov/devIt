
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 100
  }
});

const User = mongoose.model('User', userSchema);
export {
  User
};
