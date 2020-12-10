import * as nexus from '@nexus/schema'

export const User = nexus.objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.name()
    t.model.password()
  },
})
