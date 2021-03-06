import { makeSchema, subscriptionField, connectionPlugin} from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import { join } from 'path'
import { Context } from './types'
import * as types from './api'
import { permissions } from './permissions'
import { applyMiddleware } from 'graphql-middleware'

// export const Subscription = subscriptionField('latestPost', {
//   type: 'Post',
//   subscribe(_root, _args, ctx) {
//     return ctx.pubsub.asyncIterator('latestPost')
//   },
//   resolve(payload) {
//     return payload
//   },
// })

export const schema =
applyMiddleware(
  makeSchema({
    types,
    plugins: [
    nexusPrisma({
      experimentalCRUD: true,
      prismaClient: (ctx: Context) => ctx.prisma,
    }),
    connectionPlugin()
  ],
  outputs: {
    typegen: join(__dirname, 'generated/index.d.ts'),
    schema: join(__dirname, 'generated/schema.graphql'),
  },
  contextType: {
    module: join(__dirname, 'types.ts'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
,permissions)
