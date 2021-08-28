import express from 'express'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../auth/genrateToken.js'

const router = express.Router()

router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { name, email, password, trainer } = req.body

    const alreadyExist = await User.findOne({ email })

    if (alreadyExist) {
      return res
        .status(409)
        .json({ status: 'error', error: 'email already in use' })
    } else {
      const user = await User.create({
        name,
        password,
        email,
        trainer,
      })
      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          trainer: user.trainer,
          email: user.email,
          isAdmin: user.isAdmin,
        })
      }
    }
    return res.status(500).json({
      status: 'error',
      error: 'Cannot register user at the moment',
    })
  })
)

export default router
