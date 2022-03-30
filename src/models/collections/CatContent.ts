import { mongoose } from '../../vendor'

const catContentCollection = 'catContent'
const { Schema, model } = mongoose

const CatContentSchema = new Schema({
    title: { type: String, required: true },
    details: [{ type: String, required: true }],
    timestamp: { type: Number, required: true }
})

const CatContent = model(catContentCollection, CatContentSchema)

export { CatContent, CatContentSchema }
export default CatContent