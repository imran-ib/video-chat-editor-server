import * as nexus from '@nexus/schema'
import { nexusPrisma } from 'nexus-plugin-prisma'
import { join } from 'path'
import { Context } from './types'
import * as types from './api'

export const schema = nexus.makeSchema({
  types,
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
      prismaClient: (ctx: Context) => ctx.prisma,
    }),
  ],
  outputs: {
    typegen: join(__dirname, 'generated', 'index.d.ts'),
    schema: join(__dirname, 'generated', 'schema.graphql'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: join(__dirname, 'types.ts'),
        alias: 'ctx',
      },
    ],
    contextType: 'ctx.Context',
  },
})
