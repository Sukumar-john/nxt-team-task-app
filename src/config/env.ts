
import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()
const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    PORT: z.coerce.number().default(3000),

    DB_URL: z.string().url(),
    DB_POOL_MIN: z.coerce.number().default(2),
    DB_POOL_MAX: z.coerce.number().default(10),
})

const parsed = envSchema.safeParse(process.env)
console.log('Parsed environment variables:', parsed)

if (!parsed.success) {
    console.error('Invalid environment variables:', parsed.error.format())
    process.exit(1)
}

export const env = parsed.data
export type Env = typeof env