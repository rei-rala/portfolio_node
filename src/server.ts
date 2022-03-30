import {
    express,
    cors,
    dotenv,
    bodyParser,
    cookieParser
} from './vendor'

import { connectToDB, closeConnectionToDB } from './models/MongooseHandler'
import { categoryRouter, createCategory, deleteCategory, getCategories, getCategoryByName, updateCategory } from './controllers/category.controller'
import { errBadRequest, errNotFound, errServer } from './middleware/errors'

dotenv.config()

const mongo_url = (process.env.NODE_ENV === 'production' ? process.env.MONGO_URL_PROD : process.env.MONGO_URL_DEV) ?? ''
const PORT = process.env.PORT || 8080

process.on("uncaughtException", console.error)
process.on('beforeExit', closeConnectionToDB)

const app = express()
const apiRouter = express.Router()

app.listen(PORT, async () => {
    connectToDB(mongo_url!)
        .then(() => console.log(`Server running on port ${PORT}`))
        .catch(err => console.log(`Error connecting to DB: ${err.message}`))
})

app.get('/', (_, res) => res.send('Hello World!'))
app.use(cors())
app.use(cookieParser())
app.use('/api', apiRouter)
apiRouter.use(bodyParser.json())
apiRouter.use('/category', categoryRouter)

// Categorias
apiRouter.get('/categories/', getCategories)
categoryRouter.get('/:name', getCategoryByName)
categoryRouter.post('/', createCategory)
categoryRouter.put('/:name', updateCategory)
categoryRouter.delete('/:name', deleteCategory)

apiRouter.use(errBadRequest)
apiRouter.use(errNotFound)
apiRouter.use(errServer)