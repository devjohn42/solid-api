import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositorie'
import { hash } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { AuthenticateService } from './authenticate.service'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Service', () => {
  it('should be able to authenticate', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    // pattern para testes:
    // Nomear qual é a variável principal (principal entidade sendo testada)
    // <- sut (Sistem Under Test) ->
    // Usado para identificar a principal variável que está sendo testada
    const sut = new AuthenticateService(inMemoryUsersRepository)

    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 4),
    })

    const { user } = await sut.athenticateExecute({
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    // pattern para testes:
    // Nomear qual é a variável principal (principal entidade sendo testada)
    // <- sut (Sistem Under Test) ->
    // Usado para identificar a principal variável que está sendo testada
    const sut = new AuthenticateService(inMemoryUsersRepository)

    expect(
      sut.athenticateExecute({
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    // pattern para testes:
    // Nomear qual é a variável principal (principal entidade sendo testada)
    // <- sut (Sistem Under Test) ->
    // Usado para identificar a principal variável que está sendo testada
    const sut = new AuthenticateService(inMemoryUsersRepository)

    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 4),
    })

    expect(
      sut.athenticateExecute({
        email: 'johndoe@gmail.com',
        password: '12adasa',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
