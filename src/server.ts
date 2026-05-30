import { createApp } from "./app"

// Try to load optional config/env module; fall back to process.env if not present
let env: any
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    env = require('./config/env').env ?? process.env
} catch (_err) {
    env = process.env
}

async function bootstrap() {
    const PORT = 3000
    try {
        const app = createApp()
        const server = app.listen(env.PORT ?? PORT, ()=> {
            console.log(`server running on port ${env.PORT ?? PORT}`)
        })

    } catch (error) {
        console.log('error', error)
        process.exit(1)

    }

}
bootstrap()