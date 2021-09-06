import mongoose from 'mongoose'

const courseSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    gymname: { type: String },
    address: { type: String },
    contact: { type: String },
    location: { type: [Number], default: [0, 0] },
  },
  { timestamps: true }
)

const Product = mongoose.model('Course', courseSchema)

export default Product
