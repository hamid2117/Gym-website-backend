import express from 'express'
import CourseModel from '../models/courseModel.js'
import asyncHandler from 'express-async-handler'
import { protect } from './../auth/authMiddleware.js'
import ClassModel from '../models/classesModel.js'

const router = express.Router()

// //*@desc Create a course
// //*@Api GET /api/v1/course
// //*@Access Private

router.post(
  '/course',
  protect,
  asyncHandler(async (req, res) => {
    const { gymname, address, contact, location } = req.body

    const course = new CourseModel({
      user: req.user._id,
      gymname: gymname,
      address: address,
      contact: contact,
      location: location,
    })
    const createdCourse = await course.save()
    if (createdCourse) {
      res.status(200).json({ message: 'Course is created' })
    } else {
      res.status(404).json({ message: 'Course is not create at this moment .' })
    }
  })
)

// //*@desc Get all courses
// //*@Api GET /api/v1/courses
// //*@Access Private

router.get(
  '/courses',
  protect,
  asyncHandler(async (req, res) => {
    const data = await CourseModel.find()
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json({ message: 'Data not found' })
    }
  })
)

//*@desc get each course
//*@Api GET /api/v1/course/:id
//*@Access Private

router.get(
  '/course/:id',
  protect,
  asyncHandler(async (req, res) => {
    // const course = await CourseModel.findById(req.params.id)
    const classes = await ClassModel.find({ course: req.params.id })
    if (classes) {
      res.status(200).json(classes)
    } else {
      res.status(404)
      throw new Error('classes not Found')
    }
  })
)

//*@desc put each course
//*@Api put /api/v1/course/:id
//*@Access Private

router.put(
  '/course/:id',
  protect,
  asyncHandler(async (req, res) => {
    const course = await CourseModel.findById(req.params.id)
    if (course) {
      course.gymname = req.body.gymname || course.gymname
      course.address = req.body.address || course.address
      course.contact = req.body.contact || course.contact
      course.location = req.body.location || course.location
      const updatedCourse = await course.save()

      res.status(200).json({
        _id: updatedCourse._id,
        location: updatedCourse.location,
        contact: updatedCourse.contact,
        address: updatedCourse.address,
        gymname: updatedCourse.gymname,
      })
    } else {
      res.status(404)
      throw new Error('User not Found')
    }
  })
)
router.put(
  '/classes/:id',
  protect,
  asyncHandler(async (req, res) => {
    const classes = await ClassModel.findById(req.params.id)
    if (classes) {
      classes.coursetitle = req.body.coursetitle || classes.coursetitle
      classes.charges = req.body.charges || classes.charges
      classes.lecturelink = req.body.lecturelink || classes.lecturelink
      classes.maxstudents = req.body.maxstudents || classes.maxstudents
      classes.timepayment = req.body.timepayment || classes.timepayment
      classes.couresdescription =
        req.body.couresdescription || classes.couresdescription
      const updatedCourse = await classes.save()

      res.status(200).json({
        _id: updatedCourse._id,
        coursetitle: updatedCourse.coursetitle,
        charges: updatedCourse.charges,
        lecturelink: updatedCourse.lecturelink,
        maxstudents: updatedCourse.maxstudents,
        timepayment: updatedCourse.timepayment,
        couresdescription: updatedCourse.couresdescription,
      })
    } else {
      res.status(404)
      throw new Error('class not Found')
    }
  })
)

//*@desc Delete course by admin
//*@Api GET /api/v1/course/:id
//*@Access Admin

router.delete(
  '/course/:id',
  protect,
  asyncHandler(async (req, res) => {
    const course = await CourseModel.findById(req.params.id)
    const classs = await ClassModel.find({ course: req.params.id })
    if (course) {
      await course.remove()
      await classs.remove()
      res.json({ message: 'Course removed' })
    } else {
      res.status(404)
      throw new Error('Course not Found')
    }
  })
)
//*@desc Delete class
//*@Api GET /api/v1/class/:id
//*@Access Admin

router.delete(
  '/class/:id',
  protect,
  asyncHandler(async (req, res) => {
    const classes = await ClassModel.findById(req.params.id)

    if (classes) {
      await classes.remove()
      res.json({ message: 'Class removed' })
    } else {
      res.status(404)
      throw new Error('Class not Found')
    }
  })
)

export default router
