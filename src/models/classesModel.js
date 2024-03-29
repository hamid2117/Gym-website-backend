import mongoose from 'mongoose'

const classSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    coursetitle: { type: String },
    charges: { type: String },
    lecturelink: { type: String },
    coursedescription: { type: String },
    maxstudents: { type: String },
    timepayment: { type: String },
    total_students_enrolled: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Class', classSchema)

export default Product
