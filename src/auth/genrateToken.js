import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  // return jwt.sign({ id }, process.env.JWT_SECRET, {
  return jwt.sign({ id }, 'dimahdani9530', {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  })
}

export default generateToken
