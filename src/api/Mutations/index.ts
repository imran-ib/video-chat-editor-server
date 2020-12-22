import { compare, hash } from 'bcryptjs'
import { mutationType, stringArg, nonNull } from 'nexus'
import { sign } from 'jsonwebtoken'
import { sendUserIdCookie } from '../../utils'

export const Mutation = mutationType({
  definition(t) {
    t.crud.deleteManyUser() //TODO Delete This
    t.nonNull.field('NewUser', {
      type: 'AuthPayload',
      args: {
        displayName: stringArg({
          description:
            "User's Display Name. This Name will be displayed in app everywhere",
        }),
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      //@ts-ignore
      resolve: async (
        _parent,
        { displayName, username, email, password },
        ctx
      ) => {
        try {
          const UserExists = await ctx.prisma.user.findFirst({
            where: { email },
          })
          if (UserExists)
            return new Error(`User with email "${email}" already Exists`)
          const hashedPassword = await hash(password, 10)
          const user = await ctx.prisma.user.create({
            data: {
              displayName: displayName.toLowerCase(),
              email: email.toLowerCase(),
              password: hashedPassword,
              username: username.toLowerCase(),
            },
          })
          const token = sign({ userId: user.id }, process.env.APP_SECRET)

          sendUserIdCookie(token, ctx.res)

          return {
            token,
            user,
          }
        } catch (error) {
          return new Error(error.message)
        }
      },
    })
    t.nonNull.field('UserLogin', {
      type: 'AuthPayload',
      args: {
        email: nonNull(
          stringArg({
            description: 'Users Email Address To Log them in',
          })
        ),
        password: nonNull(
          stringArg({
            description: 'Users Password',
          })
        ),
      },
      description: 'Users Login Mutation. If Succeed Will Return Users and jwt',
      //@ts-ignore
      resolve: async (_parent, { email, password }, ctx) => {
        try {
          const user = await ctx.prisma.user.findFirst({
            where: {
              email,
            },
          })
          if (!user) {
            return new Error(`No user found for email: ${email}`)
          }
          const passwordValid = await compare(password, user.password)
          if (!passwordValid) {
            return new Error('Invalid password')
          }
          const token = sign({ userId: user.id }, process.env.APP_SECRET)
          sendUserIdCookie(token, ctx.res)
          return {
            token,
            user,
          }
        } catch (error) {
          return new Error(error.message)
        }
      },
    })
    t.nonNull.field('GetInTouch', {
      type: 'String',
      args: {
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
        message: nonNull(stringArg()),
      },
      description: 'Get Message from user and send email',
      //@ts-ignore
      resolve: async (_parent, { name, email, message }, ctx) => {
        try {
          console.log(
            '🚀 ~ file: index.ts ~ line 105 ~ resolve:async ~ name, email, message',
            name,
            email,
            message
          )
          //TODO Send Email
          await ctx.prisma.getInTouchMessages.create({
            data: { name, email, message },
          })
          return `Success! Thanks For Contacting with us`
        } catch (error) {
          return new Error(error.message)
        }
      },
    })
  },
})
