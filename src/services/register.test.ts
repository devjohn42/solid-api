import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { RegisterService } from './register.service'

describe('Register Service', () => {
  it('should hash user password upon registration', async () => {
    const registerService = new RegisterService({
      async findByEmail(email) {
        return null
      },
      async create(data) {
        return {
          id: 'user1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerService.userExecute({
      name: 'Mark',
      email: 'mark@gmail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
