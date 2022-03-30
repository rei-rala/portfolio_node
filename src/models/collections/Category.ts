import { mongoose } from '../../vendor'

import { CatContentSchema } from './CatContent'

const { Schema, model } = mongoose
const categoryCollection = 'category'

const CategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    contents: [CatContentSchema]
})

const Category = model(categoryCollection, CategorySchema)

export { Category, CategorySchema, categoryCollection }
export default Category