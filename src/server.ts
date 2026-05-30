
import { createApp } from "./app"
import { connectDatabase } from "./config/database"
import {env} from './config/env'

async function bootstrap() {

    try {
        await connectDatabase()
        const app = createApp()
        const server = app.listen(env.PORT , ()=> {
            console.log(`server running on port ${env.PORT}`)
        })

    } catch (error) {
        console.log('error', error)
        process.exit(1)

    }

}
bootstrap()