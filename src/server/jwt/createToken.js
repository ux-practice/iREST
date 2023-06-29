import jwt from 'jsonwebtoken'

const {JWT_PRIVATE_KEY} = process.env

function createToken(payload, cb) {
  const options = {
    expiresIn: '1h',
    algorithm: 'HS256',
  }
  jwt.sign(payload, JWT_PRIVATE_KEY, options, cb)
}

export default createToken
