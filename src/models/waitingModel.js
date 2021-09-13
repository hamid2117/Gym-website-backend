import mongoose from 'mongoose'

const watingSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Class',
    },
    classcreater: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    approve: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
)

const Order = mongoose.model('Wait', watingSchema)

export default Order
