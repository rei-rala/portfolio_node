import { Schema, model } from 'mongoose'

const catContentCollection = 'catContent'

const CatContentSchema = new Schema({
    title: { type: String, required: true },
    details: [{ type: String, required: true }],
    timestamp: { type: Number, required: true }
})

const CatContent = model(catContentCollection, CatContentSchema)

export { CatContent, CatContentSchema }
export default CatContent