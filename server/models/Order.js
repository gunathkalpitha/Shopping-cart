import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalPrice: Number,
  shippingAddress: {
    name: String,
    email: String,
    address: String,
    city: String,
    zipCode: String,
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Order', orderSchema)
