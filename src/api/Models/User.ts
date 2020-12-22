import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.username()
    t.model.email({
      resolve({ email }, args, ctx) {
        return email.toLowerCase()
      },
    })
    t.model.displayName()
    t.string('Name', {
      resolve({ displayName }, args, ctx) {
        return displayName.toLowerCase()
      },
    })
  },
})

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
  },
})
