import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import { apiRouter } from './routes/api.js'

const app = express()
const port = process.env.PORT || 3000

// Parsers & dev tools
app.use(express.urlencoded({ extended: true }));    // Parse url-encoded
app.use(express.json({ extended: true }));          // Parse JSON
app.use(morgan('tiny'))

app.use('/api', apiRouter);
app.use(express.static('frontend'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})