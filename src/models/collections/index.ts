import { CatContent, CatContentSchema } from './CatContent'
import { Category, CategorySchema } from './Category'


const COLLECTIONS = {
    ['Category'.toLowerCase()]: Category,
    ['CatContent'.toLowerCase()]: CatContent,
}

const SCHEMAS = {
    ['CategorySchema'.toLowerCase()]: CategorySchema,
    ['CatContentSchema'.toLowerCase()]: CatContentSchema
}

export default COLLECTIONS
export { COLLECTIONS, SCHEMAS }