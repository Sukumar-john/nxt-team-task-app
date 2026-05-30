import { PrismaClient } from "@prisma/client";
import { env } from "./env";

const globalPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalPrisma.prisma ?? new PrismaClient({
    log: env.NODE_ENV === "development" ? [{ emit: 'event', level: 'query' }, { emit: 'event', level: 'error' }, { emit: 'event', level: 'warn' }] : [{ emit: 'event', level: 'error' }]
})

if(env.NODE_ENV === "development") {
    prisma.$on('query', (e)=> {
    console.log(`prisma client created  ${e.query} ${e.duration}` )
    })
}

prisma.$on('error', (e)=> {
    console.error(`prisma client error  ${e.message} ${e.stack}` )
})

if(env.NODE_ENV !== "production") {
    globalPrisma.prisma = prisma
}

export async function connectDatabase(): Promise<void>{
    try {
        await prisma.$connect()
        console.log('Database connected successfully')
    } catch(error){
        console.error('Error connecting to database:', error)
        throw error
    }
}

export async function disconnectDatabase(): Promise<void>  {
   await prisma.$disconnect()
   console.log('Database disconnected successfully')
}