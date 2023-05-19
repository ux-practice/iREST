import mongoose from 'mongoose'

const {DB_HOST, DB_USER, DB_PASS, DB_PORT, DB_TESTING, DB_PROTECTED} = process.env

if (DB_PROTECTED === 'true') {
  mongoose.connect(
    `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_TESTING}?authSource=admin&w=1`,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
} else {
  mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_TESTING}?authSource=admin&w=1`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

mongoose.set('useFindAndModify', false)

const db = mongoose.connection

db.once('open', () => {
  console.log('Successfully connected with mongodb')
})

db.on('error', err => {
  console.log(err)
})

export default db
