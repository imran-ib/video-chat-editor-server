import { queryType } from 'nexus'
import { getUserId } from '../../utils'

export const Query = queryType({
  definition(t) {
    t.crud.users({
      alias: 'AllUsers',
    })

    t.nullable.field('CurrentUser', {
      type: 'User',
      description:
        'Returns back Current User if there is any otherwise returns null',
      resolve(_, __, ctx) {
        const UserId = parseInt(getUserId(ctx))
        return ctx.prisma.user.findUnique({
          where: {
            id: UserId,
          },
        })
      },
    })
  },
})


