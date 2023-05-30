const {v4: uuidv4} = require('uuid')

const generateToken = () => uuidv4()

export default generateToken