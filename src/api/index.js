import express from 'express'
import registerApi from './register.js'
import loginApi from './login.js'
import courseApi from './course.js'
import adminApi from './admin.js'

const router = express.Router()

router.use(courseApi)
router.use(registerApi)
router.use(loginApi)
router.use(adminApi)

export default router
