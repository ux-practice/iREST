import jwt from 'jsonwebtoken'

const {JWT_PRIVATE_KEY} = process.env

function verifyToken(token, cb) {
  jwt.verify(token, JWT_PRIVATE_KEY, cb)
}

export default verifyToken
