import bcrypt from 'bcryptjs'

const user = [
  {
    name: 'Muhammad Usama',
    email: 'MuhammadUsama@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    trainer: false,
  },
  {
    name: 'Muhammad Hamid',
    email: 'hamid@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    trainer: true,
  },
]

export default user
