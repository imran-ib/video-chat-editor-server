import { PrismaClient } from '@prisma/client'
import { PubSub } from 'apollo-server'
import { Context } from './types'

const prisma = new PrismaClient({
  log: ['query' ,'error'],
  errorFormat: 'pretty',
})
const pubsub = new PubSub()

export const createContext = (ctx: any): Context => {
  return {
    ...ctx,
    prisma,
    pubsub,
  }
}
