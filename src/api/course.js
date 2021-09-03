import express from 'express'
import CourseModel from '../models/courseModel.js'
import asyncHandler from 'express-async-handler'
import { admin, protect } from './../auth/authMiddleware.js'

const router = express.Router()

// //*@desc Create a course
// //*@Api GET /api/v1/course
// //*@Access Private

router.post(
  '/course',
  protect,
  asyncHandler(async (req, res) => {
    const {
      coursetitle,
      coursedescription,
      instructordescription,
      lecturelink,
      instructor,
    } = req.body

    const course = new CourseModel({
      user: req.user._id,
      coursetitle,
      coursedescription,
      instructordescription,
      lecturelink,
      instructor,
      address: req.body.address || 'sample Address',
      charges: req.body.charges || '0 rs',
      contact: req.body.contact || '0303030303',
      endtime: req.body.endtime || '00:00',
      starttime: req.body.starttime || '00:00',
      gymname: req.body.gymname || 'Sample Name',
      location: req.body.location || 'asdfjlk;asdfklj;',
      maxstudents: req.body.maxstudents || '0',
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
    const course = await CourseModel.findById(req.params.id)

    if (course) {
      res.status(200).json(course)
    } else {
      res.status(404)
      throw new Error('course not Found')
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
      course.coursetitle = req.body.coursetitle || course.coursetitle
      course.coursedescription =
        req.body.coursedescription || course.coursedescription
      course.instructor = req.body.instructor || course.instructor
      course.instructordescription =
        req.body.instructordescription || course.instructordescription
      course.lecturelink = req.body.lecturelink || course.lecturelink
      course.gymname = req.body.gymname || course.gymname
      course.address = req.body.address || course.address
      course.charges = req.body.charges || course.charges
      course.contact = req.body.contact || course.contact
      course.starttime = req.body.starttime || course.starttime
      course.maxstudents = req.body.maxstudents || course.maxstudents
      course.location = req.body.location || course.location
      course.endtime = req.body.endtime || course.endtime

      const updatedCourse = await course.save()

      res.status(200).json({
        _id: updatedCourse._id,
        createdAt: course.createdAt,
        coursetitle: updatedCourse.coursetitle,
        instructor: updatedCourse.instructor,
        coursedescription: updatedCourse.coursedescription,
        instructordescription: updatedCourse.instructordescription,
        lecturelink: updatedCourse.lecturelink,
        endtime: updatedCourse.endtime,
        starttime: updatedCourse.starttime,
        starttime: updatedCourse.starttime,
        maxstudents: updatedCourse.maxstudents,
        location: updatedCourse.location,
        contact: updatedCourse.contact,
        charges: updatedCourse.charges,
        address: updatedCourse.address,
        gymname: updatedCourse.gymname,
      })
    } else {
      res.status(404)
      throw new Error('User not Found')
    }
  })
)

//*@desc Delete course by admin
//*@Api GET /api/v1/course/:id
//*@Access Admin

router.delete(
  '/course/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const course = await CourseModel.findById(req.params.id)
    if (course) {
      await course.remove()
      res.json({ message: 'Course removed' })
    } else {
      res.status(404)
      throw new Error('Course not Found')
    }
  })
)

export default router
