import compression from "compression";
import express, { Application, Request, Response } from "express";


export function createApp(): Application {
    const app = express()

    app.use(express.json({limit: '1mb'}))
    app.use(express.urlencoded({extended: true, limit: '1mb'}))
    app.use(compression())

    app.get('/healthy', (req: Request, res: Response ) => {
        res.status(200).json({
            status: 'healthy',
            timestamp: new Date().toISOString()
        })
    })

    return app

}