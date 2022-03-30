import { mongoose } from '../vendor'
const { Model } = mongoose

type MongooseResponse = Promise<{ data: any, error: null } | { data: null, error: any }>

class MongooseHandler {
    private static models: any[] = []
    private model: typeof Model

    constructor(model: typeof Model, categoryCollection: string) {
        this.model = model
        MongooseHandler.models.push({ [categoryCollection]: this.model })
    }

    getModel: () => typeof this.model = () => this.model

    get: (filter?: any, limit?: number) => MongooseResponse = async (filter, limit = 1) => {
        try {
            const data = await this.model.find(filter).limit(limit).lean().exec()
            return { data, error: null }
        }
        catch (error: any) {
            return { data: null, error: error.message }
        }
    }

    post: (newObject: { [key: string]: string | number }) => MongooseResponse = async (newObject) => {
        try {
            if (!newObject) { throw 'Ingrese propiedades' }
            const created = await new this.model(newObject).save()

            return { data: created, error: null }
        }
        catch (error: any) {
            return { error: error.message, data: null }
        }
    }

    put: (filter: { [key: string]: string | number }, properties: { [key: string]: string | number }) => MongooseResponse = async (filter, properties) => {
        try {
            if (!filter) { throw 'Ingrese propiedades de busqueda' }
            if (!properties) { throw 'Ingrese propiedad/es para actualizar' }
            const updated = await this.model.findOneAndUpdate({ filter }, { ...properties }, { new: true }).exec()

            if (updated && updated.acknowledged !== false) {
                return { data: updated, error: null }
            }

            throw new Error('No se pudo actualizar')
        }
        catch (error: any) {
            return { data: null, error: error.message }
        }
    }

    delete: (name: string) => MongooseResponse = async (name) => {
        try {
            const deleted = await this.model.findOneAndDelete({ name }, {}).exec()

            if (!deleted) {
                throw new Error('No se pudo eliminar')
            }
            return { data: deleted, error: null }
        }
        catch (error: any) {
            return { error: error.message, data: null }
        }
    }
}


const connectToDB = (URL: string) => {
    return mongoose.connect(URL, {
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
        serverSelectionTimeoutMS: 1000
    })
}

const closeConnectionToDB = () => {
    return mongoose.connection.close();
}

export { MongooseHandler, connectToDB, closeConnectionToDB }
export default MongooseHandler