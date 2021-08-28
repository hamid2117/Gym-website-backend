import mongoose from 'mongoose'

const customerSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    address: { type: String },
    charges: { type: String },
    contact: { type: String },
    endtime: { type: String },
    starttime: { type: String },
    gymname: { type: String },
    maxstudents: { type: String },
    location: { type: String },
    coursetitle: { type: String },
    lecturelink: { type: String },
    coursedescription: { type: String },
    instructor: { type: String }, //id
    instructordescription: { type: String },

    //   location: { lng: '', lat: '' },
  },
  { timestamps: true }
)

const Product = mongoose.model('Customer', customerSchema)

export default Product
