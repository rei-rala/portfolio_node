import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server started on port ' + PORT))
app.use(cors())
app.get('/', (_, res) => res.send('Hello World!'))