import express from 'express'
import WaitingModel from '../models/waitingModel.js'
import ClassModel from '../models/classesModel.js'
import UserModel from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import { protect } from './../auth/authMiddleware.js'

const router = express.Router()

// //*@desc Create a waitlist
// //*@Api POST /api/v1/waitinglist/:id  || Class id
// //*@Access Private

router.post(
  '/waitinglist/:id',
  protect,
  asyncHandler(async (req, res) => {
    const classs = await ClassModel.findById(req.params.id)

    const waitlist = new WaitingModel({
      user: req.user._id,
      class: classs._id,
      classcreater: classs.user,
    })

    const waitlistsave = await waitlist.save()

    if (waitlistsave) {
      res.status(200).json({ message: 'waitlist is created' })
    } else {
      res
        .status(404)
        .json({ message: 'waitlist is not created at this moment .' })
    }
  })
)

// //*@desc Get all waitinglist
// //*@Api GET /api/v1/waitinglist
// //*@Access Private

router.get(
  '/mywaitlist',
  protect,
  asyncHandler(async (req, res) => {
    const data = await WaitingModel.find({
      classcreater: req.user._id,
    }).populate('user')

    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json({ message: 'Data not found' })
    }
  })
)
// //*@desc Get all Single waitlist
// //*@Api GET /api/v1/waitlist/:id
// //*@Access Private

router.get(
  '/waitlist/:id',
  protect,
  asyncHandler(async (req, res) => {
    const data = await WaitingModel.find({ course: req.params.id })
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json({ message: 'Data not found' })
    }
  })
)

//*@desc put each waitlist
//*@Api put /api/v1/waitlist/:id
//*@Access Private

router.put(
  '/waitlists/:id',
  protect,
  asyncHandler(async (req, res) => {
    const waitlists = await WaitingModel.findById(req.params.id)
    if (waitlists) {
      waitlists.approve = req.body.approve
      const updatedCourse = await waitlists.save()

      res.status(200).json({
        _id: updatedCourse._id,
        approve: updatedCourse.approve,
      })
    } else {
      res.status(404)
      throw new Error('User not Found')
    }
  })
)

//*@desc Delete waitlist
//*@Api GET /api/v1/wait/:id
//*@Access Private

router.delete(
  '/waitlist/:id',
  protect,
  asyncHandler(async (req, res) => {
    const waitlist = await WaitingModel.findById(req.params.id)
    if (waitlist) {
      await waitlist.remove()
      res.json({ message: 'waitlist removed' })
    } else {
      res.status(404)
      throw new Error('waitlist not Found')
    }
  })
)

export default router
