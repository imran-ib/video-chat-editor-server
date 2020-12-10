import * as nexus from '@nexus/schema'

export const Mutation = nexus.mutationType({
  definition(t) {
    t.crud.createOneUser()
  },
})
