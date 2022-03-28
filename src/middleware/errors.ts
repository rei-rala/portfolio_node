import { ErrorRequestHandler } from "express"

// Bad Request handler
export const errBadRequest: ErrorRequestHandler = ((error: { code: number, message: string }, req, res, next) => {
    if (error?.code === 400) {
        return res
            .status(error.code)
            .json({
                ok: false,
                error: 'Verifique los datos ingresados',
                path: req.originalUrl,
                message: error.message,
                body: req.body
            })
            .end()
    }
    next(error)
})


// Not found handler
export const errNotFound: ErrorRequestHandler = ((error: { code: number, message: string }, req, res, next) => {
    if (error?.code === 404) {
        return res
            .status(error.code)
            .json({
                ok: false,
                error: 'Not found',
                path: req.originalUrl,
                message: error.message
            })
            .end()
    }
    next(error)
})


// Internal server error handler
export const errServer: ErrorRequestHandler = ((error: { code: number, message: string }, req, res, _) => {
    res
        .status(error.code || 500)
        .json({
            ok: false,
            error: 'Internal server error',
            path: req.originalUrl,
            message: error?.message || 'Unexpected error',
        })
        .end()
})