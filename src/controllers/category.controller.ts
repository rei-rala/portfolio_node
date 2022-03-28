import { RequestHandler } from "express"
import MongooseHandler from "../models/MongooseHandler";
import Category from '../models/collections/Category'

const Category_DB = new MongooseHandler(Category, 'category')

const getCategories: RequestHandler = async (_, res, next) => {
    try {
        const { data, error } = await Category_DB.get({}, 1)

        if (error) {
            throw { code: 400, message: error.message }
        }

        if (!data) {
            throw { code: 404, message: 'Error inesperado' }
        }

        res.send({
            ok: true,
            message: `Mostrando ${data.length} categorias`,
            data
        })

    } catch (err: any) {
        next({ error: { code: err?.code, message: err?.message } })
    }
}

const getCategoryByName: RequestHandler = async (req, res, next) => {
    try {
        const { name } = req.params

        if (!name) {
            return next({ code: 400, message: 'No se ingreso nombre de categoria' })
        }

        const { data, error } = await Category_DB.get({ name })

        if (error) {
            return next({ code: 400, message: error.message })
        }

        if (!data) {
            return next({ code: 404, message: `Categoria  '${name}' no encontrada` })
        }

        res.send({
            ok: true,
            message: `Mostrando categoria '${name}'`,
            data
        })

    } catch (err: any) {
        next({ error: { code: err?.code, message: err?.message } })
    }
}


const createCategory: RequestHandler = async (req, res, next) => {
    try {
        const { properties } = req.body

        if (!properties || !properties.name) {
            throw { code: 400, message: 'No se ingresaron suficientes datos' }
        }

        const { data, error } = await Category_DB.post({ ...properties })

        if (error) {
            throw { code: 400, message: error.message ?? error }
        }

        if (!data) {
            throw { code: 500, message: 'Error al crear categoria' }
        }
        res.status(201).json({
            ok: true,
            message: 'Recurso creado',
            data
        })

    } catch (err: any) {
        next({ error: { code: err?.code, message: err?.message } })
    }
}

const updateCategory: RequestHandler = async (req, res, next) => {
    try {
        const { name } = req.params
        const { properties } = req.body

        if (!name || !properties) {
            return next({ code: 400, message: 'No se ingresaron suficientes datos' })
        }

        const { data, error } = await Category_DB.put({ name }, { ...properties })

        if (error) {
            throw { code: 400, message: error }
        }

        if (!data) {
            throw { code: 404, message: `Categoria '${name}' no encontrada` }
        }

        res.send({
            ok: true,
            message: `Categoria '${name}' actualizada`,
            data
        })

    } catch (err: any) {
        next({ error: { code: err?.code, message: err?.message } })
    }
}

const deleteCategory: RequestHandler = async (req, res, next) => {
    try {
        const { name } = req.params

        if (!name) {
            throw { code: 400, message: 'No se ingreso nombre de categoria' }
        }

        const { data, error } = await Category_DB.delete(name)

        if (error) {
            throw { code: 400, message: error.message ?? error }
        }

        if (!data) {
            throw { code: 404, message: `Categoria '${name}' no encontrada` }
        }

        res.send({
            ok: true,
            message: `Categoria '${name}' eliminada`,
            data
        })

    } catch (err: any) {
        next({ error: { code: err?.code, message: err?.message } })
    }
}

export { getCategories, getCategoryByName, createCategory, updateCategory, deleteCategory }