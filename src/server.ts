import {
    express,
    cors,
    dotenv,
    bodyParser,
    cookieParser
} from './vendor'

import { connectToDB, closeConnectionToDB } from './models/MongooseHandler'
import { createCategory, deleteCategory, getCategories, getCategoryByName, updateCategory } from './controllers/category.controller'
import { errBadRequest, errNotFound, errServer } from './middleware/errors'


dotenv.config()

const enviroment = process.env.NODE_ENV || 'development'
const mongo_url = enviroment === 'development' ? process.env.MONGO_URL_DEV : process.env.MONGO_URL_PROD

const app = express()
const PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
    connectToDB('mongodb://localhost:27017/portfolio')
        .then(() => console.log(`Server running on port ${PORT}`))
        .catch(err => console.log(`Error connecting to DB: ${err.message}`))
})
app.use(cors())
app.get('/', (_, res) => res.send('Hello World!'))

process.on("uncaughtException", console.error)
process.on('beforeExit', closeConnectionToDB)

const apiRouter = express.Router()
const categoryRouter = express.Router()

app.use('/api', apiRouter)
app.use(cookieParser())
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