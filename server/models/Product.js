import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Vegetables', 'Fruits', 'Cakes', 'Biscuits'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  image: String,
  emoji: String,
  inStock: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Product', productSchema)
